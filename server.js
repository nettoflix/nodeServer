const express = require("express");
const Datastore = require('nedb'); //our database!


const app = express();
app.listen(3000, () => console.log('Listening at 3000'));
//app.listen(3000, '0.0.0.0', function() {
  //  console.log('Listening to port:  ' + 3000);
//});

app.use(express.static("public")); //quando alguém (um broswer provavelmente) fazer um HTPP request (GET), 
//na porta 3000, o server vai mandar todos os arquivos dentro da pasta 'public' 
app.use(express.json({limit: '1mb'})); //parse JSON com request onde o Content-Type for json

const database= new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) =>
{
console.log("I got a GET request")
database.find({}, (error, data)=>{
if(error)
{
  console.log(error + "error");
  response.end();
  return;
}
response.json(data);
response.end();
});
});

app.post('/api', (request,response) =>{
console.log("I got a POST request")
const data = request.body;
const timestamp = Date.now();
data.timestamp = timestamp;
database.insert(data);
response.json(data); //envia uma mensagem de resposta ao client em forma de json

 
});