const Reserva = require('../models/reserva');
const Multiplex = require('../models/multiplex');
const Funciones = require('../models/funciones');

async function crear_reserva(req, res) {
    try {
        let date = new Date();
        console.log(date + '  ' + date.toLocaleString())
        const newReserva = await Reserva.reserva.create({
            v_estado: 'En proceso',
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
                })
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
    
}

module.exports.crear_reserva = crear_reserva;
module.exports.reservar_silla = reservar_silla;