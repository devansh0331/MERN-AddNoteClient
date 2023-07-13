import React , {useState , useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthConfig';

function Signup() {
  const {UserName , getCurrentUser} = useAuth()
  const [name, setName] = useState('');
  const [uName, setUName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  // const [successMsg, setSuccessMsg] = useState('');
  // const [errorMsg, setErrorMsg] = useState('');
  const [succmsg , setSuccMsg] = useState('')
  const [errmsg , setErrMsg] = useState('')

  const navigate = useNavigate()
  // const fetchUser = async () => {
  //   await getCurrentUser()
  //   console.log(UserName);

  // }
   
    

  const handleSignup = async (e) => {
    e.preventDefault()
    const userData = {name , uName, email, password}
    if(password === repassword){

   
    try{
      const response = await fetch('https://add-note-yprd.onrender.com//newUser',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const resPonse = await response.json()
      console.log(resPonse);

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
      else if(resPonse.status == 500){
        setErrMsg(resPonse.msg)
      }
      else{
        throw new setErrMsg('Error');
      }
    }
    catch(err){
      setErrMsg("some error has occured" + err)
    }
  }else{
    setErrMsg("Password does not match")
  }

  }
  // useEffect(() => {
  //   fetchUser()
  // }, [handleSignup])
  

  return (
    <div id='home'>
        <span>SignUp</span>  
        <form id='addNote' onSubmit={handleSignup}>
            <div>

            <label>Full Name*</label>
            <input name='name' onChange={(e) => {setName(e.target.value)}} value={name} type="text" />
            </div>
            <div>

            <label>UserName*</label>
            <input name='uName' onChange={(e) => {setUName(e.target.value)}} value={uName} type="text" />
            </div>
            <div>

            <label>Email*</label>
            <input name='email' onChange={(e) => {setEmail(e.target.value)}} value={email} type="email" />
            </div>
            <div>

            <label>Password*</label>
            <input name='password' onChange={(e) => {setPassword(e.target.value)}} value={password} type="password" />
            </div>
            <div>

            <label>Re-Password*</label>
            <input name='repassword' onChange={(e) => {setRePassword(e.target.value)}} value={repassword} type="password" />
            </div>
           
            <button>SignUp</button>
        </form>
        <p>Already a User? <Link to='/login' style={{textDecoration:'none' ,   color: 'rgb(58, 58, 58)'}}>LogIn</Link></p>
        {succmsg ? <p style={{color:'green'}}>{succmsg}</p> : <p style={{color:'red'}}>{errmsg}</p>}
          
    </div>
  )
}

export default Signup
