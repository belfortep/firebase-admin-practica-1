require('dotenv').config()

const { initializeApp, applicationDefault } = require('firebase-admin/app');//simplemente elementos para la configuracion
const { getFirestore } = require('firebase-admin/firestore')//requiero la base de datos


initializeApp({
    credential: applicationDefault()
})

const db = getFirestore()//la base de datos de cloud firestore

module.exports = { db }
