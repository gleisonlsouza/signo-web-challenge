import React, { useMemo } from 'react'
import styles from './Polls.module.scss'

import { useParams } from 'react-router-dom'
import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';
import { toast } from "react-toastify";

// hooks
import { useState, useEffect } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getPollById,votePoll, reset } from '../../../slices/pollsSlice'

const Polls = () => {
    const { id } = useParams();
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [questions,setQuestions] = useState([])
    const [startAt,setStartAt] = useState('')
    const [finishAt,setFinishAt] = useState('')
    const [vote, setVote] = useState(null);

    const { polls, message, error } = useSelector((state) => state.polls)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPollById(id))
        return () =>{
            dispatch(reset());
        }
    },[dispatch,id])

    useMemo(() => {       
        if(polls.poll){
            setTitle(polls.poll.title)
            setDescription(polls.poll.description) 
            setStartAt(polls.poll.startAt)
            setFinishAt(polls.poll.finishAt)
            setQuestions(polls.questions)      
        }   
    },[polls])

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
   

    const handleVote = () =>{
        if(!vote){
            toast.warn("Selecione uma opção!")
        }

        const voteData = {
            pollId: id,
            questionId: vote
        }

        dispatch(votePoll(voteData))
    }
    

  return (
    <div className={styles.container}>
        <div className={styles.mainContent}>
            <div className={styles.mainTitle}>
                <div>
                    <h1>{title && title}</h1>
                    <h3>{startAt && returnStatus(startAt,finishAt)}</h3>
                </div>
                <div>
                    {startAt && returnStatus(startAt,finishAt) === 'Em progresso' && <button className={styles.voteButton} onClick={() => handleVote()}>Votar</button>}
                </div>               
            </div>            
            <div className={styles.voteContent}> 
                <p className={styles.description}>{description && description}</p>                
                    <div className={styles.radioButton}>                        
                        { questions && questions.map((question) => (
                            <div className={styles.options}>
                                <div>{question.votes} Voto(s)</div>
                                <div>
                                    <label>
                                        <input 
                                            type="radio"   
                                            name='voteChoice'                              
                                            value={question.id} 
                                            onChange={(e) => setVote(e.target.value)}
                                            disabled={returnStatus(startAt,finishAt) === 'Em progresso' ? false: true}                           
                                            />
                                        {question.textQuestion}
                                    </label>
                                </div>
                            </div>
                        ))}  
                    </div>
                    <div className={styles.pollinfo}>
                            <p>Data de início: {startAt && formatDate(startAt)}</p>
                            <p>Data do término: {finishAt && formatDate(finishAt)} </p>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Polls