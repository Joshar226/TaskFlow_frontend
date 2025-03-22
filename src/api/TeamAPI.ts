import { isAxiosError } from "axios"
import api from "../lib/axios"
import { Project, ResetPasswordForm, teamMembersSchema, User, userSchema } from "../types"

export async function findCollaborator({projectId, formData } : {projectId: Project['_id'], formData: ResetPasswordForm}) {
    try {
        const url = `/projects/${projectId}/team/find`
        const {data} = await api.post(url, formData)
        const response = userSchema.safeParse(data)
        if(response.success) {
            return data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addCollaborator({projectId, id } : {projectId: Project['_id'], id: User['_id']}) {

    try {
        const url = `/projects/${projectId}/team`
        const {data} = await api.post<string>(url, {id})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectCollaborators(projectId : Project['_id']) {
    try {
        const url = `/projects/${projectId}/team`
        const {data} = await api.get(url)
        const response = teamMembersSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function removeProjectCollaborator({projectId, id } : {projectId: Project['_id'], id: User['_id']}) {
    try {
        const url = `/projects/${projectId}/team/${id}`
        const {data} = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}