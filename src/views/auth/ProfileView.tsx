import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "../../api/AuthAPI"
import { UpdateProfile, User } from "../../types"
import { toast } from "react-toastify"
import ErrorMessage from "../../components/ErrorMessage"
import { useLocation, useNavigate } from "react-router-dom"

type ProfileViewProps = {
    user: User
}

export default function ProfileView({user} : ProfileViewProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const queryClient = useQueryClient()

    const initialValues = {
        name: user.name,
        email: user.email
    }

    const {handleSubmit, reset, register, formState: {errors} } = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: updateProfile,
        onError: error => error.message,
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true})
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    })

    const handleUpdateProfile = (formData : UpdateProfile) => mutate(formData)

    return (
    <>
        <h1 className="project-form-title">Update Profile</h1>
        <form 
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="project-form"
        >
            <div className="form-div">
                <input
                    type="text"
                    placeholder="Your name"
                    className="form-input"
                    {...register('name', {
                        required: 'Your name is required'
                    })}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>

            <div className="form-div">
            <input
                type="email"
                placeholder="Your email"
                className="form-input"
                {...register('email', {
                    required: 'Your email is required',
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email",
                    }
                })}
            />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>

            <input
                type="submit"
                value='Update Profile'
                className="submit-form"
            />
        </form>
    </>  
    )
}
