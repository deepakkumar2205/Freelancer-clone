import React, { useEffect, useState } from 'react';
import { axiosGetMyProjects, axiosGetProjectsAll } from '../Services/axios';
import Context from './Context';

const Provider = (props) => {
    const [ navFlag ,setNavFlag ] = useState(false);
    const init = localStorage.getItem("role-token")==='11091cf6097423b33d510424'?'client':'freelancer' ;
    const [ role, setRole] = useState(init);
    const [allProject, setAllProject] = useState([]);
    const person_token = localStorage.getItem("person-token")
    const [personId, setPersonId ] = useState(person_token)
    const [myProjects, setMyProjects] = useState([]);

    useEffect(()=>{
      if (localStorage.getItem("x-Auth-token")) {
            setNavFlag(true);
          }
      getAllProjectFunc()
      getMyProjectsFunc()
    },[])
   
    function getAllProjectFunc(){
      axiosGetProjectsAll()
      .then(res=>{console.log(res.data);
                  setAllProject(res.data)})
      .catch((err)=>console.log(err))
    }

    function getMyProjectsFunc(){
      axiosGetMyProjects()
      .then(res=>{
        setMyProjects(res.data) 
      })
      .catch((err)=>console.log(err))
    }

  return (
    <Context.Provider value={{
        navFlag,
        setNavFlag,
        role,
        setRole,
        allProject,
        setPersonId,
        setAllProject,
        personId,
        myProjects,
        setMyProjects,
        getMyProjectsFunc,
        getAllProjectFunc
    }}>
        {props.children}
    </Context.Provider>
  )
}

export default Provider