const { Router } = require('express');

const { db } = require('../firebase');

const router = Router()

router.get('/contacts', async (req, res) => {
    //querySnapshot es un objeto con muchos datos, para ver sus datos pongo el .docs
    const querySnapshot = await db.collection('contacts').get()   //con .collection obtengo justamente la coleccion que esta en firebase
    //.get() facil, simplemente es que voy a obtener todos los datos
    const contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()//los 3 puntos, traeme TODOS los datos
    }))
    console.log(contacts)
    //del elemento [] ejecuto .data para ver los datos
    //con todo esto, ya tengo configurada la base de datos y puedo acceder
    res.send(contacts);
})

router.post('/new-contact', async (req, res) => {

    const { firstname, lastname, email, phone } = req.body

    //guardando en firebase

    await db.collection('contacts').add({
        firstname,
        lastname,
        email,
        phone
    })

    res.send('new contact created');
})

router.get('/get-one-contact/:id', async (req, res) => {

    const doc = await db.collection('contacts').doc(req.params.id).get()

    const data = {
        id: doc.id,
        ...doc.data()
    }

    res.json(data)

})

router.delete('/delete-contact/:id', async (req, res) => {

    await db.collection('contacts').doc(req.params.id).delete()

    res.send('contact deleted')
})

router.put('update-contact/:id', async (req, res) => {

    await db.collection('contacts').doc(req.params.id).update(req.body)

    res.send('contact updated')

})




module.exports = router