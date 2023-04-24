import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  acceptProjectInDB,
  applyProjectInDB,
  createPost, deleteProjectFromDB, getAllProjectsFromDB, getMyProjectsFromDB, getProjectsAppliedFromDB
} from "../services/freelance.service.js";
const router = express.Router();

//!below api is foront end api to use to send mail.
const API = "https://bulk-emailtool.netlify.app";

router.post('/postProject',auth,express.json(),async function(request, response){
    const data= request.body;
    const info = request.info;
    const dataToInsert  ={
        ...data,
        ...info,
        date:new Date(),
        whoApplied:[]
    }
    // delete dataToInsert.iat
    if(info.roleId === 'client'){
      const result = await createPost(dataToInsert)
      response.send({...result,message:"created"})
    }else{
      response.json("unsuccessfull because of role")
    }
    console.log(dataToInsert);
  })

router.get('/getAllProjects',auth,express.json(),async function(request, response){
    
    const resData  = await getAllProjectsFromDB()
    response.send(resData)
    // if(resData === null){
    //   response.status(404).send({message:"not-available"})
    // }else{
    // }
})

router.get('/getMyProjects',auth,express.json(),async function(request, response){
   const info=request.info;
   const result = await getMyProjectsFromDB(info.userId)
   response.send(result)
   
})

router.put('/ApplyProject',auth,express.json(),async function(request, response){
   const info=request.info;
   const id=request.body
   console.log(id.project_Id);
   const result = await applyProjectInDB(info,id.project_Id);
   response.send(result)
})

router.put('/acceptProject',auth,express.json(),async function(request, response){
   const info=request.info;
   const ids=request.body
   
   const result = await acceptProjectInDB(ids);
   response.send(result)
})

router.delete('/deleteProject',auth,express.json(),async function(request, response){
   const info=request.info;
   const id=request.body
   
   const result = await deleteProjectFromDB(id);
   response.send(result)
})

router.get('/getProjetsApplied',auth,express.json(),async function(request, response){
   const info=request.info;
   const result = await getProjectsAppliedFromDB(info.userId);
   response.send(result)
})






export default router

