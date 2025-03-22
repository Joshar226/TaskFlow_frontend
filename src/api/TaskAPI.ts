import { isAxiosError } from "axios"
import api from "../lib/axios"
import { Project, ProjectForm } from "../types"

export async function createTask({projectId, formData} : {projectId: Project['_id'], formData: ProjectForm}) {
    try {
        const url = `/projects/${projectId}/task`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }    
}

export async function getProjectTasks(projectId: Project['_id']) {
    try {
        const url = `/projects/${projectId}/task`
        const {data} = await api.get(url)

        console.log(data);
        

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }    
}