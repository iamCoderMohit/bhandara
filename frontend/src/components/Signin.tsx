import { getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../config/firebaseconfig'
import { GoogleAuthProvider } from 'firebase/auth'

function Signin() {
    const provider = new GoogleAuthProvider()
    const [user, setUser] = useState("")

    async function signup() {
        try {
            const res = await signInWithPopup(auth, provider)
            const user = res.user
            const token = await user.getIdToken()

            onAuthStateChanged(auth, (user) => {
                if(user){
                    setUser("logged in")
                } else {
                    setUser("logged out")
                }
            })
            console.log(token)
        } catch (error: any) {
            console.error(error.code)
        }
    }
  return (
    <div>
        <input type="email" placeholder='email' />
        <input type="text" placeholder='password' />

        <button onClick={signup}>Google</button>

        auth status - {user}
    </div>
  )
}

export default Signin