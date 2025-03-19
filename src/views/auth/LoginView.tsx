import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import ErrorMessage from "../../components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { login } from "../../api/AuthAPI"
import { toast } from "react-toastify"
import { UserLoginForm } from "../../types"

export default function LoginView() {

    const navigate = useNavigate()

    const initialValues : UserLoginForm= {
        email: '',
        password: ''
    }

    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: login,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            navigate('/')
        }
    })

    const handleLogin = (formData : UserLoginForm) => mutate(formData)

  return (
    <>
        <form
            className="form"
            onSubmit={handleSubmit(handleLogin)}
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
            <div className="form-div">
                <input
                    type="password"
                    placeholder="Password"
                    className="form-input"
                    {...register('password', {
                        required: 'Your password is required',
                        minLength: {
                            value: 8,
                            message: "The password must be at least 8 characters long",
                        },
                    })}
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>
            <input
                type="submit"
                value='Log in'
                className="submit-form"
            />
        </form>

        <nav className="auth-links">
            <Link to={"/auth/sing-up"} className="auth-link" >
                Sing Up
            </Link>

            <Link to={"/auth/reset-password"} className="auth-link" >
                forgot your password?
            </Link>
        </nav>
    </>
  )
}
