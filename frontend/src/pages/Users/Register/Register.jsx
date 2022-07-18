import React from 'react'

import styles from './Register.module.scss'

// hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "react-toastify";

// Redux 
import { createUser, reset } from './../../../slices/userSlice';

const Register = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [confirmEmail,setConfirmEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const dispatch = useDispatch()
  
    const { message,error, loading } = useSelector((state) => state.user)

    const handleSubmit = async (e) => {
        e.preventDefault()
  
        if (email !== confirmEmail){
          toast.warn("Os emails são diferentes");
          return;
        }
  
        if (password !== confirmPassword){
          toast.warn("As senhas são diferentes");
          return;
        }
    
        const user = {
          name,
          email,
          password,
          confirmPassword
        }
        
       
        await dispatch(createUser(user))
        
        
      }

      useEffect(() => {
        if(error){
          toast.error(error)
        }
        if(message){
          toast.success(message)
          setName('');
          setEmail('');
          setPassword('');
          setConfirmEmail('');
          setConfirmPassword('');
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
                    <label htmlFor="name">Digite o nome</label>
                    <input 
                        type="text" 
                        name='name'
                        id='name' 
                        required               
                        placeholder='Digite seu nome'
                        value={name}
                        onChange={((e) => setName(e.target.value))}
                        />  
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

                    <label htmlFor="confirmemail">Repita o e-mail</label>
                    <input 
                        type="email" 
                        name='confirmemail'
                        id='confirmemail'     
                        required           
                        placeholder='exemplo@exemplo.com'
                        value={confirmEmail}
                        onChange={((e) => setConfirmEmail(e.target.value))}
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
                
                
                    <label htmlFor="confirmPassword">Repita a senha</label>
                    <input 
                        type="password" 
                        name='confirmPassword'
                        id='confirmPpassword'
                        required
                        placeholder='Repita a senha'
                        value={confirmPassword}
                        onChange={((e) => setConfirmPassword(e.target.value))}
                        />
                    {!loading ? (
                        <button type='submit'>Cadastrar</button>
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

export default Register