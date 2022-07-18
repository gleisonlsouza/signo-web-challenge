import React, { useMemo } from 'react'
import styles from './MyPolls.module.scss'

import { Link, useNavigate } from 'react-router-dom'
import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';
import { AiFillDelete,AiFillEdit,AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";

// hooks
import { useState, useEffect } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getUserPolls,deletePoll, reset } from '../../../slices/pollsSlice'

const MyPolls = () => {
    const [listUserPolls, setListUserPolls] = useState([]);

    const { userPolls, message, error } = useSelector((state) => state.polls)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserPolls())
        return () =>{
            dispatch(reset());
        }
    },[dispatch])

    useMemo(() => {
        setListUserPolls(userPolls);      
    },[userPolls])

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

    const formatDate = (date) =>{
        const dateToFormat = new Date(date);
        return format(dateToFormat, 'dd/MM/yyyy HH:mm', { locale: ptBR })
        
     }     

    const returnStatus = (startDate,finishDate) => {
        startDate = new Date(startDate);
        finishDate = new Date(finishDate);
        const actualDate = new Date()

        if((startDate <= actualDate) && (finishDate > actualDate) ){
            return ("Em progresso")
        } else if(startDate > actualDate){
            return ("Programada - Futura")
        } else {
            return ("Encerrada")
        }    
    }

    const showHide = (divID) =>  {
        const divButtons = document.getElementById(`btn${divID}`)
        const divConfirm = document.getElementById(`confirm${divID}`)
        divButtons.classList.toggle(styles.hide);
        divConfirm.classList.toggle(styles.hide);
    }

    const handleDelete = async(id) => {
        await dispatch(deletePoll(id));
        setListUserPolls(listUserPolls.filter((poll) => poll.id !== id));
        showHide(id);
    }

    console.log(userPolls)

  return (
    <div className={styles.container}>
        <div className={styles.mainContent}>
            <div className={styles.mainTitle}>
                <h1>Minhas Enquetes</h1>
                <button onClick={() => navigate('/newpoll')}>Nova Enquete</button>
            </div>
            <div className={styles.futureContent}>               
                {listUserPolls && listUserPolls.length > 0 ? (
                        listUserPolls.map((poll) => (
                            <div className={styles.pollContent} key={poll.id}>
                                <div className={styles.title}>
                                    <h3>{poll.title}</h3>
                                </div>                    
                                <div className={styles.description}>
                                    <p>{poll.description}</p>
                                </div>
                                <div className={styles.status}>
                                    <ul>
                                        <li>
                                            <div>Status:</div>                                            
                                            <div>{returnStatus(poll.startAt,poll.finishAt)}</div>                                             
                                        </li>
                                        <li>                                              
                                            <div>Criada em:</div>                                          
                                            <div>{formatDate(poll.createdAt)}</div>
                                        </li>
                                        <li>
                                            <div>Editada em:</div>                                          
                                            <div>{formatDate(poll.updatedAt)}</div>                                          
                                        </li>
                                        <li>
                                            <div>Data de início</div>                                          
                                            <div>{formatDate(poll.startAt)}</div>                                          
                                        </li>
                                        <li>
                                            <div>Data de término</div>                                          
                                            <div>{formatDate(poll.finishAt)}</div>                                          
                                        </li>
                                    </ul>                                    
                                </div>
                                 <div className={styles.buttons} >
                                    <div className={`${styles['btn']}`} id={`btn${poll.id}`}>
                                        <button type='button' onClick={() => showHide(poll.id)}><AiFillDelete/></button>
                                        <button type='button' onClick={() => navigate(`/editpoll/${poll.id}`)}><AiFillEdit/></button>
                                        <button type='button' onClick={() => navigate(`/polls/${poll.id}`)}><AiOutlineEye/></button>
                                    </div>
                                    <div className={`${styles['buttonsConfirm']} ${styles['hide']}`} id={`confirm${poll.id}`}>
                                        <button type='button' className={styles.btnCancel} onClick={() => showHide(poll.id)}>
                                            Cancelar
                                        </button>
                                        <button type='button' className={styles.btnConfirm} onClick={() => handleDelete(poll.id)}>
                                            Confirmar
                                        </button>
                                    </div>
                                    
                                </div>                                
                            </div>
                        ))
                    ):(
                        <>
                            <div></div>
                            <div className={styles.emptyPolls}>
                                <h3>Poxa ainda não temos nada por aqui :( </h3>
                                <p>Crie uma enquete agora <Link to='/newpoll'>clicando aqui</Link></p>
                                
                            </div>
                            <div></div>
                        </>
                    ) }
            </div>
        </div>
    </div>
  )
}

export default MyPolls