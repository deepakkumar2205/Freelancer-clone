import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context/Context';
import { axiosApplyProject, axiosGetProjectsAll } from '../../Services/axios';
import { toastSuccess } from '../../Services/tostify';

const AllProjects = () => {
    const contextData = useContext(Context);

    useEffect(()=>{
      contextData.getAllProjectFunc()
    },[])
  
  const appliProjectFunc = (id) =>{
    axiosApplyProject(id)
      .then(res=>{
        if(res.status ===200){
          toastSuccess("Applyed Successful")
          contextData.getAllProjectFunc()
        }
      })
      .catch(err=>console.log(err))
  }

  const validateFunc = (id,inx) =>{
    const allproject = contextData.allProject
    const arr= allproject[inx].whoApplied;
    const res = arr.filter((e)=>e.userId === contextData.personId)
    return res.length
  }

  return (
      <div>
        <br/>
      <div className="container" style={{height:"90vh"}}>
     {contextData.allProject.map((data,inx)=>{
      return  <div key={data._id}> <div className="card" style={{width:"100%"}} >
                    <div className="card-body">
                      <div className='d-flex'>
                      <h5>Title:
                      <span className="badge rounded-pill text-bg-light">{data.title}</span>
                      </h5>
                      <div className='ms-auto'>
                        <h5>₹{data.price}</h5>
                      </div>
                      </div>
                      <hr />
                      <p>{new Date(data.date).toDateString()}</p>
                      <h6>Projected Posted by:</h6>
                      <p>{data.name}</p>
                      <h6>Description:</h6>
                      <p>{data.description}</p>
                      <h6>Skills Required:</h6>
                      <div className='d-flex'>
                      {data.skills.map((skill)=>{
                        return <div key={skill}><span className="badge text-bg-warning" >{skill}</span> &nbsp;</div>
                      })}
                      </div>
                      <br />
                      <div className="d-flex">
                        {contextData.role ==='client'?<></>:data.status ===""?
                            <button type="button" className="btn btn-primary" onClick={()=>appliProjectFunc(data._id)} disabled={validateFunc(data._id,inx)}>Apply</button>:<></>}
                        <div className="ms-auto">
                          {data.status ===""?<h6 style={{color:'green'}}>status: Not Assigned</h6>
                          :
                          <h6 style={{color:'#c1c1c1'}}>status: Assigned</h6>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  </div>
          })}   
      </div>
      </div>
        )
}

export default AllProjects