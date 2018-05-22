// const MongoClient = require('mongodb').MongoClient;
const {MongoClient , ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err , client)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');
  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err , result) => {
  //   if(err){
  //     return console.log('Unable to insert Todo');
  //   }
  //   console.log(JSON.stringify(result.ops, undefined , 2));
  // });
  // db.collection('Users').insertOne({
  //   name: 'Paz',
  //   age: 30,
  //   location: 'Haifa'
  // }, (err , result) => {
  //   if(err){
  //     return console.log('Unable to insert Users');
  //   }
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined , 2));
  // });


  client.close();
});