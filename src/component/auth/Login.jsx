import React , {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthConfig';


function Login() {
   const {UserName , getCurrentUser} = useAuth()
  const [uName, setUName] = useState('');
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [succmsg , setSuccMsg] = useState('')
  const [errmsg , setErrMsg] = useState('')
  

  const handleLogin = async (e) => {
        e.preventDefault()
        const userData = {uName , password}
        try{        
             const response = await fetch('https://add-note-yprd.onrender.com/login',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData), 
             })  

             const resPonse = await response.json()

             if(resPonse.status == 200){
               localStorage.setItem('userData' , JSON.stringify(userData))
               setSuccMsg(resPonse.msg)
               await getCurrentUser()
               setTimeout(() => {
                  navigate('/')
                  
               }, 1000);
             }
             else if(resPonse.status == 400){
               setErrMsg(resPonse.msg)
             }
             else if(resPonse.status == 401){
               setErrMsg(resPonse.msg)
             }

        }
        catch(err){
            throw setErrMsg(err)
        }
  }

  
  return (
    <div id='home'>
    <span>Log In</span>  
    <form id='addNote' onSubmit={handleLogin}>
       
        <div>

        <label>UserName*</label>
        <input name='uName' onChange={(e) => {setUName(e.target.value)}} value={uName} type="text" />
        </div>
        <div>


        <label>Password*</label>
        <input name='password' onChange={(e) => {setPassword(e.target.value)}} value={password} type="password" />
        </div>

       
        <button>Login</button>
    </form>
    <p sty>New User? <Link to='/signup' style={{textDecoration:'none' , color: 'rgb(58, 58, 58)'}}>SignUp</Link></p>
    {succmsg ? <p style={{color:'green'}}>{succmsg}</p> : <p style={{color:'red'}}>{errmsg}</p>}
</div>
  )
}

export default Login
