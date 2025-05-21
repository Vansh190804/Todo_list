import { useState, useEffect, useRef } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


function App() {
  const [task, settask] = useState(" ")
  const [store, setstore] = useState([])
  let [deletestore, setdeletestore] = useState([])
  let [nondeletestore, setnondeletestore] = useState([])
  const [buttonText, setbuttonText] = useState("Add")
  const [Complete, setComplete] = useState("Show Completed Tasks")
  const show = useRef()


  
  const handleChange = (e) => {
    settask(e.target.value)
  }

  const handleAdd = () => {
    if (task.trim() !== '') {
    if(Complete === "Show Completed Tasks"){
    setstore([...store, { id: uuidv4() , task, isCompleted: false }])
    settask("")
    setbuttonText("Add")
    }
    else{
    setnondeletestore([...nondeletestore, { id: uuidv4() , task, isCompleted: false }])
    settask("")
    setbuttonText("Add")
    console.log(nondeletestore)
    }
    }
    else{
      alert("Add a task first")
    }
  }

  const handleKeyDown = (e)=>{
    if (task.trim() !== ''){
    if(Complete === "Show Completed Tasks"){
    if(e.key=== "Enter"){
      setstore([...store, { id: uuidv4() , task, isCompleted: false }])
      settask("")
      setbuttonText("Add")
    }
    }
    else{
      if(e.key=== "Enter"){
      setnondeletestore([...nondeletestore, { id: uuidv4() , task, isCompleted: false }])
      settask("")
      setbuttonText("Add")
      console.log(nondeletestore)
      }
    }
    }
    else{
    if(e.key === "Enter")
    alert("Add a task first")
    }
  }

  const handleCheck = (e)  => {
      if(Complete === "Show Completed Tasks"){
        // changing isCompleted
        let id= e.target.name
        let index= store.findIndex(item=>{
          return item.id === id
        })
        let updatestore = [...store]
        updatestore[index].isCompleted = !(updatestore[index].isCompleted)
        setstore(updatestore)

        // true elements array
        let newdelete = updatestore.filter(item=>{
          return item.isCompleted === true
          })
          setdeletestore((prevDeletestore) => {
            const updatedDeletestore = [...prevDeletestore];  
            newdelete.forEach((item) => {
                updatedDeletestore.push(item);
            })
            return updatedDeletestore;
          })

        // false elements array
        let newnondelete = updatestore.filter(item=>{
            return item.isCompleted === false
            })
        setnondeletestore(newnondelete)

        //deleting element from completed list
        let newstore = updatestore.filter(item=>{
          return item.id!==id
        })
        setstore(newstore)

        //deleting elements from nonplete list
      }

      else{
        console.log(nondeletestore)
        // changing isCompleted
        let id= e.target.name
        let index= store.findIndex(item=>{
          return item.id === id
        })
        let updatestore = [...store]
        updatestore[index].isCompleted = !(updatestore[index].isCompleted)
        setstore(updatestore)
        
        console.log(nondeletestore)
        //Removing unchecked items (from deletestore list)
        let uncheckstore = deletestore.filter(item=>{
          return item.isCompleted !== false
        })
        setstore(uncheckstore)
        
        console.log(nondeletestore)
        //Showing them in Incompleted store in nondeletestore
        let ind= deletestore.findIndex(item=>{
          return item.isCompleted === false
        })
        let updatenondeletestore = [...nondeletestore, deletestore[ind] ]
        setnondeletestore(updatenondeletestore)

       console.log(nondeletestore)
        //removing them from deletestore state
        let updatedeletestore = deletestore.filter(item=>{
          return item.isCompleted === true
        })

        console.log(nondeletestore)
        setdeletestore(updatedeletestore)
        
      }
  }

  const handleDelete = (e, id) =>{
    let newstore = store.filter(item=>{
      return item.id!==id
    })
    setstore(newstore)

    if(Complete === "Show Completed Tasks"){
    const indexToDelete = nondeletestore.findIndex(item => item.id === id);
    if (indexToDelete !== -1) {
    const newnondeletestore = [...nondeletestore];
    newnondeletestore.splice(indexToDelete, 1);
    setnondeletestore(newnondeletestore);
    console.log(nondeletestore)
    }
  }

    else{
    const indexDelete = deletestore.findIndex(item => item.id === id);
    if (indexDelete !== -1) {
    const newdeletestore = [...deletestore];
    newdeletestore.splice(indexDelete, 1);
    setdeletestore(newdeletestore);
    console.log(deletestore)
    }
  }
    
    
  }

  const handleEdit = (e, id) =>{
    let index= store.findIndex(item=>{
      return item.id === id
    })
    settask(store[index].task)
    let newstore = store.filter(item=>{
      return item.id!==id
    })
    setstore(newstore)
    setbuttonText("Save")
  }
  
  const handleShow = ()=>{
    
       if(deletestore.length != 0 || Complete === "Show Incompleted Tasks"){
        if(Complete === "Show Completed Tasks"){
        setstore(deletestore) 
        setComplete("Show Incompleted Tasks")
        }
        else{  
           setstore(nondeletestore) 
           setComplete("Show Completed Tasks")
         }
      }
      else{
        alert("You have not completed any tasks")
      }
  }   

  
  return (
    <>

    <div className='flex mj:flex-row flex-col w-full h-screen items-center'>
      <header className='mj:w-1/4 w-3/4 mj:h-full h-1/4 flex items-center justify-start text-center mj:text-start'>
        <h1 className="text-customSkin mj:text-7xl text-5xl font-extralight">Nothing Changes If Nothing Changes.</h1>
      </header>

      <div className="container flex flex-col overflow-y-auto hide-scrollbar w-full mj:w-3/4 h-full items-center">

        <div className="taskInput flex flex-row mb-8 mt- w-full mj:w-3/4">
          <input type="text" className='bg-transparent border-black border w-[500px] h-10 rounded-full m-4' value={task} onChange={handleChange} onKeyDown={handleKeyDown} />
          <button className='bg-black text-white w-2/12 h-10 rounded-full m-4' onClick={handleAdd}>{buttonText}</button>
        </div>
        
        <div className='flex w-3/4 justify-center mj:justify-start mj:ml-60'>
        {(nondeletestore.length == 0) && <div className='text-2xl'>Adds Your Tasks Here...</div>}
        {(nondeletestore.length != 0) && <button ref={show} className='m-2 bg-black text-white h-8 rounded-full text-sm w-52' onClick={(e)=>{handleShow(e)}}>{Complete}</button>}
        </div>

        {store.map(item => {
          return <div key={item.id} className="flex flex-row justify-between items-center w-3/4 m-2 ">
            <div className='w-3/4 h-10 flex items-center'>
              <input onChange={handleCheck} className="checkbox mr-2 w-6 h-6 appearance-none flex items-center justify-center border border-gray-500 rounded bg-black bg-opacity-40 cursor-pointer checked:appearance-auto" type="checkbox" checked={item.isCompleted} name={item.id}/> 
              <span className={item.isCompleted ? "line-through text-customSkin": "text-customSkin text-xl w-11/12 break-words"}>{item.task}</span>
            </div>
            <div className='w-1/4 flex'>
              <button className="delete mr-2 bg-black text-white w-10 h-10 rounded-full flex justify-center items-center flex-wrap" onClick={(e)=>{handleDelete(e, item.id)}}><MdDelete /></button>
              <button className="edit bg-black text-white w-10 h-10 rounded-full flex justify-center items-center flex-wrap" onClick={(e)=>{handleEdit(e, item.id)}}><MdEdit/></button>
            </div>
          </div>  
        })}
      </div>
      </div>
    </>
  )
}

export default App
