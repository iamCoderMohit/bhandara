import { useState } from 'react'
import WithBgLayout from './WithBgLayout'
import { useAuth } from '../hooks/useAuth'

function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {signin} = useAuth()

    async function handleSignin() {
        await signin(email, password)
    }
  return (
    <div>
        <WithBgLayout>
            <div className='w-100 h-100  backdrop-blur-lg border bg-[#FFBF78]/30 border-gray-800 rounded-md absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white p-5'>
                <h1 className='text-center text-xl font-bold mb-5'>Sign in to your account</h1>

                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col'>
                        <label htmlFor="">Enter your email*</label>
                        <input type="email" required className='border border-gray-800 rounded-md pl-4 py-1' 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Enter your password*</label>
                        <input type="password" required className='border border-gray-800 rounded-md pl-4 py-1' 
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className='bg-orange-700 w-full rounded-md py-1 cursor-pointer'
                    onClick={handleSignin}
                    >Sign in</button>

                    <h1 className='text-center'>OR</h1>

                    <div className='flex gap-2 items-center mx-auto cursor-pointer'>
                        <img src="https://img.icons8.com/?size=512&id=17949&format=png" width={40} alt="" />
                        <div className='text-lg font-semibold'>Sign in with Google</div>
                    </div>
                </div>
            </div>
        </WithBgLayout>
    </div>
  )
}

export default Signin