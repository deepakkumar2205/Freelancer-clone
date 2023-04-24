import React, { useContext } from 'react';
import { axiosAcceptProject, axiosDeleteProject } from '../../Services/axios';
import { toastSuccess } from '../../Services/tostify';
import Context from '../../Context/Context';

const Table = ({tableData, projectId,status}) => {
    const contextData = useContext(Context);

    const handleAccept=(id)=>{
        axiosAcceptProject({personId:id,projectId})
        .then((res)=>{
            if(res.status ===200){
                toastSuccess("Accepted")
            }
          contextData.getMyProjectsFunc()
        })
        .catch((err)=>console.log(err))
    }

    const handleDelete=(id)=>{
        axiosDeleteProject({id})
        .then((res)=>{
            if(res.status ===200){
                toastSuccess("Deleted Successfull")
            }
          contextData.getMyProjectsFunc()
        })
        .catch((err)=>console.log(err))
    }
  return (
    <div>
        <table className="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">Accept</th>
            </tr>
        </thead>
        <tbody>
           {tableData.map((val,inx)=>{
            return  <tr key={`${inx}`}>
                    <th scope="row">{inx+1}</th>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>
                        {val.userId === status ?<button type="button" className="btn btn-success btn-sm" disabled={val.userId === status } onClick={()=>handleAccept(val.userId)}>Accepted</button> :
                        <button type="button" className="btn btn-success btn-sm" disabled={"" !== status } onClick={()=>handleAccept(val.userId)}>Accept</button> }  
                    </td>
                    </tr>
           })}
        </tbody>
        </table>
        <button type="button" className="btn btn-danger btn-sm" onClick={()=>handleDelete(projectId)}>Delete Project</button> 
    </div>
  )
}

export default Table