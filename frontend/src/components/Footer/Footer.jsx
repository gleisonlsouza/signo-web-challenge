import React from 'react'
import styles from './Footer.module.scss'
import { FaLinkedin,FaGithubSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.footerContent}>
           <span>Desenvolvido por  <span className={styles.dev}>Gleison Souza</span> &copy; 2022 </span>  
           <span className={styles.links}>
                <a href='https://www.linkedin.com/in/gleison-souza-3b0939237/' target='_blank' rel="noreferrer"><FaLinkedin /></a>
                <a href='https://github.com/gleisoncoruja/' target='_blank' rel="noreferrer"><FaGithubSquare /></a>
            </span>                               
        </div>               
        
    </footer>
  )
}

export default Footer