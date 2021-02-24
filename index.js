const scrapping=require('./scrapping.js');
const express = require('express');
const tabla = require('./posicion');
const bodyParser=require('body-parser');
const exphbs=require('express-handlebars');
const path=require('path');
const { helpers } = require('handlebars');

var x=50000;
var loop;

//configuracion
require('./database.js');
const app=express();
app.set('port',process.env.PORT|| 3000);
app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'));
});
app.use(express.static(__dirname + '/views'));
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({ extended: true }));
//setear motor handlebars
const hbs = exphbs.create({
    defaultLayout:'index',
    layoutsDir:app.get('views'),
    extname:'.hbs',
    //helpers
    helpers: {
        color:function(lista,item){
            let fila='';
            let red=" class='red'";
            let green=" class='green'";
            let normal=" class='normal'";
            for (let i=0;i<lista.length;i++){
                fila=fila+'<tr';
                if (i<4)
                    fila=fila+green;
                else
                    if (i>=lista.length-4)
                        fila=fila+red;
                    else
                        fila=fila+normal;
                fila=fila+'>'+item.fn(lista[i])+'</tr>';
            }
            return fila;
        }
    }
})
app.engine('.hbs',hbs.engine);
app.set('view engine','.hbs');

//Rutas
app.get('/',(req,res)=>{
    d={};
    const cursor=tabla.findOne({},function(err,pos){
        d.time=x/1000;
        d.posiciones=pos.datos;
        res.render('index.hbs',{data:d});
    });
});
app.post('/',(req,res)=>{
    x=parseInt(req.body.tiempo,10)*1000;
    clearTimeout(loop);
    execute();
    console.log('Configuracion de tiempo cambiada a',x,'milisegundos');
    res.redirect('back');
})

//actualizar bd
async function updateDB(tab){
    cantDocuments= await tabla.countDocuments();
    if (cantDocuments==0){
        const t= new tabla({datos:tab});
        t.save()
            .then(db=>console.log('Datos guardados correctamente'))
            .catch(err=>console.error(err));
    }
    else{
        // for (let p of tab){
        //     posicion.replaceOne({$or:[{pos:p.pos,played:{$ne:p.played}},{pos:p.pos,clubName:{$ne:p.clubName}}]},p)
        //         .then(db=>console.log('Dato actualizado correctamente'))
        //         .catch(err=>console.error(err));
        // }
        tabla.updateOne({},{datos:tab})
            .then(db=>console.log('Datos actualizados correctamente'))
            .catch(err=>console.error(err));
    }
}


//funcion main
async function main(){
    const tab = await scrapping.scrapping;
    console.log('Pos\t Club\t J\t G\t E\t P\t DG\tPts\n');
    for (let p of tab){
        console.log(p.pos,'\t',p.clubName,'\t',p.played,'\t',p.wins,'\t',p.ties,'\t',p.loses,'\t',p.gd,'\t',p.pts,'\n');
    }
    await updateDB(tab);
}



async function execute(){
    main();
    while (true){
        await new Promise(resolve=>loop=setTimeout(resolve,x));
        console.log('Datos actualizados cada ',x,' milisegundos');
        main();
    }
}
execute();
