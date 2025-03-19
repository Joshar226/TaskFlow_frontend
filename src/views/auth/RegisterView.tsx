import { useForm } from "react-hook-form"
import ErrorMessage from "../../components/ErrorMessage"
import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { createAccount } from "../../api/AuthAPI"
import { toast } from "react-toastify"
import { UserRegistrationForm } from "../../types"


export default function RegisterView() {

    const initialValues : UserRegistrationForm = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    }

    const {handleSubmit, register, reset, watch, formState: { errors }} = useForm<UserRegistrationForm>({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message);
        },
            onSuccess: (data) => {
            toast.success(data);
            reset();
        },
    })

    const password = watch("password")
    const handleRegister = (formData: UserRegistrationForm) => mutate(formData);

  return (
    <>
        <form
            className="form"
            onSubmit={handleSubmit(handleRegister)}
            noValidate
        >
            <div className="form-div">
                <input
                    type="text"
                    placeholder="Name"
                    className="form-input"
                    {...register('name', {
                        required: 'Your name is required',
                    })}
                />
                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </div>
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
                        required: 'A password is required',
                        minLength: {
                            value: 8,
                            message: "The password must be at least 8 characters long",
                            },
                    })}
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>
            <div className="form-div">
                <input
                    type="password"
                    placeholder="Confirm your password"
                    className="form-input"
                    {...register('password_confirmation', {
                        required: 'Confirm your password is required',
                        validate: (value) => value === password || "Passwords are not the same"
                    })}
                />
                {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
            </div>
            <input
                type="submit"
                value='Sing Up'
                className="submit-form"
            />
        </form>

        <nav className="auth-links">
            <Link to={"/auth/login"} className="auth-link" >
                Log in
            </Link>

            <Link to={"/auth/reset-password"} className="auth-link" >
                forgot your password?
            </Link>
        </nav>
    </>
  )
}
