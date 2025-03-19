import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { ResetPasswordForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../api/AuthAPI";
import { toast } from "react-toastify";


export default function ResetPasswordView() {

  const initialValues : ResetPasswordForm = {
    email: ''
  }

  const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues})

  const {mutate} = useMutation({
    mutationFn: resetPassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })

  const handleForgotPassword = (formData : ResetPasswordForm) => mutate(formData)

  return (
    <>
      <form
            className="form"
            onSubmit={handleSubmit(handleForgotPassword)}
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
