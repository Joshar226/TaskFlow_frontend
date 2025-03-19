import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { ConfirmToken } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { validateToken } from "../../api/AuthAPI";
import { toast } from "react-toastify";

type NewPasswordTokenProps = {
    token: ConfirmToken['token']
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({token, setToken, setIsValidToken} : NewPasswordTokenProps) {

    const {mutate} = useMutation({
        mutationFn: validateToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setIsValidToken(true)
        }
    })

    const handleComplete = (token : ConfirmToken['token']) => mutate({token})

  return (
    <>
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
    </>
  )
}
