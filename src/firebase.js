require('dotenv').config()
const { database } = require('firebase-admin')
const{initializeApp, applicationDefault}= require('firebase-admin/app')
const {getFirestore}= require('firebase-admin/firestore')

console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)
initializeApp({
    credential: applicationDefault()
})

const db= getFirestore();

module.exports= {
    db,
};