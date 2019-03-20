const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

//Hacer conexión
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/u3',{useNewUrlParser:true});

//Definir esquema
const productSchema=new mongoose.Schema({
    code:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});
const UserSchema=new mongoose.Schema({
    name:{
        firstname:{
            type: String,
            required: true
        },
        lastname:{
            type: String,
            required: true
        }
    },
    password:{
        type: String,
        required: true
    }
});

//Declarar modelo
const Product=mongoose.model('Product',productSchema,'products');
const User=mongoose.model('User',UserSchema,'users');

//Definir endpoints
const productRouter=express.Router();
const userRouter=express.Router();

//Product endpoints
productRouter.post('/',(request,response)=>{
    const product=request.body;
    Product.create(product).then(data=>{
        console.log(data);
        response.status(200);
        response.json({
            code:200,
            msg: 'Saved!!',
            detail: data
        });
    }).catch(error =>{
        console.log(error);
        response.status(400);
        response.json({
            code: 400,
            msg: "No se ha podido guardar",
            detail: error
        });
    }
        //Manejo correcto de métodos
        //Manejo correcto de códigos HTTP
        //Mensajes adecuados de información
    );
});
productRouter.get("/",(req,res)=>{
    Product.find({})
    .then(products=>{
        res.status(200);
        res.json({
            code:200,
            msg:'Consulta exitosa',
            detail:products
        });
    })
    .catch(error=>{
        res.status(400);
        res.json({
            code:400,
            msg:'Error 400',
            detail:error
        });
    });
});
productRouter.get("/:id",(req,res)=>{
    const id=req.params.id;
    Product.findOne({_id:id})
    .then(product=>{
        res.status(200);
        res.json({
            code:200,
            msg:'Consulta exitosa',
            detail: product
        });
    })
    .catch(error=>{
        res.status(400);
        res.json({
            code:400,
            msg:'Ha ocurrido un error',
            detail: error
        });
    });
});
productRouter.delete("/:id",(req,res)=>{
    const {id}=req.params;
    Products.remove({_id:id})
    .then(data=>{
        res.status(200);
        res.json({
            code:200,
            msg:'Borrado',
            detail:data
        });
    })
    .catch(error=>{
        res.status(400);
        res.json({
            code:400,
            msg:'Ha ocurrido un error',
            detail:data
        });
    });
});
productRouter.put(":/id",(req,res)=>{
    const {id}=req.body.params;
    Product.update({_id:id},{$set:{name:id.name}})
    .then(data=>{
        res.status(200),
        res.json({
            code:200,
            msg:'Actualizado',
            detail:data
        })
    })
    .catch(error=>{
        res.status(400),
        res.json({
            code:400,
            msg:'Ha ocurrido un error',
            detail:error
        })
    });
    
    //hacer update
    //hacer un crud de usuarios con un modelo diferente, esquema con campos email, password y nombre
    //name:{firstName:,lastName:}
});

//User endpoints
userRouter.get("/",(req,res)=>{
    Product.find({})
    .then(datos=>{
        res.status(200);
        res.json({
            code:200,
            msg:'Consulta exitosa',
            detail: datos
        });
    })
    .catch(error=>{
        res.status(400);
        res.json({
            code:400,
            msg:'Ha ocurrido un problema',
            detail:error
        });
    });
});
userRouter.post("/",(req,res)=>{
    const user=req.body;
    User.create(user)
    .then(datos=>{
        res.status(200);
        res.json({
            code:200,
            msg:'Guardado',
            detail:datos
        })
    })
    .catch(error=>{
        res.status(400);
        res.json({
            code:400,
            msg:'Ha ocurrido un error',
            detail:error
        });
    });
});
userRouter.get("/:id",(req,res)=>{
    const id=req.params.id;
    User.findOne({_id:id})
    .then(datos=>{
        res.status(200);
        res.json({
            code:200,
            msg:'Consulta exitosa',
            detail:datos
        });
    })
    .catch(error=>{
        res.status(400);
        res.json({
            code:400,
            msg:'Ha habido un problema al recuperar el registro solicitado.',
            detail:error
        });
    });
});
userRouter.delete("/:id",(req,res)=>{
    const {id}=req.params;
    User.remove({_id:id})
    .then(data=>{
        res.status(200);
        res.json({
            code:200,
            msg:'Borrado',
            detail:data
        });
    })
    .catch(error=>{
        res.status(400);
        res.json({
            code:400,
            msg:'Ha ocurrido un error',
            detail:data
        });
    });
});
userRouter.put(":/id",(req,res)=>{
    const {id}=req.body.params;
    User.update({_id:id},{$set:{firstName:id.firstName}})
    .then(data=>{
        res.status(200),
        res.json({
            code:200,
            msg:'Actualizado',
            detail:data
        })
    })
    .catch(error=>{
        res.status(400),
        res.json({
            code:400,
            msg:'Ha ocurrido un error',
            detail:error
        })
    });
    
    //hacer update
    //hacer un crud de usuarios con un modelo diferente, esquema con campos email, password y nombre
    //name:{firstName:,lastName:}
});

let app=express();

app.use(bodyParser.json());
app.use(bodyParser({urlencoded:false}));
app.use('/products',productRouter);
app.use('/users',userRouter)

//Configurar el servidor
const server=require('http').Server(app);
const port=3009;

//Ejecutar el servidor
server.listen(port);
console.log('Corriendo en puerto: '+port);