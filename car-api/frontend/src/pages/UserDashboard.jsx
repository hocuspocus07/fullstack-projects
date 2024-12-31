import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export function UserDashboard() {
    const [user,setuser]=useState({});
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchUserData=async()=>{
            try{
                const apiKey=localStorage.getItem('apiKey');
                const authToken=localStorage.getItem('authToken');
                const userResponse=await fetch(`https://car-api-o2p5.onrender.com/api/cars?apiKey=${apiKey}`,{
                    method:'GET',
                    headers:{
                        Authorization:`Bearer ${authToken}`,
                    }
                });
                const data=await userResponse.json();
            }catch(error){
                onslotchange.log(error);
            }
        }
    })
  return (
    <div>UserDashboard</div>
  )
}
