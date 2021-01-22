import React ,{useEffect,useState,useContext} from 'react';
import {UserContext} from "../../App"
const Profile=()=>{
    const [mypics,setPics]=useState([])
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
       fetch("/mypost",{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
          setPics(result.mypost)
       })
    },[])
    return(
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div className="profile-card">
            <div>
              <img style={{height:"160px",width:"160px",borderRadius:"80px"}} 
                  src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Njd8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60">
              </img>
            </div>

            <div>
                 <h4>{state?state.name:"loading"}</h4>
                 <div className="follower-head">
                 <h6>10 posts</h6>
                 <h6>10 follower</h6>
                 <h6>10 following</h6> 
                 </div>
            </div>
            </div>
            <div className="gallary">
                {
                    mypics.map(item=>{
                        return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title}/>
                        )
                    })
                }
                
            </div> 
        </div>
    )
}

export default Profile ;