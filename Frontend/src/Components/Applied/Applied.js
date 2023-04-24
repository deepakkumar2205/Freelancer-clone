import React, { useContext, useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import Context from '../../Context/Context';
import { axiosGetProjectsApplied } from '../../Services/axios';

const Applied = () => {
    const [state, setState] = useState([]);
    const contextData = useContext(Context);

    useEffect(()=>{
      axiosGetProjectsApplied()
        .then(res=>{
          setState(res.data)
        })
        .catch((err)=>console.log(err))
    },[])
   
  return (
      <div>
        <br />
      <div className="container" style={{height:"90vh"}}>
     {state.map((data=>{
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
                       
                        <div className="ms-auto">
                          {data.status ===""?<h6 style={{color:'brown'}} onClick={()=>data}>status: Not Assigned</h6>
                          :
                          data.status === contextData.personId ?
                           <h6 style={{color:'green'}}>Assigned to you</h6>:
                          <h6 style={{color:'#c1c1c1'}}>status: Assigned to someone</h6>}
                        </div>
                      </div>
                        {data.status === contextData.personId &&
                            <button type="button" 
                                    className="btn btn-primary btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top" 
                                    data-tooltip-content='Click when you complete the project.'
                                    data-tooltip-id="my-tooltip"
                                    onClick={()=>console.log('completed')}
                            >Completed</button>}
                        <Tooltip id='my-tooltip' place="top"></Tooltip>
                    </div>
                  </div>
                  <br />
                  </div>
          }))}   
      </div>
      </div>
        )
}

export default Applied