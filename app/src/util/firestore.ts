import * as firebase from "firebase"
import '@firebase/firestore'

export function loadFirestore() {
  try {
    const config = {
      apiKey: 'AIzaSyB55JFfd3cnNYTYwLaB6H6SsVsy7K9Qe00',
      authDomain: 'animalcontrol-58410.firebaseapp.com',
      projectId: 'animalcontrol-58410'
    }
    firebase.initializeApp(config)
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)
    }
  }

  return firebase.firestore()
}