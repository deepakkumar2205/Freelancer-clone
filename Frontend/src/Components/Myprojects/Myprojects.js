import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context/Context';
import Table from './Table';

const Myprojects = () => {
    
    const contextData = useContext(Context);
    
  useEffect(()=>{
     contextData.getMyProjectsFunc()
  },[])

  return (
    <div>
    <br />
  <div className="container">
 {contextData.myProjects.map((data=>{
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
                    {contextData.role ==='client'?<></>:data.status ===""?<button type="button" className="btn btn-primary">Apply</button>:<></>}
                    <div className="ms-auto">
                      {data.status ===""?<h6 style={{color:'green'}}>status: Not Assigned</h6>
                      :
                      <h6 style={{color:'#c1c1c1'}}>status: Assigned</h6>}
                    </div>
                  </div>
                  <h4>Applied List</h4>
                  <hr />
                  <Table tableData={data.whoApplied} projectId={data._id} status={data.status}/>
                </div>
                {data.completed && <div className='d-flex justify-content-center bg-success'>
                  <h5>Your Project is Completed</h5>
                </div>}
              </div>
              <br />
              </div>
      }))}   
  </div>
  </div>
  )
}

export default Myprojects