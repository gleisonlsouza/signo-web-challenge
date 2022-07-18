import React, { useMemo } from 'react'

import styles from './Home.module.scss'

import { Link, useNavigate } from 'react-router-dom'
import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

// hooks
import { useState, useEffect } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getProgressPolls,getFuturePolls,getEndedPolls,reset } from '../../slices/pollsSlice'

const Home = () => {
    const [listProgressPolls, setListProgressPolls] = useState([]);
    const [listFuturePolls, setListFuturePolls] = useState([]);
    const [listEndedPolls, setListEndedPolls] = useState([]);

    const { progressPolls, futurePolls,endedPolls } = useSelector((state) => state.polls)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProgressPolls())
        dispatch(getFuturePolls())
        dispatch(getEndedPolls())
        return () =>{
            dispatch(reset());
        }
    },[dispatch])

    useMemo(() => {
        setListProgressPolls(Array.from(progressPolls).slice(0,6));        
        setListFuturePolls(Array.from(futurePolls).slice(0,6));        
        setListEndedPolls(Array.from(endedPolls).slice(0,6));        
    },[progressPolls,futurePolls,endedPolls])

    

 // Function to format date
 const formatDate = (date) =>{
    const dateToFormat = new Date(date);
    return format(dateToFormat, 'dd/MM/yyyy HH:mm', { locale: ptBR })
    
 }
  return (
    <div className={styles.container}>
        <div className={styles.mainContent}>
            <div className={styles.mainHeader}>
                <div className={styles.description}>
                    <h1>Signo's Enquete</h1>
                    <h2>Seja muito bem vindo(a) a enquete de desafio da Signo Web, as enquetes estão divididas em três grupos.</h2>
                    
                    <h3>Andamento/Ativas:</h3> 
                    <p>São as enquetes que estão dentro do período de votação, 
                        não é necessário estar logado ou ter uma conta para votar. 
                    </p>
                    <br></br>

                    <h3>Futuras Enquetes:</h3> 
                    <p>São as enquetes que ainda estão por vir, 
                        elas possuem data/hora programadas para inciarem, não é possível votar em uma enquete com esse status.
                    </p>
                    <br></br>

                    <h3>Enquetes encerradas:</h3> 
                    <p>As enquetes tem data e hora para encerrarem, 
                        após esse período limite não será mais possível realizar a votação, porém você poderá consultar o resultado da enquete.
                    </p>
                    <br></br>

                    <h3>Posso criar minha própria enquete?</h3>
                    <p>Sim! A votação não exige cadastro ou login, mas para criar sua própria enquete é necessário estar 
                        cadastrado no nosso sistema, caso ainda não tenha um cadastro <Link to='/register'>clique aqui</Link>, 
                        se já tem uma conta basta realizar o login <Link to='/login'>clicando aqui.</Link>
                    </p>
                </div> 
                <div className={styles.mainImg}>

                </div>

            </div>
        </div>
        <div className={styles.poll}>
            <div className={styles.title}>
                <h2>Enquetes em andamento</h2>
            </div>
            <div className={styles.pollsContainer}>
                {listProgressPolls && listProgressPolls.length > 0 ? (
                    listProgressPolls.map((poll) => (
                        <div className={styles.pollContent} key={poll.id} onClick={() => navigate(`/polls/${poll.id}`)}>
                            <div className={styles.titlePoll}>
                                <h3>{poll.title}</h3>
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

        <div className={styles.poll}>
            <div className={styles.title}>
                <h2>Futuras enquetes</h2>
            </div>
            <div className={styles.pollsContainer}>
                {listFuturePolls && listFuturePolls.length > 0 ? (
                    listFuturePolls.map((poll) => (
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

        <div className={styles.poll}>
            <div className={styles.title}>
                <h2>Enquetes encerradas</h2>
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

export default Home