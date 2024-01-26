//Asincrona
//Esperar a que se ejecute por completo una instrucción,
//sin obstruir el hilo de los procesos

//Formas de manejar la asincronía
/**
 * 1.Callbacks -> Deshuso!!!
 * 2.Promesas
 * 3.Async / Await -> La mejor opción
 */


// ------------------- CALLBACKS ----------------------------- //
function getUsersWithCallback(callback) {
    //llamada asincrona //consultar a spotify //3ms
    //consulta a un endpoint
    //Traducir o entender el JSON
    fetch('https://randomuser.me/api/')
    //consulta el endpoint (es como funciona el buscador)
        .then(response => response.json())
        //castear el Json
        .then(data => {
            const { results } = data;
            //desestructurando la propiedad, osea que esta extrayendo esa propiedad las otras no interesan
            callback(null, results)//1. Error / 2. Respuesta (callback siempre tienes estos)
        })
        .catch(error => {
            console.error(error)
            callback(error, null)
        })
}

getUsersWithCallback((error, results) => {
    if (error) console.error(error)
    const name = document.getElementById('name')
    const surname = document.getElementById('surname')
    const phone = document.getElementById('phone')
    for (const user of results) {
        name.innerText = user.name.first
        surname.innerText = user.name.last
        phone.innerText = user.phone
    }
})


// ------------------------- PROMISES ------------------------- //
const getUsersWithPromise = () => {
    return new Promise((resolve, reject) => {
        fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then(data => {
                const { results } = data;
                resolve(results)
            })
            .catch(error => reject(error))
    })
}

getUsersWithPromise()
    .then(results => {
        const name = document.getElementById('name')
        const surname = document.getElementById('surname')
        const phone = document.getElementById('phone')
        for (const user of results) {
            name.innerText = user.name.first
            surname.innerText = user.name.last
            phone.innerText = user.phone
        }
    })
    .catch(error => console.error(error))



// ----------------- ASYNC / AWAIT -------------------------------- //
const getUsersWithAsync = async () => {
    try {
        const response = await fetch('https://randomuser.me/api/')
        //await solo se puede en asincronas
        //lo guarda de una vez en constante
        const { results } = await response.json()
        //desestructuro y parseo
        const name = document.getElementById('name')
        const surname = document.getElementById('surname')
        const phone = document.getElementById('phone')
        for (const user of results) {
            name.innerText = user.name.first
            surname.innerText = user.name.last
            phone.innerText = user.phone
        }
    } catch (error) {
        console.error(error)
    }
}

getUsersWithAsync()



/*
//declarativa
async function nombre(){

}
*/
/*getUsersWithCallBack();//<- proceso 1

getUsersWithPromise();//<- proceso 2*/




