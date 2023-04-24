import { ObjectId } from 'mongodb';
import { client } from '../index.js';

// Data base name declared below :
const dataBaseName = 'Freelance'

export async function createPost(data) {
    return await client.db(dataBaseName).collection("projects").insertOne(data);
}

export async function getAllProjectsFromDB() {
    return await client.db(dataBaseName).collection("projects").find().toArray();
}

export async function getMyProjectsFromDB(userId) {
    return await client.db(dataBaseName).collection("projects").find({userId:userId}).toArray();
}

export async function applyProjectInDB(info,project_Id) {
    
    const {whoApplied} = await client.db(dataBaseName).collection("projects").findOne({_id:new ObjectId(project_Id)})

    return await client.db(dataBaseName).collection("projects").updateOne({_id:new ObjectId(project_Id)},{$set: {whoApplied:[...whoApplied,info]}})

}

export async function acceptProjectInDB(ids) {
    return await client.db(dataBaseName).collection("projects").updateOne({_id:new ObjectId(ids.projectId)},{$set: {status:ids.personId}})

}

export async function deleteProjectFromDB(id) {
   return await client.db(dataBaseName).collection("projects").deleteOne({_id:new ObjectId(id.id)})

}

export async function getProjectsAppliedFromDB(id) {
   return await client.db(dataBaseName).collection("projects").find({whoApplied:{$elemMatch:{userId:id}}}).toArray()

}


// vivade9962@raotus.com