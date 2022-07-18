import React from 'react'
import styles from './NewPoll.module.scss'

import { AiOutlinePlusCircle,AiFillDelete } from "react-icons/ai";

// hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "react-toastify";

// Redux 
import { createPoll, reset } from './../../../slices/pollsSlice';

const NewPoll = () => {
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [questions,setQuestions] = useState([])
    const [startAt,setStartAt] = useState('')
    const [finishAt,setFinishAt] = useState('')
    const [newQuestion,setNewQuestion] = useState('')


    const dispatch = useDispatch()
  
    const { message,error, loading } = useSelector((state) => state.polls)

    const handleSubmit = async (e) => {
        e.preventDefault()
  
        if (title.length < 5){
          toast.warn("O título deve conter ao menos 5 caracteres");
          return;
        }
  
        if (description.length  < 20){
          toast.warn("A descrição deve conter ao menos 20 caracteres");
          return;
        }
        
        if (new Date(startAt) <= new Date()){
            toast.warn("A data de início não pode ser menor do que a data atual");
            return;
        }

        if (new Date(startAt) > new Date(finishAt)){
            toast.warn("A data de término não pode ser menor do que a data de início");
            return;
        }

        if (questions.length < 3){
            toast.warn("Uma enquete deve conter pelo menos 3 opções!");
            return;            
        }
        
        const newPoll = {
          title,
          description,
          questions,
          startAt,
          finishAt
        }
        
       
        await dispatch(createPoll(newPoll))
        
        
      }

      useEffect(() => {
        if(error){
          toast.error(error)
        }
        if(message){
          toast.success(message)
          setTitle('');
          setDescription('');
          setQuestions([]);
          setStartAt('');
          setFinishAt('');
          setNewQuestion('');
        }
  
        return () =>{
          dispatch(reset())
        }
        
      },[error,message,dispatch])

      const handleInsertQuestion = () => {
        
        if (newQuestion.length < 1){
            toast.warn("A opção deve conter ao menoos um caractere");
            return;
        }

        setQuestions([...questions,newQuestion])
        setNewQuestion('');

      }

      const handleDeleteQuestion = (questionIndex) => {
        let updatedQuestions = questions.filter((question,index) => index !== questionIndex)

        setQuestions(updatedQuestions);
      }

      console.log(startAt)

  return (
    <div className={styles.container}>
        <div className={styles.mainContent}>
            <div className={styles.mainTitle}>
                <h1>Nova Enquete</h1>
                <h3>Cadastre uma nova enquete</h3>
            </div>
            <div className={styles.mainDescription}>  
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="title">Título</label>
                    <input 
                        type="text" 
                        name='title'
                        id='title' 
                        required               
                        placeholder='Título da enquete'
                        value={title}
                        onChange={((e) => setTitle(e.target.value))}
                        />  
                    <label htmlFor="description">Descrição</label>
                    <textarea 
                        name='description'
                        id='descriptiondescription'    
                        required            
                        placeholder='Descreva sua enquete'
                        value={description}
                        onChange={((e) => setDescription(e.target.value))}
                        />

                    <label htmlFor="dateStart">Data de início</label>
                    <input 
                        type="datetime-local" 
                        name='dateStart'
                        id='dateStart'    
                        required  
                        value={startAt}
                        onChange={((e) => setStartAt(e.target.value))}
                        />

                    <label htmlFor="dateFinish">Data de término</label>
                    <input 
                        type="datetime-local" 
                        name='dateFinish'
                        id='dateFinish'    
                        required  
                        value={finishAt}
                        onChange={((e) => setFinishAt(e.target.value))}
                        />

                    
                    <label htmlFor="question">Escreva uma opção</label>
                    <div className={styles.addQuestion}>
                        <input 
                            type="text" 
                            name='question'
                            id='question'         
                            placeholder='Ex.: Sim, Não, Talvez'
                            value={newQuestion}
                            onChange={((e) => setNewQuestion(e.target.value))}
                            />
                            <button type='button' onClick={() => handleInsertQuestion()}> <AiOutlinePlusCircle /></button>
                    </div>
                    <div className={styles.optionsList}>
                        <ul>
                            { questions && questions.length > 0 ? (
                                questions.map((question,index) => (
                                    <li key={index}>                                
                                        <div className={styles.optionText}>
                                            <p>{question}</p>
                                        </div>
                                        <div className={styles.buttonTrash}>
                                            <button type='button' onClick={() => handleDeleteQuestion(index)}> <AiFillDelete /> </button>
                                        </div>
                                    </li>
                                ))
                            ):(
                                <p>Insira uma questão</p>
                            )}
                        </ul>
                    </div>
                    
                    
                    
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

export default NewPoll