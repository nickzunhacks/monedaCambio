const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.use(express.static(path.join(__dirname, '../frontend/public')));

// esto es para que la aplicacion pueda convertir los jsons en objetos utilizales
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/api.html'));
});

app.post("/conversion", async (req, res) => {

    const {base, monedaCambio} = req.body;

    try{

        /*
        se hace una peticion fetch en el endpoint para obtener informacion. Se tuvo que crear una llave gratis iniciando sesion, el codigo llega al
        correo y es esta 870f3c7b829f14b60950141b. En USD 

        Al final dice moneda que es donde se pone lo currency que se desea ser la base. En este caso USD es el dolar y sera la base. Cuando se busque 
        otra currency el resultado sera cuanto vale esa moneda frente a 1 dolar. Si se busca COP saldra aprox 3950 frente a 1 dolar

        */
        

        const response = await fetch(`https://v6.exchangerate-api.com/v6/870f3c7b829f14b60950141b/latest/${base}`)

        /* response es el objeto que dara omo resultado la peticion fetch. response se vuelve el objeto con metodos, entre ellos el .json() que te da 
            la respuesta pero convierte el formato json en un objeto utilizable.
        */

        const data = await response.json();

        //se imprime las currencys para saber su contenido

        const resultado = data.conversion_rates[monedaCambio];

        res.json({
            base,
            monedaCambio,
            resultado,
            mensaje: `1 ${base} equivale a ${resultado} ${monedaCambio}`
        });

        

    } catch (err) {

        // si el try detecta un error se captura con el catch y se imprime en consola este error.

        console.log("Error en la peticion: ", err);
        res.json({

            mensaje: "error: ", err,

        })

    }

});

