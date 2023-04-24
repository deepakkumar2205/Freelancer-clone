import { useContext } from "react";
import Context from "../Context/Context";
import { axiosGetMyProjects } from "./axios";

export function GetMyprojectFunc(){
    const contextData = useContext(Context);
    axiosGetMyProjects()
      .then(res=>{
        console.log(res.data)
        contextData.setMyProjects(res.data)
      })
      .catch((err)=>console.log(err))
  }