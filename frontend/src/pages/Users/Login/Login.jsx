import React from 'react'

import styles from './Login.module.scss'

// hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "react-toastify";

// Redux 
import { login, reset } from '../../../slices/authSlice';


const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const dispatch = useDispatch()
  
    const { error,message, loading } = useSelector((state) => state.auth)

   
   //Function to login an user
    const handleSubmit = async (e) => {
        e.preventDefault()
  
        
    
        const user = {
          email,
          password,          
        }
        
       
        await dispatch(login(user))
        
        
      }

      useEffect(() => {
        if(error){
          toast.error(error)
        }
        if(message){
          toast.success(message)          
        }
  
        return () =>{
          dispatch(reset())
        }
        
      },[error,message,dispatch])

  return (
    <div className={styles.container}>
        <div className={styles.mainContent}>
            <div className={styles.mainTitle}>
                <h1>Cadastro</h1>
                <h3>Faça seu cadastro para iniciar uma enquete</h3>
            </div>
            <div className={styles.mainDescription}>  
                <form className={styles.form} onSubmit={handleSubmit}>
                    
                    <label htmlFor="email">Digite o e-mail</label>
                    <input 
                        type="email" 
                        name='email'
                        id='email'    
                        required            
                        placeholder='exemplo@exemplo.com'
                        value={email}
                        onChange={((e) => setEmail(e.target.value))}
                        />

                    

                    <label htmlFor="password">Digite a senha</label>
                    <input 
                        type="password" 
                        name='password'
                        id='password'
                        required
                        placeholder='Digite a senha'
                        value={password}
                        onChange={((e) => setPassword(e.target.value))}
                        />
                
                
                    
                    {!loading ? (
                        <button type='submit'>Entrar</button>
                    ):(
                        <button type='submit' disabled>Aguarde...</button>
                        )
                    }
                            
                </form>              

            </div>
        </div>        
    </div>
  )
}

export default Login