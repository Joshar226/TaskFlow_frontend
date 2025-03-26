import { isAxiosError } from "axios"
import api from "../lib/axios"
import { Note, NoteForm, Project, Task } from "../types"

type NoteAPI = {
    formData: NoteForm,
    projectId: Project['_id'],
    taskId: Task['_id'],
    noteId: Note['_id']
}

export async function createNote({projectId, taskId, formData} : Pick<NoteAPI, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `/projects/${projectId}/task/${taskId}/notes`
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteNote({projectId, taskId, noteId} : Pick<NoteAPI, 'projectId' | 'taskId' | 'noteId'>) {
    try {
        const url = `/projects/${projectId}/task/${taskId}/notes/${noteId}`
        const {data} = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}