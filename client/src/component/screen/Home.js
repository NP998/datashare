import React,{useState,useEffect,useContext} from 'react';
import {Link} from "react-router-dom"
import {UserContext} from '../../App'
const Home=()=>{
    const [data,setData]=useState([])
    const {state,dispatch} = useContext(UserContext)
    //use effect use for all post of users fatching at home screen from mongo atlas
    useEffect(()=>{
        fetch("/allpost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        
        })
    },[])
    return(
        <div className="home">
            {
                 data.map(item=>{
                     return(
                        <div className="card home-card" key={item._id}>
                        <h5><Link to={item.postedBy._id !==state._id?"/profile/"+item.postedBy._id:"/profile"}>{item.postedBy.name}</Link></h5>
                        <div>
                        <img src={item.photo} height="80%" width="100%" />
                        </div>
                        <div className="card-content">
                        <i className="material-icons">favorite</i>
                        <h6>{item.title}</h6>
                        <p>{item.body}</p>
                        <input type="text" placeholder="add a content" />
                        </div>
                    </div>
                     )
                 })
            }
            </div>
          )
        }
               

export default Home;