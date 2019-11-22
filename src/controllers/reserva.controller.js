const sq = require('sequelize');
const poo = require('../database');
const Reserva = require('../models/reserva');

async function disponibilidadSillas(req,res){
    const {
        pk_sala,
        pk_funcion
    } = req.body;
    let reserva = null;
    let reservadas = null;
    let proceso = null;
    let disponible = null;
    try {
        //Reservadas
        await poo.query("\
        SELECT silla.id,silla.pk_numero,silla.v_tipo \
        FROM silla,silla_reservada,funcion_sala,sala \
        WHERE silla.id = silla_reservada.fk_silla \
        AND silla.fk_sala = sala.id \
        AND funcion_sala.fk_sala = sala.id \
        AND funcion_sala.fk_funcion = :funcion \
        AND funcion_sala.fk_sala = :sala \
        AND silla_reservada.v_estado = 'en reserva'",
        {
            replacements:{
                sala: pk_sala,
                funcion: pk_funcion
            }, 
            type:sq.QueryTypes.SELECT
        })
        .then(rows =>{
            reservadas=rows;
        });
        //Proceso
        await poo.query("\
        SELECT silla.id,silla.pk_numero,silla.v_tipo \
        FROM silla,silla_reservada,funcion_sala,sala \
        WHERE silla.id = silla_reservada.fk_silla \
        AND silla.fk_sala = sala.id \
        AND funcion_sala.fk_sala = sala.id \
        AND funcion_sala.fk_funcion = :funcion\
        AND funcion_sala.fk_sala = :sala \
        AND silla_reservada.v_estado = 'en proceso'\
        ",
        {
            replacements:{
                sala: pk_sala,
                funcion: pk_funcion
            },
            type: sq.QueryTypes.SELECT
        }).then(rows =>{
            proceso = rows;
        });
        //Disponibles
        await poo.query("\
            SELECT * FROM ( \
                SELECT silla.id as id,silla.pk_numero,silla.v_tipo \
                FROM silla,funcion_sala,sala \
                WHERE silla.fk_sala = sala.id \
                AND funcion_sala.fk_sala = sala.id \
                AND funcion_sala.fk_funcion = :funcion\
                AND funcion_sala.fk_sala = :sala \
                EXCEPT \
                    SELECT silla.id,silla.pk_numero,silla.v_tipo \
                    FROM silla,silla_reservada,funcion_sala,sala \
                    WHERE silla.id = silla_reservada.fk_silla \
                    AND silla.fk_sala = sala.id \
                    AND funcion_sala.fk_sala = sala.id \
                    AND funcion_sala.fk_funcion = :funcion\
                    AND funcion_sala.fk_sala = :sala \
                    AND silla_reservada.v_estado = 'en reserva'\
                EXCEPT\
                    SELECT silla.id,silla.pk_numero,silla.v_tipo \
                    FROM silla,silla_reservada,funcion_sala,sala \
                    WHERE silla.id = silla_reservada.fk_silla \
                    AND silla.fk_sala = sala.id \
                    AND funcion_sala.fk_sala = sala.id \
                    AND funcion_sala.fk_funcion = :funcion\
                    AND funcion_sala.fk_sala = :sala \
                    AND silla_reservada.v_estado = 'en proceso'\
            ) u\
            order by u.id\
        ",
        {
            replacements:{
                sala: pk_sala,
                funcion: pk_funcion
            },
            type: sq.QueryTypes.SELECT
        }).then(rows => {
            disponible = rows;
        })
        const ultima_reserva_usuario = await Reserva.reserva.findOne({
            where: {
                fk_persona: req.pk_cedula['pk_cedula']
            },
            order: [
                ['t_inicioreserva', 'DESC']
            ]
        });
        console.log(ultima_reserva_usuario.t_inicioreserva.toUTCString());
        let minutes = ultima_reserva_usuario.t_inicioreserva.getMinutes();
        ultima_reserva_usuario.t_inicioreserva.setMinutes(minutes + 5);
        const tiempo_limite = ultima_reserva_usuario.t_inicioreserva;
        console.log(tiempo_limite.toUTCString());
        console.log(new Date(Date.now()).toUTCString());
        if (tiempo_limite > Date.now().valueOf()) {
            reserva = ultima_reserva_usuario;
        }else{
            if (ultima_reserva_usuario.v_estado == 'en proceso' || ultima_reserva_usuario.v_estado == 'En proceso'){
                await ultima_reserva_usuario.update({
                    v_estado: 'cancelada',
                    t_inicioreserva: ultima_reserva_usuario.t_inicioreserva,
                    fk_persona: ultima_reserva_usuario.fk_persona
                });
            }
            let date = new Date();
            console.log(date + '  ' + date.toLocaleString())
            let newReserva = await Reserva.reserva.create({
                v_estado: 'en proceso',
                t_inicioreserva: date,
                fk_persona: req.pk_cedula['pk_cedula']
            });
            reserva = newReserva;
        }
        return res.json({
            data: [
                reserva,
                reservadas,
                proceso,
                disponible
            ]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in disponibilidadSillas',
            data: error
        });
    }
};

async function crear_reserva(req, res) {
    try {
        let date = new Date();
        console.log(date + '  ' + date.toLocaleString())
        const newReserva = await Reserva.reserva.create({
            v_estado: 'en proceso',
            t_inicioreserva: date,
            fk_persona: req.pk_cedula['pk_cedula']
        });
        res.json({
            data: newReserva
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in crear_reserva',
            data: error
        });
    }
};

async function reservar_silla(req, res) {
    const {
        fk_silla,
        fk_funcion_sala,
        fk_reserva
    } = req.body;
    try {
        const reserva = await Reserva.reserva.findOne({
            where: {
                id: fk_reserva
            }
        });
        if (reserva) {
            console.log(reserva);
            const ultima_reserva_usuario = await Reserva.reserva.findOne({
                where: {
                    fk_persona: req.pk_cedula['pk_cedula']
                },
                order: [
                    ['t_inicioreserva', 'DESC']
                ]
            });
            console.log(ultima_reserva_usuario.t_inicioreserva.toUTCString());
            let minutes = ultima_reserva_usuario.t_inicioreserva.getMinutes();
            ultima_reserva_usuario.t_inicioreserva.setMinutes(minutes + 5);
            const tiempo_limite = ultima_reserva_usuario.t_inicioreserva;
            console.log(tiempo_limite.toUTCString());
            console.log(new Date(Date.now()).toUTCString());
            if (tiempo_limite > Date.now().valueOf()) {
                let silla_reservada = await Reserva.sillaReservada.findOne({
                    where: {
                        fk_silla,
                        fk_funcion_sala,
                        fk_reserva
                    }
                });
                if (silla_reservada) {
                    if (req.pk_cedula['pk_cedula'] == reserva.fk_persona) {
                        silla_reservada.destroy()
                        return res.json({
                            message: 'liberada'
                        })
                    }
                    return res.json({
                        message: 'ocupada'
                    })
                }
                silla_reservada = await Reserva.sillaReservada.create({
                    v_estado: 'en proceso',
                    fk_silla,
                    fk_funcion_sala,
                    fk_reserva
                });
                return res.json({
                    message: 'bloqueada',
                    data: silla_reservada
                });
            } else {
                return res.json({
                    message: 'El tiempo para terminar la reserva ha finalizado'
                })
            }
        }else{
            return res.status(400).json({
                message: 'reserva not found'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in reservar_silla',
            data: error
        });
    }
};

async function reservar_snack(req,res) {
    const {
        fk_reserva,
        fk_snack,
        i_cantidad
    } = req.body;
    try {
        const reserva = await Reserva.reserva.findOne({
            where: {
                id: fk_reserva
            }
        });
        if(reserva){
            console.log(reserva);
            const ultima_reserva_usuario = await Reserva.reserva.findOne({
                where: {
                    fk_persona: req.pk_cedula['pk_cedula']
                },
                order: [
                    ['t_inicioreserva', 'DESC']
                ]
            });
            console.log(ultima_reserva_usuario.t_inicioreserva.toUTCString());
            let minutes = ultima_reserva_usuario.t_inicioreserva.getMinutes();
            ultima_reserva_usuario.t_inicioreserva.setMinutes(minutes + 5);
            const tiempo_limite = ultima_reserva_usuario.t_inicioreserva;
            console.log(tiempo_limite.toUTCString());
            console.log(new Date(Date.now()).toUTCString());
            if (tiempo_limite > Date.now().valueOf()) {
                let snack_reservado = await Reserva.snackReservada.findOne({
                    where:{
                        fk_reserva,
                        fk_snack
                    }
                });
                if(snack_reservado){
                    if (req.pk_cedula['pk_cedula'] == reserva.fk_persona) {
                        snack_reservado.destroy()
                        return res.json({
                            message: 'liberada'
                        });
                    }
                    return res.json({
                        message: 'ocupado'
                    });
                }
                snack_reservado = await Reserva.snackReservada.create({
                    fk_reserva,
                    fk_snack,
                    i_cantidad
                });
                return res.json({
                    message: 'bloqueado',
                    data: snack_reservado
                })
            }else {
                return res.json({
                    message: 'El tiempo para terminar la reserva ha finalizado'
                })
            }
        }else{
            return res.status(400).json({
                message: 'reserva not found'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in reservar_snack',
            data: error
        });
    }
};

module.exports.crear_reserva = crear_reserva;
module.exports.reservar_silla = reservar_silla;
module.exports.reservar_snack = reservar_snack;
module.exports.disponibilidadSillas = disponibilidadSillas;