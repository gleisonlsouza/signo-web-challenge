import React, { useMemo } from 'react'
import styles from './EditPoll.module.scss'

import { AiOutlinePlusCircle,AiFillDelete,AiFillEdit } from "react-icons/ai";


// hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "react-toastify";

// Redux 
import { getPollById,updateQuestion,deleteQuestion,insertQuestion,updatePoll, reset } from '../../../slices/pollsSlice';
import { profile } from '../../../slices/userSlice';
import { useParams } from 'react-router-dom';

const EditPoll = () => {
    const { id } = useParams();
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [questions,setQuestions] = useState([])
    const [startAt,setStartAt] = useState('')
    const [finishAt,setFinishAt] = useState('')
    const [newQuestion,setNewQuestion] = useState('')
    const [editQuestion,setEditQuestion] = useState('')
    const [editQuestionId,setEditQuestionId] = useState('')



    const dispatch = useDispatch()
  
    const { polls,deletedId,message,error,insertedQuestion, loading } = useSelector((state) => state.polls)
    const { user } = useSelector((state) => state.auth);


    useEffect(() => {       
        dispatch(getPollById(id)) 
        dispatch(profile())      
    },[dispatch,id])

    useMemo(() => {       
        if(polls.poll){
            setTitle(polls.poll.title)
            setDescription(polls.poll.description) 
            setStartAt(polls.poll.startAt.slice(0,-8))
            setFinishAt(polls.poll.finishAt.slice(0,-8))
            setQuestions(polls.questions)      
        }   
    },[polls])

    useEffect(() => {
        if(error){
          toast.error(error)
        }
        if(message){
          toast.success(message)
          if(deletedId){
            setQuestions(questions.filter((obj) => obj.id !== deletedId))            
          }  
          if(insertedQuestion.id){
            setQuestions([...questions,insertedQuestion])
          }        
        }  
        return () =>{
          dispatch(reset())
        }
        
      },[error,message,deletedId,dispatch])

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
        
        let data = {}
        const updatedPoll = {
          title,
          description,
          startAt,
          finishAt
        }

        data.pollId = id;
        data.data = updatedPoll;
        
       
       await dispatch(updatePoll(data))
       
        
        
      }

      

      const handleInsertQuestion = async() => {
        
        if (newQuestion.length < 1){
            toast.warn("A opção deve conter ao menoos um caractere");
            return;
        }

        let data = {}
        const newQuestionData ={
            textQuestion: newQuestion,
        }

        data.pollId = id;
        data.data = newQuestionData

        await dispatch(insertQuestion(data))
        setNewQuestion('');

      }

           
      const handleEdit = (questionId,textQuestion) =>{
        setEditQuestion(textQuestion);
        setEditQuestionId(questionId);
      }

      const handleClearEdit = () =>{
        setEditQuestion('');
        setEditQuestionId('');
      }

      const handleUpdateQuestion = async(e) => {
        e.preventDefault()

       let data = {}
        const questionData ={            
            textQuestion: editQuestion
        }

        data.pollId = id;
        data.questionId = editQuestionId
        data.data = questionData

        await dispatch(updateQuestion(data))        

        let newListQuestions = questions.map((obj) => obj.id === editQuestionId ? {...obj, textQuestion: editQuestion} : obj);
        
        setQuestions(newListQuestions)
        handleClearEdit();    
        
      }

      const handleDeleteQuestion = async(questionId) => {
        let data = {}        

        data.pollId = id;
        data.questionId = questionId

        await dispatch(deleteQuestion(data))   
      }
      

    useEffect(() => {
        return () =>{
            dispatch(reset())
          }        
    },[dispatch])
      
    if(polls.poll){
        if (polls.poll.userId !== user.id){
            return (
                <div className={styles.mainContent}>
                    <div className={styles.mainTitle}>
                        <h1>Não autorizado</h1>
                        <h3>Você não tem autorização para editar essa enquete</h3>
                    </div> 
                </div>
                )
          }
          
        if (new Date(polls.poll.startAt.slice(0,-8)) <= new Date()){
            return (
                <div className={styles.mainContent}>
                    <div className={styles.mainTitle}>
                        <h1>Não autorizado</h1>
                        <h3>Não é possível editar essa enquete, ela pode estar em andamento ou encerrada</h3>
                    </div> 
                </div>
                )
          } 
    }
      
    
  return (
    <div className={styles.container}>
        {editQuestion && (
            <div className={styles.editQuestion}>
                <div className={styles.editContent}>
                    <h2>Editar Questão</h2>
                    <form onSubmit={handleUpdateQuestion}>
                        <input 
                        type="text" 
                        value={editQuestion}
                        onChange={(e) => setEditQuestion(e.target.value)}
                        />
                        <div className={styles.buttons}>
                            <button type='submit' className={styles.btnSave}>Salvar</button>
                            <button type='button' className={styles.btnCancel} onClick={() => handleClearEdit()}>Cancelar</button>
                        </div>
                    </form>
                </div>            
        </div>
        )}
        
        <div className={styles.mainContent}>
            <div className={styles.mainTitle}>
                <h1>Editar Enquete</h1>
                <h3>Edite sua enquete</h3>
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
                        value={title && title}
                        onChange={((e) => setTitle(e.target.value))}
                        />  
                    <label htmlFor="description">Descrição</label>
                    <textarea 
                        name='description'
                        id='descriptiondescription'    
                        required            
                        placeholder='Descreva sua enquete'
                        value={description || ''}
                        onChange={((e) => setDescription(e.target.value))}
                        />

                    <label htmlFor="dateStart">Data de início</label>
                    <input 
                        type="datetime-local" 
                        name='dateStart'
                        id='dateStart'    
                        required  
                        value={startAt || ''}
                        onChange={((e) => setStartAt(e.target.value))}
                        />

                    <label htmlFor="dateFinish">Data de término</label>
                    <input 
                        type="datetime-local" 
                        name='dateFinish'
                        id='dateFinish'    
                        required  
                        value={finishAt || ''}
                        
                        onChange={((e) => setFinishAt(e.target.value))}
                        />

                    {!loading ? (
                        <button type='submit' id='submit'>Salvar</button>
                    ):(
                        <button type='submit' id='submit' disabled>Aguarde...</button>
                        )
                    }
                    <label htmlFor="question">Escreva uma opção</label>
                    <div className={styles.addQuestion}>
                        <input 
                            type="text" 
                            name='question'
                            id='question'         
                            placeholder='Ex.: Sim, Não, Talvez'
                            value={newQuestion || ''}
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
                                            <p>{question.textQuestion}</p>
                                        </div>
                                        <div className={styles.buttons}>
                                            <button type='button' onClick={() => handleDeleteQuestion(question.id)}> <AiFillDelete /> </button>
                                            <button type='button' onClick={() => handleEdit(question.id,question.textQuestion)}> <AiFillEdit /> </button>
                                        </div>
                                    </li>
                                ))
                            ):(
                                <p>Insira uma questão</p>
                            )}
                        </ul>
                    </div>
                    
                    
                    
                    
                            
                </form>              

            </div>
        </div>        
    </div>
  )
}

export default EditPoll