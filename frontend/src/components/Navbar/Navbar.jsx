import React from 'react'
import styles from './Navbar.module.scss'

// Hooks
import { useAuth } from "../../hooks/useAuth";

import { Link } from 'react-router-dom'
import { AiOutlineMenu } from "react-icons/ai";
import { logout } from '../../slices/authSlice';
import { useDispatch } from 'react-redux'






const Navbar = () => {
    const { auth } = useAuth();

    const dispatch = useDispatch()

    const handleClick = () => {
        const menu = document.getElementById('links');
        menu.classList.toggle(styles.active)
    }

  return (
    <nav className={styles.navbar}>
        <div className={`${styles.links}`} id='links'>
            <ul className={styles.listLinks}>
                <li>
                    <Link to='/' onClick={() => handleClick()}>Home</Link>
                </li>
                <li>
                    <Link to='/activepolls' onClick={() => handleClick()}>Enquetes Ativas</Link>
                </li>
                <li>
                    <Link to='/futurepolls' onClick={() => handleClick()}>Futuras Enquetes</Link>
                </li>
                <li>
                    <Link to='/endedpolls' onClick={() => handleClick()}>Enquetes Encerradas</Link>
                </li>                               
            </ul>
            {!auth ? (
                <ul className={styles.login}>
                    <li>
                        <Link to='/register' onClick={() => handleClick()}>Cadastro</Link>
                    </li>
                    <li>
                        <Link to='/login' onClick={() => handleClick()}>Login</Link>
                    </li>
                </ul>
            ):(
                <ul className={styles.login}>
                    <li>
                        <Link to='/mypolls' onClick={() => handleClick()}>Minhas Enquetes</Link>
                    </li>
                    <li>
                        <Link to='/login' onClick={() => dispatch(logout())}>Sair</Link>
                    </li>
                </ul>    
            )}            
           
                                
        </div>
                
        <div className={styles.buttonColapse}>
            <AiOutlineMenu onClick={() => handleClick()}/>
        </div>
    </nav>
  )
}

export default Navbar