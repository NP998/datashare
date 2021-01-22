import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import M from "materialize-css"

const Createpost=()=>{

     const history=useHistory()
     const[title,setTitle]=useState("")
     const[body,setBody]=useState("")
     const[image,setImage]=useState("")
     const[url,setUrl]=useState("")

    // depandency array is url .when url change then useEffect kick
    // 2 this kick in after succesfully posted image at cloudinary posting data at server(mongoose atlas)
    useEffect(()=>{
         if(url)
         {
        fetch("/createpost",{
            method:"post",
            headers:{
               "Content-type":"application/json",
               //for localstorage use in route-auth-signin
               "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                body:JSON.stringify({
          
                title:title,
                body:body,
                pic:url
                                })   
                }).then(res=>res.json())
                .then(data=>{
                
                  if(data.error){
                                M.toast({html: data.error,classes:"#e53935 red darken-1"})
                                }
                  else{
                        M.toast({html:"post succesfully",classes:"#00c853 green accent-4"})
                        history.push("/")
                      }
                 
                  
                }).catch(err=>{
                 console.log(err)
                })
         }

     },[url])
    // 1 posting details at coludinery like vedio,photo
     const postDetails=()=>{
          const data=new FormData()
          data.append("file",image)
          data.append("upload_preset","facebook")
          data.append("cloud_name","nav")
          //after image upload generate a url
          

          fetch("https://api.cloudinary.com/v1_1/nav/image/upload",{
              method:"post",
              body:data
          })
          .then(res=>res.json())
          .then(data=>{
              setUrl(data.url)
          })
          .catch(err=>{
              console.log(err) 
        })

        
        
            } 

    return(
        <div className="card input-filed createpost">
         <input  type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
        
         <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)}/>
        
        <div className="file-field input-field">
        <div className="btn" style={{background:"#111d5e"}}>
            <span> <i class="material-icons">add</i> IMAGE</span>
            <input type="file"  onChange={(e)=>setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
            <input className="file-path validate" type="text" placeholder="Upload one or more files" />
        </div>
        </div>
        <button type="text" onClick={()=>postDetails()} className="btn waves-effect waves-light" style={{background: "#111d5e"}} >SUBMIT</button>
        </div>
    )

}


export default Createpost