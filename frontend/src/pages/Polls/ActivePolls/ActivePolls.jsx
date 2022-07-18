import React, { useMemo } from 'react'
import styles from './ActivePolls.module.scss'

import { Link, useNavigate } from 'react-router-dom'
import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

// hooks
import { useState, useEffect } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getProgressPolls,reset } from '../../../slices/pollsSlice'

const ActivePolls = () => {
    const [listProgressPolls, setListProgressPolls] = useState([]);

    const { progressPolls } = useSelector((state) => state.polls)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProgressPolls())
        return () =>{
            dispatch(reset());
        }
    },[dispatch])

    useMemo(() => {
        setListProgressPolls(progressPolls);      
    },[progressPolls])

// Function to format date
const formatDate = (date) =>{
    const dateToFormat = new Date(date);
    return format(dateToFormat, 'dd/MM/yyyy HH:mm', { locale: ptBR })
    
 }    


  return (
    <div className={styles.container}>
        <div className={styles.poll}>
            <div className={styles.title}>
                <h1>Enquetes Ativas</h1>
                <h2>Escolha uma para votar</h2>
            </div>
            <div className={styles.pollsContainer}>               
                {listProgressPolls && listProgressPolls.length > 0 ? (
                        listProgressPolls.map((poll) => (
                            <div className={styles.pollContent} key={poll.id} onClick={() => navigate(`/polls/${poll.id}`)}>
                                <div className={styles.titlePoll}>
                                    <h3>{poll.title}</h3>
                                    <h5>Início: {formatDate(poll.startAt)}</h5>
                                    <h5>Término: {formatDate(poll.finishAt)}</h5>
                                </div>                    
                                <div className={styles.description}>
                                    <p>{poll.description}</p>
                                </div>
                                <div className={styles.buttonVote}>
                                    <span>Votar agora!</span>
                                </div>
                            </div>
                        ))
                    ):(
                        <>
                            <div></div>
                            <div className={styles.emptyPolls}>
                                <h3>Poxa ainda não temos nada por aqui :( </h3>
                                <p>Faça seu cadastro agora <Link to='/register'>clicando aqui</Link> e crie suas enquetes</p>
                                <p>Já tem uma conta ? <Link to='/login'>Fazer login</Link></p>
                            </div>
                            <div></div>
                        </>
                    )}  
            </div>
        </div>
    </div>
  )
}

export default ActivePolls