import './App.css';
import Navbar from "./component/Navbar";
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import Home from "./component/screen/Home";
import Signin from "./component/screen/Signin";
import Profile from "./component/screen/Profile";
import Signup from "./component/screen/Signup";
import Createpost from "./component/screen/Createpost";
import React,{useEffect,createContext,useReducer,useContext} from 'react'
import {initalstate,reducer} from "./reducer/userReducer"
import UserProfile from "./component/screen/UserProfile"

export const UserContext=createContext()

// we make a routing function only for useHistory outside <BrowserRouter>
const Routing=()=> {
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)  

 useEffect(()=> {
  const user=JSON.parse(localStorage.getItem("user"))
 
  if(user){
     dispatch({type:"USER",payload:user})
     //history.push("/")
         }
  else{
    history.push("/signin")
  }   
  
},[])
  return(
    // we can add Switch,div,<>,<react.fragment> //switch use for confirm any one route active at a time 
     <Switch>

        <Route exact path="/"><Home/></Route> 
        <Route path="/Signin"><Signin/></Route> 
        <Route exact path="/Profile"><Profile/></Route> 
        <Route path="/Signup"><Signup/></Route> 
        <Route path="/Createpost"><Createpost/></Route> 
        <Route path="/profile/:userid"><UserProfile/></Route> 
    </Switch>   
         //path of prifile followed by any user id
  )
}
function App() {

    const [state,dispatch]=useReducer(reducer,initalstate)
    
  
  return (
    
    <UserContext.Provider value={{state,dispatch}}> 
     <BrowserRouter> 
      <Navbar />
      <Routing/>
     </BrowserRouter>  
    </UserContext.Provider> 
    
    
  );
}

export default App;
