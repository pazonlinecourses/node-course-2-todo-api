require('./config/config.js')


const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos' , (req , res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc)=> {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos' , (req , res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  } , (e) => {
    res.status(400).send(e);

  });
});

app.get('/todos/:id' , (req , res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
      return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });



});

app.delete('/todos/:id' , (req , res) =>{
  var id = req.params.id;

  //Validate the ID -> return 404 if not valid
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  //remove TODO by ID
  Todo.findByIdAndRemove(id).then((todo) => {
  if(!todo){
    //if(!doc) send 404
    return res.status(404).send();
  }
  //success
  //if(doc) send doc back with 200. 
  res.send({todo});
  }).catch((e) => {
     //error
      //400 with empty body
    res.status(400).send();
  });

});



app.patch('/todos/:id', (req , res) => {
  var id = req.params.id;
  var body = _.pick(req.body , ['completed' , 'text']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  if(body.completed){
    body.completedAt = new Date().getTime();
    
  } else{
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id , {$set:body} , {new:true}).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    console.log(todo);
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })

});

app.listen(port , () => {
  console.log(`Started server on port ${port}`);
});

module.exports = {app};