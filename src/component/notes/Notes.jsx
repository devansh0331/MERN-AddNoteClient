import React ,{useState, useEffect} from 'react'

import { useAuth } from '../../context/AuthConfig'
import Card from '../card/Card'
import './Notes.css'

function Notes() {
   
    const {UserName} = useAuth()
    
    const [userNotes , setUserNotes] = useState([])
    
    // console.log("Value" + UserName);
    // const getCurrentUser =  () => {
    
    //     const newUsers =  JSON.parse(window.localStorage.getItem('userData'))
    //     // console.log(newUsers.name);
    //     setCUser({
    //         name : newUsers.name,
    //         uName: newUsers.uName,
    //         email: newUsers.email,
    //         password : newUsers.password
    //     });
    //     console.log(userName);
    //     setUserName(cuser.uName)
    //   }
        const Notes_URL = `https://add-note-yprd.onrender.com/readNotes/${UserName}`
      const getNotes = async () => {


            const data = await fetch( Notes_URL ,{method: 'GET',  headers: {
                'Content-Type': 'application/json',
              },
            })  
            const parsedData = await data.json()
            // console.log( parsedData);
            setUserNotes(parsedData)
             }

      useEffect(() => {
        // getCurrentUser()
        getNotes()
      }, [UserName])
    //   
      
  return (
    <div id='notes'>
      {userNotes ? <h1>Your Notes are Below</h1> : <h1>No notes available</h1>}
      {UserName && <div className='nContainer'>
      
      {userNotes.map((item,key) => {
          return (
              <Card key={key} user={item.userId} title={item.title} desc={item.description} />
              )
            })}
            </div>}
    </div>
  )
}

export default Notes
