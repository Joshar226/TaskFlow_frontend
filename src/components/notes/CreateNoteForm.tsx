import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { NoteForm, Task } from "../../types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "../../api/NoteAPI"
import { toast } from "react-toastify"

type CreateNoteFormProps = {
    task: Task
}

export default function CreateNoteForm({task} : CreateNoteFormProps) {
    const queryClient = useQueryClient()    
    

    const initialValues : NoteForm = {
        content: ''
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: createNote,
        onError: error => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['task']})
            toast.success(data)
            reset()
        }
    })

    const handleCreateNote = (formData : NoteForm) => {
        const data = {
            projectId: task.project,
            taskId: task._id,
            formData
        }
        mutate(data)
    }

  return (
    <form 
        className="notes-form"
        onSubmit={handleSubmit(handleCreateNote)}
    >
        <div className="form-div notes-form-div">
            <input
                type="text"
                placeholder="Note"
                className="form-input"
                {...register('content', {
                    required: 'A note is required',
                })}
            />
            {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}

            <input
                type="submit"
                value='Create Note'
                className="submit-form create-note-btn"
            />
        </div>
    </form>
  )
}
