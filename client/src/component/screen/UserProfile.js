import React ,{useEffect,useState,useContext} from 'react';
import {UserContext} from "../../App"
import {useParams} from 'react-router-dom'//i want to access userid from app.js-"profile:userid"
const Profile=()=>{
    const [UserProfile,setProfile]=useState(null)
    const {state,dispatch}=useContext(UserContext)
    const {userid}=useParams() 
  
    useEffect(()=>{
       fetch(`/user/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
          console.log(result)
          setProfile(result)
       })
    },[])
    return(

        <>
        {UserProfile?
        
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
        <div className="profile-card">
        <div>
          <img style={{height:"160px",width:"160px",borderRadius:"80px"}} 
              src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Njd8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60">
          </img>
        </div>

        <div>
             <h4>{UserProfile.user.name}</h4>
             <h5>{UserProfile.user.email}</h5>
             <div className="follower-head">
             <h6>{UserProfile.posts.length}</h6>
             <h6>10 follower</h6>
             <h6>10 following</h6> 
             </div>
        </div>
        </div>
        <div className="gallary">
            {
                UserProfile.posts.map(item=>{
                    return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                    )
                })
            }
            
        </div> 
    </div>
        
        :<h2>Load data ....</h2>}
       
        </>
    )
}

export default Profile ;