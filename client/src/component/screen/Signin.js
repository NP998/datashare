import React, { useState,useContext } from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from "materialize-css";
import { UserContext } from '../../App'

const Signin=()=>{
  
  // 1(a)
  const {state,dispatch}=useContext(UserContext)   

  const history=useHistory();


  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  //make n/w request (to send data from signup page)
  const PostData=()=>{
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
    {
             M.toast({html:"Invalid Email",classes:"#e53935 red darken-1"})
             return
    }
    fetch("/signin",{
           method:"post",
           headers:{
              "Content-type":"application/json"
                   },
           body:JSON.stringify({
         
               email:email,
               password:password
                               })   
               }).then(res=>res.json())
               .then(data=>{
                 console.log(data)
                 if(data.error){
                               M.toast({html: data.error,classes:"#e53935 red darken-1"})
                               }
                 else{
                   //first login then post data at server thats why i use localstorage
                       localStorage.setItem("jwt",data.token)
                       localStorage.setItem("user",JSON.stringify(data.user))

                      // 1(b) //dispacth move at reducer now have updated state
                       dispatch({type:"USER",payload:data.user})

                       M.toast({html:"signedin succesfully",classes:"#00c853 green accent-4"})
                       history.push("/")
                     }
                
                 
               }).catch(err=>{
                console.log(err)
               })
              
              
  }
        
      

    return(
       <div className="mycard">
            <div className="card auth-card input-field">
              <h2 style={{color: "#111d5e"}}>facebook</h2>  
              <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
              <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
              <button type="text" className="btn waves-effect waves-light" onClick={()=>PostData()} style={{background: "#111d5e"}} >Signin</button>
              <h5><Link to="/Signup">Create a facebook account </Link></h5>
            </div>

       </div>
    )
}

export default Signin;