import axios from "axios"
import API from "../url"

export const singUpAxios =  (values)=>{
  return axios({
        url:`${API}/users/signup`,
        method:"post",
        data:values
      })
}

export const verifyEmailAxios =  (params)=>{
  return axios({
        url:`${API}/users/verifyemail/${params}`,
        method:"get"
      })
}

export const passResetAxios =  (data)=>{
  return axios({
        url:`${API}/users/resetpassword`,
        method:"post",
        data:data
      })
}

export const checkString =  (data)=>{
  return axios({
        url:`${API}/users/resetpassword/${data}`,
        method:"get"
      })
}

export const changePassAxios =  (data , string)=>{
  return axios({
        url:`${API}/users/changepassword/${string}`,
        method:"post",
        data:data
      })
}

export const loginAxios =  (data)=>{
  return axios({
        url:`${API}/users/login`,
        method:"post",
        data:data
      })
}

export const verifyTokenAxios =  (data)=>{
  return axios({
        url:`${API}/users/verifyToken`,
        method:"get",
        headers:{
          "x-auth-token":localStorage.getItem("x-Auth-token")
      }
      })
}

export const axiosPostProject = (data)=>{
   return axios({
    url:`${API}/freelance/postProject`,
    method:"post",
    data:data,
    headers:{
      "x-auth-token":localStorage.getItem("x-Auth-token")
  }
  })
}

export const axiosGetProjectsAll =  ()=>{
  return axios({
        url:`${API}/freelance/getAllProjects`,
        method:"get",
        headers:{
          "x-auth-token":localStorage.getItem("x-Auth-token")
      } 
      })
}

export const axiosGetMyProjects =  ()=>{
  return axios({
        url:`${API}/freelance/getMyProjects`,
        method:"get",
        headers:{
          "x-auth-token":localStorage.getItem("x-Auth-token")
      }
      })
}

export const axiosApplyProject =  (id)=>{
  return axios({
        url:`${API}/freelance/ApplyProject`,
        method:"put",
        data:{project_Id:id},
        headers:{
          "x-auth-token":localStorage.getItem("x-Auth-token")
      }
      })
}

export const axiosAcceptProject =  (id)=>{
  return axios({
        url:`${API}/freelance/acceptProject`,
        method:"put",
        data:id,
        headers:{
          "x-auth-token":localStorage.getItem("x-Auth-token")
      }
      })
}

export const axiosDeleteProject =  (id)=>{
  return axios({
        url:`${API}/freelance/deleteProject`,
        method:"delete",
        data:id,
        headers:{
          "x-auth-token":localStorage.getItem("x-Auth-token")
      }
      })
}

export const axiosGetProjectsApplied =  (id)=>{
  return axios({
        url:`${API}/freelance/getProjetsApplied`,
        method:"get",
        headers:{
          "x-auth-token":localStorage.getItem("x-Auth-token")
      }
      })
}