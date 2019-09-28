const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express()
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')
const port = 4000;

const Movie = sequelize.define('movie', {
    title:{
      type: Sequelize.TEXT   
    },
    yearOfRelease:{
        type: Sequelize.INTEGER
    },
    synopsis:{
        type:Sequelize.TEXT
    }
});

sequelize.sync()
        .then(() => console.log('Table created successfully'))
        .catch(err => {
            console.error('Unable to create tables,shutng down...',err)
            process.exit(1)
        })

Movie.create({title:'Movie1',yearOfRelease:2011,synopsis:'des1'})
Movie.create({title:'Movie2',yearOfRelease:2013,synopsis:'des2'})
Movie.create({title:'Movie3',yearOfRelease:2012,synopsis:'des3'})

app.use(bodyParser.json())

app.post('/movies', (req,res,next) => {
    Movie.create(req.body)
         .then(movie =>{
             if(!movie){
                 res.status(404).end()
             }
             res.json(movie)
         })
         .catch(next)
})

app.get('/movies', (req,res,next) => {
    Movie.findAll()
         .then(movies => {
             if(!movies){
                 res.status(404).end()
             }
             res.json(movies)
         })
         .catch(next)
})

app.get('/movies/:id', (req,res,next) => {
    Movie.findByPk(req.params.id)
         .then(movie => {
             if(!movie){
                 res.status(404).end()
             }
             res.json(movie)
         })
         .catch(next)
})

app.put('/movies/:id', (req,res,next) => {
    Movie.findByPk(req.params.id)
         .then(movie => {
             if(movie){
               return movie.update(req.body)
                .then(movie => res.json(movie))
             }
             return res.status(404).end()
         })
         .catch(next)
})

app.delete('/movies/:id', (req,res,next) => {
    Movie.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(() => {
        return res.status(204).end()
    })
    .catch(next)
})


app.listen(port, ()=>console.log(`listening on port ${port}`));