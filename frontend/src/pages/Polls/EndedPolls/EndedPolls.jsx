import React, { useMemo } from 'react'
import styles from './EndedPolls.module.scss'

import { Link, useNavigate } from 'react-router-dom'
import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

// hooks
import { useState, useEffect } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getEndedPolls,reset } from '../../../slices/pollsSlice'

const EndedPolls = () => {
    const [listEndedPolls, setListEndedPolls] = useState([]);

    const { endedPolls } = useSelector((state) => state.polls)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getEndedPolls())
        return () =>{
            dispatch(reset());
        }
    },[dispatch])

    useMemo(() => {
        setListEndedPolls(endedPolls);      
    },[endedPolls])

    const formatDate = (date) =>{
        const dateToFormat = new Date(date);
        return format(dateToFormat, 'dd/MM/yyyy HH:mm', { locale: ptBR })
        
     }


  return (
    <div className={styles.container}>
        <div className={styles.poll}>
            <div className={styles.title}>
                <h1>Enquetes Encerradas</h1>
            </div>
            <div className={styles.pollsContainer}>
                {listEndedPolls && listEndedPolls.length > 0 ? (
                        listEndedPolls.map((poll) => (
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
                                    <span>Ver</span>
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
                    ) }                
            </div>
        </div>
    </div>
  )
}

export default EndedPolls