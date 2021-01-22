import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from "materialize-css"

const Signin=()=>{
         // if saved succesfully then navigate at login page by useHistory
          const history=useHistory();

          const [name,setName]=useState("")
          const [email,setEmail]=useState("")
          const [password,setPassword]=useState("")

          //make n/w request (to send data from signup page)
          const PostData=()=>{
            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
            {
                     M.toast({html:"Invalid Email",classes:"#e53935 red darken-1"})
                     return
            }
            fetch("/signup",{
                   method:"post",
                   headers:{
                      "Content-type":"application/json"
                           },
                   body:JSON.stringify({
                       name:name,
                       email:email,
                       password:password
                                       })   
                       }).then(res=>res.json())
                       .then(data=>{
                         if(data.error){
                                       M.toast({html: data.error,classes:"#e53935 red darken-1"})
                                       }
                         else{
                               M.toast({html: data.message,classes:"#00c853 green accent-4"})
                               history.push("/Signin")
                             }
                        
                         
                       }).catch(err=>{
                        console.log(err)
                       })
                      
                      
          }

    return(
       <div className="mycard">
            <div className="card auth-card input-field">
              <h2 style={{color: "#111d5e"}}>facebook</h2>
              <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}></input>  
              <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
              <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
              <button type="text" className="btn waves-effect waves-light" onClick={()=>PostData()} style={{background: "#111d5e"}} >Signup</button>
              <h5><Link to="/Signin">Do you have accout ?</Link></h5>
            </div>
       </div>
    )
}

export default Signin;