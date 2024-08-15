import { useState } from "react"
import SignInForm from "../components/auth/LoginForm"

const Login : React.FC = function(){
    const [FormData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleInputChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setFormData(prevData=>({
            ...prevData,
            [name]:value
        })
        )
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(FormData)
    }
    return(
        <>
        <SignInForm handleSubmit={handleSubmit} formData={FormData} onInputChange={handleInputChange}/>
        </>
    )
}
export default Login