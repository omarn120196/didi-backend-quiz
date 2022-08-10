import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import usuarioRoute from "./routes/usuariosRoute.js";

// *En app se gusrdara toda la funcionalidad de express
const app = express();

// *Decirle que enviaremos datos de tipo JSON
app.use(express.json());

// *Escanear el archivo '.env'
dotenv.config();

// *ConectarDB
conectarDB();

// *Dominios permitidos para conectarse
const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            // *El origen del request esta permitido
            callback(null, true);
        }
        else{
            callback(new Error('No permitido por CORS'));
        }
    }
}

// *Usar CORS
app.use(cors(corsOptions));

// *Ruta Formulario
app.use('/api/test', usuarioRoute);

// *En local tomara el puerto 4000 y en el servidor tomamos una variable de entorno
const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
