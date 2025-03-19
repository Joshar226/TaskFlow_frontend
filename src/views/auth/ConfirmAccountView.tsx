import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { ConfirmToken } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
    const navigate = useNavigate()

    const [token, setToken] = useState<ConfirmToken['token']>('')

    const {mutate} = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)

            setTimeout(() => {
                navigate('/auth/login')
            }, 3000);
        }
    })

    const handleComplete = (token : ConfirmToken['token']) => mutate({token})

  return (
    <>
        <p className="text-confirmation">Enter the code you received <span className="text-confirmation-span">by email</span></p>
        
        <div className="token-div">
            <PinInput value={token} onChange={(token) => setToken(token)} onComplete={handleComplete}>
                <PinInputField className="token-field"/>
                <PinInputField className="token-field"/>
                <PinInputField className="token-field"/>
                <PinInputField className="token-field"/>
                <PinInputField className="token-field"/>
                <PinInputField className="token-field"/>
            </PinInput>
        </div>

        <nav className="auth-links">
            <Link to={"/auth/request-code"} className="auth-link" >
                Request new code
            </Link>
        </nav>
    </>
  )
}
