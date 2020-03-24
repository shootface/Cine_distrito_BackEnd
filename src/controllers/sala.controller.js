const Multiplex = require('../models/multiplex');

async function getSalas(req,res){
    try {
        const salas = await Multiplex.sala.findAll();
        res.json({
            data:salas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getSalas',
            data: error
        });
    }
};

async function getOneSala(req,res){
    const { id } = req.params;
    try {
        const sala = await Multiplex.sala.findOne({
            where:{
                id
            }
        });
        res.json({
            data: sala
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong in getOneSala',
            data: error
        });
    }
}

async function crear_sala(req,res){
    const {
        i_numsala,
        i_numpreferencial,
        i_numgeneral,
        fk_multiplex
    } = req.body;
    try {
        let newSala = await Multiplex.sala.create({
            i_numsala,
            i_numpreferencial,
            i_numgeneral,
            fk_multiplex
        });
        if(newSala){
            res.json({
                message: 'Sala creada successfully',
                data: newSala
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong crear_sala',
            data: error
        });
    }
};

module.exports.getSalas = getSalas;
module.exports.getOneSala = getOneSala;
module.exports.crear_sala = crear_sala;