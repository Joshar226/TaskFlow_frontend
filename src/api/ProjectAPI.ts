import { isAxiosError } from "axios"
import api from "../lib/axios"
import { dashboardProjectSchema, Project, ProjectForm, projectSchema } from "../types"

export async function createProject(formData : ProjectForm) {
    try {
        const url = '/projects'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }    
}

export async function getProjects() {
    try {
        const url = '/projects'
        const {data} = await api.get(url)
        const response = dashboardProjectSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectById(id: Project['_id']) {
    try {
        const url = `/projects/${id}`
        const {data} = await api.get(url)
        const response = projectSchema.safeParse(data)

        if(response.success) {
            return response.data
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateProject({formData, projectId} : {formData : ProjectForm, projectId: Project['_id']}) {
    try {
        const url = `/projects/${projectId}`
        const {data} = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteProject(id :  Project['_id']) {
    try {
        const url = `/projects/${id}`
        const {data} = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}