const Joi = require('joi');
const express = require('express');
const router = express.Router();


const generos = [
    {id:1,name:"Contra tudo e todos",generos:"Ação"},
    {id:2,name:"perdido em marte",generos:"Misterio"},
    {id:3,name:"Clube da luta",generos:"Suspense"}
];

//Mostra todos os filmes já cadastrados
router.get('/',(req,res)=>{
    res.send(generos);
});
//Mostra todos os filmes já cadastrados por id
router.get('/:id',(req,res)=>{
    const filme = generos.find(c => c.id === parseInt(req.params.id));
    if(!filme) return res.status(404).send('Não existe esse valor');
    
    res.send(filme);
});
//Cria um novo genero
router.post('/',(req,res)=>{
    const result = validarEntrada(req.body);
    if(result.error){ return res.status(400).send(result.error);}
   
    const tipos = {
        id: generos.length + 1,
        name: req.body.name,
        generos: req.body.generos
        };
       
    generos.push(tipos);
    res.send(tipos);
});

router.put('/:id',(req,res)=>{
    const filme = generos.find(c => c.id === parseInt(req.params.id));
    if(!filme) return res.status(404).send('Não existe esse valro');

    const {error} = validarEntrada(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);

    filme.name = req.body.name;
    filme.generos = req.body.generos;

    res.send(filme);
});

router.delete('/:id',(req,res)=>{
    const filme = generos.find(c=> c.id === parseInt(req.params.id));
    if(!filme)return res.status(404).send("Não existe esse valor");

    const index = generos.indexOf(filme); 
    generos.splice(index,1); //esse index,1 é pra deletar só um do sistema

    res.send(filme);
});
 function validarEntrada (filme) {
    const schema = {
        name:Joi.string().min(2).required(),
        generos:Joi.string().min(4).required()
};

    return Joi.validate(filme,schema);
}
module.exports = router;