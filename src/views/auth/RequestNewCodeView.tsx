import { useForm } from "react-hook-form"
import ErrorMessage from "../../components/ErrorMessage"
import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { requestConfirmationCode } from "../../api/AuthAPI"
import { RequestConfirmationCodeForm } from "../../types"
import { toast } from "react-toastify"


export default function RequestNewCodeView() {

    const initialValues = {
        email: ''
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues : initialValues})

    const {mutate} = useMutation({
        mutationFn: requestConfirmationCode,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
        }
    })

    const handleRequestCode = (formData : RequestConfirmationCodeForm) => mutate(formData)

  return (
    <>
        <form
            className="form"
            onSubmit={handleSubmit(handleRequestCode)}
            noValidate
        >
            <div className="form-div">
                <input
                    type="email"
                    placeholder="Email"
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
                value='Send Code'
                className="submit-form"
            />
        </form>

        <nav className="auth-links">
            <Link to={"/auth/login"} className="auth-link" >
                Login
            </Link>

            <Link to={"/auth/sing-up"} className="auth-link" >
                Sing Up
            </Link>
        </nav>
    </>
  )
}
