document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("form-currency");

    formulario.addEventListener("submit", obtenerDatos);

});

async function obtenerDatos(event) {
    
    event.preventDefault();

    // se apuntan a los valores de los listviews

    const base = document.getElementById('base').value;
    const monedaCambio = document.getElementById('moneda').value;

    console.log(base);
    console.log(monedaCambio);

    //peticion post al backend enviando esos valores

    try {

        const response = await fetch('/conversion', {

        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ base, moneda })

        });

        const data = await response.json();

        // se cambia el texto del titulo

        document.getElementById('resultado').textContent = data.mensaje;

    } catch (err) {

        console.log("error en la peticion al backend: ",err);

    }

    

    

}