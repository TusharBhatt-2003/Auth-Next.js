'use client'
import React, { useEffect, } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast';
export default function SignUp() {

  const router = useRouter() 

  const [user, setUser] = React.useState({
    username: '',
    email: '',
    password: ''
  })
  
  const [buttonDisabled, setButtonDisabled] = React.useState(false)

  const [loading, setLoading] = React.useState(false)
  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log('Signup successful', response.data);
      router.push('/login')
    } 
    catch (error: any) {
      console.log('Signup failed', error.message);
      toast.error(error.message) 
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) 
      {
        setButtonDisabled(false)
      }
      else {
        setButtonDisabled(true)
      }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center gap-2 min-h-screen py-2'>
     <h1>{loading ? '...' : 'Signup'}</h1>
     <hr />
     {/* <label htmlFor='username'>Username</label> */}
     <input 
     className='p-1 rounded-md bg-black border-2 border-black inputBg placeholderColor'
     id='username'
     type='text'
     required
     value={user.username}
     onChange={(e) => setUser({...user, username: e.target.value})}
     placeholder='Username'/>

<input 
     className='p-1 rounded-md bg-black border-2 border-black inputBg placeholderColor'
     id='email'
     type="email"
     required
     value={user.email}
     onChange={(e) => setUser({...user, email: e.target.value})}
     placeholder='email'/>

<input 
     className='p-1 rounded-md bg-black border-2 border-black inputBg placeholderColor'
     id='password'
     type='password'
     required
     value={user.password}
     onChange={(e) => setUser({...user, password: e.target.value})}
     placeholder='Password'/>

     {
     buttonDisabled 
     ? '' 
     : <button onClick={onSignup} className='py-2 px-4 rounded-lg btnBgColor border-2 border-black'>
         Signup
       </button> 
     }
     
     <Link href='/login'>
       <p className='py-2 px-4 rounded-lg hover:underline'>Back to Login</p>
     </Link>
    </div>
  )
}
