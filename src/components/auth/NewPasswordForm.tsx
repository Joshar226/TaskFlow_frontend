import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { ConfirmToken, NewPasswordFormType } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type NewPasswordFormProps = {
  token: ConfirmToken['token']
}

export default function NewPasswordForm({token} :  NewPasswordFormProps) {

  const navigate = useNavigate()

  const initialValues : NewPasswordFormType = {
    password: '',
    password_confirmation: ''
  }

  const {register, handleSubmit, reset, watch, formState: {errors}} = useForm({defaultValues : initialValues})

  const {mutate} = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
      navigate('/auth/login')
    }
  })

  const handleNewPassword = (formData : NewPasswordFormType) => {
    const data = {
      formData,
      token
    }
    mutate(data)
  }

  const password = watch("password");
  return (
    <>
      <form
            className="form"
            onSubmit={handleSubmit(handleNewPassword)}
            noValidate
        >
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
              value='Reset Password'
              className="submit-form"
          />
      </form>
    </>
  )
}
