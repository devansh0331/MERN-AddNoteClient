import React , {useState , useEffect} from 'react'
import Card from '../card/Card'

function Admin() {
   
    const [userNotes , setUserNotes] = useState([])
    const [answer , setanswer] = useState('')
    const [isAns , setIsAns] = useState(false)
    const [succmsg , setSuccMsg] = useState('')
    const [errmsg , setErrMsg] = useState('')
    const Notes_URL = `https://add-note-yprd.onrender.com/readNotes`
      const getNotes = async () => {


            const data = await fetch( Notes_URL ,{method: 'GET',  headers: {
                'Content-Type': 'application/json',
              },
            })  
            const parsedData = await data.json()
            // console.log( parsedData);
            setUserNotes(parsedData)
          
       
      }

      const handleVerify = (e) => {
        e.preventDefault()
        if(answer === "Sneha"){
            setSuccMsg('Access Granted!')
            setErrMsg('')
            setTimeout(() => {
                setSuccMsg('')
                setIsAns(true)
                
            }, 1000);
        }
        else{
            setErrMsg('Admin ko call krke puch lo')
        }
      }
      

      useEffect(() => {
        
        getNotes()
        
      }, [])
  return (
  <div id="admin">
    <h1>Welcome to ADMIN</h1>
            {isAns && <p>Caution: Routing might risk your access to admin-pannel</p>}
            {!isAns && <p>Answer the following question to read all the Notes available on database</p>}
         {!isAns &&   <form id='addNote' onSubmit={handleVerify}>
            <div>

<label>Write the name of Admin's Crush*</label>
<input name='answer' onChange={(e) => {setanswer(e.target.value)}} value={answer} type="text" />
</div>
<button>Verify</button>
            </form>}
        {isAns && <div className='nContainer'>
            

    {userNotes.map((item,key) => {
        return (
            <Card key={key} title={item.title} desc={item.description} />
            )
        })}
      </div>}
      {succmsg ? <p style={{color:'green'}}>{succmsg}</p> : <p style={{color:'red'}}>{errmsg}</p>}
        </div>
  )
}

export default Admin
