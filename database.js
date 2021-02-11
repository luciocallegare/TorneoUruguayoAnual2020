const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://lucio_callegare:luciocallegare@cluster0.vhiox.mongodb.net/posiciones?retryWrites=true&w=majority",{
    useCreateIndex: true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
    .then(db=>console.log('DB CONNECTED'))
    .catch(err=>console.error(err));

