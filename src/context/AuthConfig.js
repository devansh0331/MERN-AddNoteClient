import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  
    const [cuser , setCUser] = useState({ uName: '' , password : ''})
    // const [Name, setName] = useState('')
    const [UserName, setUserName] = useState('')
    // const [UserEmail, setUserEmail] = useState('')
    // const [UserPassword, setUserPassword] = useState('')
    
    function getCurrentUser   () {
        if(window.localStorage.getItem('userData')){
            const newUsers =  JSON.parse(window.localStorage.getItem('userData'))
            setCUser({
                // name : newUsers.name,
                uName: newUsers.uName,
                // email: newUsers.email,
                password : newUsers.password
            });
            setUserName(cuser.uName)
        }
        
        
        
        
        // setUserEmail(cuser.email)
        // setUserPassword(cuser.password)

        
      }

     
      
  const value = {
    UserName,
    getCurrentUser

  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
