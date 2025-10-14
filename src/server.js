
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const handlebars = require("express-handlebars")
const indexRoutes = require('./routes/indexRoutes.js');
const productService = require('./services/productService.js');
const multer = require("multer")
const path = require("path")
const {paths} = require("./config/config.js")

const app = express();

const MONGO_URI = process.env.MONGO_URI;
// console.log("----->", MONGO_URI)


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Multer
// const storageConfig = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null, "uploads")
//     },
//     filename: (req,file,cb)=>{
//         cb(null, Date.now()+this.path.extname(file.originalname))
//     }
// })
// const upload = multer({ storage:storageConfig })


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.resolve(__dirname, "./uploads"))
    },
    filename: (req,file,cb)=>{
        const timestamp = Date.now()
        const originalname = file.originalname
        const ext = path.extname(originalname)

        cb(null, `${timestamp}-${originalname}`)
    }
})
const upload = multer({ storage })
app.use("/uploads" , express.static(paths.uploads))













//HANDLEBARS
// app.engine("hbs" , handlebars.engine({ 
//     extname: ".hbs" ,// 👈 extensión de los archivos 
// }))
// app.set('view engine', 'hbs'); 
// app.set('views', __dirname + '/views');
// app.use(express.static(__dirname + "/public"));

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "main"
    })
)
app.set('view engine', 'hbs'); 
app.set("views" , paths.views )

app.use("/static" , express.static(paths.public))




// // 🔍 Logger de requests 
// app.use((req, res, next) => {
//     console.log(`➡️ ${req.method} ${req.url}`);
//     next();
// });



//Ruta base de prueba
app.get('/', (req, res) => {
    const testUser = {
        name: "coder",
        lastName: "house"
    };
    return res.render('pages/home', testUser);
});

app.get('/realTimeProducts', (req, res) => {
    return res.render('pages/realTimeProducts');
});

app.get('/products', async (req, res) => {
    try {
        const productos = await productService.getAllProducts();
        //console.log("🟢 Productos desde BD:", productos);

        res.render('pages/products', { productos , layout: false });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }
});
app.get('/productDetail', (req, res) => {
    return res.render('pages/productDetail');
});
app.get('/cartDetail', (req, res) => {
    return res.render('pages/cartDetail');
});




app.get("/uploadGet", (req,res)=>{
    return res.render('pages/subirArchibo');
})

app.post("/upload" , upload.single("file"), (req,res)=>{
    res.send("Arquivo se ha subido correctamente")
})













// Conexión a MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Database connected!'))
    .catch(err => console.error('❌ Error connecting DB:', err));

// Rutas
app.use('/api', indexRoutes);


app.use((req, res) => {
    console.log("❌ Ruta no encontrada:", req.method, req.url);
    res.status(404).send("Ruta no encontrada");
});


module.exports = app;