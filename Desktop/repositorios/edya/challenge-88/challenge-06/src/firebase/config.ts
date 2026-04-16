import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey:            "AIzaSyDEpOU_okiVvckKimBuxMeP_AtRY4j_bzE",
  authDomain:        "edaya-cec17.firebaseapp.com",
  projectId:         "edaya-cec17",
  storageBucket:     "edaya-cec17.firebasestorage.app",
  messagingSenderId: "256987548907",
  appId:             "1:256987548907:web:b9f0dad539cbedbadc42ae"
}

const app = initializeApp(firebaseConfig)

export const auth            = getAuth(app)
export const db              = getFirestore(app)
export const firebaseStorage = getStorage(app)

export default app
