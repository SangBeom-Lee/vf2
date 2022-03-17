const functions = require('firebase-functions')
var admin = require('firebase-admin')
var serviceAccount = require('./key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://beom-vf2-default-rtdb.asia-southeast1.firebasedatabase.app'
})

const db = admin.database()
const fdb = admin.firestore()

exports.createUser = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL } = user
  const mem = {
    email,
    displayName,
    photoURL,
    createdAt: new Date().getMilliseconds(),
    level: email === functions.config().admin.email ? 100 : 5
  }
  db.ref('users').child(uid).set(mem)
})

exports.deleteUser = functions.auth.user().onDelete(async (user) => {
  const { uid } = user
  db.ref('users').child(uid).remove()
})

exports.incrementBoardCount = functions.firestore.document('board/{bid}').onCreate(async (snap, context) => {
  try {
    await fdb.collection('meta').doc('boards').update('count', admin.firestore.FieldValue.increment(1))
  } catch (e) {
    await fdb.collection('meta').doc('boards').set({ count: 1 })
  }
})

exports.decrementBoardCount = functions.firestore.document('board/{bid}').onDelete(async (snap, context) => {
  await fdb.collection('meta').doc('boards').update('count', admin.firestore.FieldValue.increment(-1))
})
