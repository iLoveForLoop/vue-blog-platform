import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBqcZHacMvCQ5tGTXP9SsFyBOZ0x8ZMMIA',
  authDomain: 'blog-platfrom-vue.firebaseapp.com',
  projectId: 'blog-platfrom-vue',
  storageBucket: 'blog-platfrom-vue.appspot.com',
  messagingSenderId: '267806056046',
  appId: '1:267806056046:web:eee8374616f5a3de1c507f',
}

initializeApp(firebaseConfig)

const auth = getAuth()

export { auth }
