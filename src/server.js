
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const handlebars = require("express-handlebars")

const indexRoutes = require('./routes/indexRoutes.js');

const productService = require('./services/productService.js');


const app = express();

const MONGO_URI = process.env.MONGO_URI;
// console.log("----->", MONGO_URI)


// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.engine("hbs" , handlebars.engine({ 
    extname: ".hbs" ,// 👈 extensión de los archivos 
}))
app.set('view engine', 'hbs'); 
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public"));

// // 🔍 Logger de requests 
// app.use((req, res, next) => {
//     console.log(`➡️ ${req.method} ${req.url}`);
//     next();
// });



// Ruta base de prueba
app.get('/', (req, res) => {
    const testUser = {
        name: "coder",
        lastName: "house"
    };
    res.render('index', testUser);
});
app.get("/saludo/:nombre" , (req,res)=>{
    const nombre = req.params.nombre
    res.render("pages/saludo" , { nombre, layout:false })
})
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