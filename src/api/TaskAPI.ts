import { isAxiosError } from "axios"
import api from "../lib/axios"
import { Project, ProjectForm, Task } from "../types"

type TaskAPI = {
    formData: ProjectForm,
    projectId: Project['_id']
    taskId: Task['_id'],
    status: Task['status']
}

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

export async function updateStatus({projectId, taskId, status} : Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) {
    try {
        const url = `/projects/${projectId}/task/${taskId}/status`
        const {data} = await api.post<string>(url, {status})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}