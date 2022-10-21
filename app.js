const express=require('express');
const app=express();
const path=require('path');
const server=require('http').Server(app);
const io=require('socket.io')(server);
const {Translate} = require('@google-cloud/translate').v2;
const projectId = 'reference-unity-366101';
const translate = new Translate({projectId});


let translation1={
  text:'',
  language:'',
  translation1:''

}

server.listen(8989);
app.use(express.static(path.join(__dirname,"dist","app")))


io.on('connection',(socket)=>{

  socket.on('onSubmit',async (data)=>{


    const [translation] = await translate.translate(data.text, data.language);
    console.log(`Translation: ${translation}`);
    translation1[translation1]=translation;
    io.emit('onTranslation',translation1);

  })


})


