import React,{useContext} from 'react';
import {Link,useHistory } from "react-router-dom";
import {UserContext} from "../App"
const Navbar=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)

  const renderList=()=>{
    if(state){
      return [
        <li><Link to="/Profile">Profile</Link ></li>,
        <li><Link to="/Createpost">Create Post</Link ></li>,
        <li>
          <button type="text" className="btn #b71c1c red darken-4"   
           onClick={()=> {
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push("/signin")
           }} 
           >Logout</button>
        </li>
             ]
    }
    else{
      return [
        <li><Link to="/Signin">Signin</Link ></li>,
        <li><Link to="/Signup">Signup</Link ></li>
             ]
        }
   }
    return(
      
           <nav>
             <div className="nav-wrapper white " style={{paddingLeft:"10px"}}>
              <Link to={state?"/":"/signin"} className="brand-logo left " >facebook</Link >
              <ul id="nav-mobile" className="right"> 
               {renderList()}
              </ul>
             </div>
           </nav>          
    )
}

export default Navbar;