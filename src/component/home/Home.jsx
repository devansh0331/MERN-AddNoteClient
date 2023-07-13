import React, {useState , useEffect} from 'react'


import "./Home.css"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthConfig'
function Home() {
  const {UserName , getCurrentUser} = useAuth()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
  
    const [currUserName , setCurrUserName] = useState('')
    const [succmsg , setSuccMsg] = useState('')
    const [errmsg , setErrMsg] = useState('')
      

    const navigate = useNavigate()

  
    
    
    // const getCurrentUser =  () => {
    
    //     const newUsers =  JSON.parse(window.localStorage.getItem('userData'))
    
    //     setCUser({
    //         name : newUsers.name,
    //         uName: newUsers.uName,
    //         email: newUsers.email,
    //         password : newUsers.password
    //     });
        
    //   }
    const fetchUser = async () => {
      
      
      await getCurrentUser()
      setCurrUserName(UserName)
    }
    
    
  
      

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const uName = UserName
        const userData = {title, desc, uName}

       
        if(UserName){
          if(title === "" || desc===""){
              setErrMsg("Please Add Some Text...")
          }
      else{

      
        try{
            const response = await fetch('http://127.0.0.1:5002/addNote',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
              })

              const resPonse = await response.json()
                if(resPonse.status == 200){
                    setSuccMsg(resPonse.msg)
                }
                else if(resPonse.status == 400){
                    setErrMsg(resPonse.msg)
                }
              
        }
        catch(error){
            throw alert("Error " + error)
        }}
      }else{
        navigate('/signup')
      }
    }
    useEffect(() => {
      fetchUser()
    }, [handleSubmit])
  return (
    <div id='home'>
        <span>ADD A NOTE</span>
        
        <form id='addNote' onSubmit={handleSubmit}>
            <div>

            <label>Add Title</label>
            <input type="text" name='title' onChange={(e) => {setTitle(e.target.value)}} value={title} />
            </div>
            <div>

            <label>Add Description</label>
            <textarea type="textarea" name='desc' onChange={(e) => {setDesc(e.target.value)}} value={desc} />
            </div>
            {UserName ? <button>Add</button> : <button>Get Started</button> }
        </form>
        {succmsg ? <p style={{color:'green'}}>{succmsg}</p> : <p style={{color:'red'}}>{errmsg}</p>}
      
    </div>
  )
}

export default Home
