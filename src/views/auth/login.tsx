import { useState } from "react"
import SignInForm from "../components/auth/LoginForm"
import api from "../../services/api"
import axios from "axios"

const Login : React.FC = function(){
    const [FormData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setFormData(prevData=>({
            ...prevData,
            [name]:value
        })
        )
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
            const response = await axios.post('/api/login', FormData)
            console.log(response.data)
        }catch(e){
            console.error('error:', e)
        }
        
        // console.log(FormData)
    }

    return(
        <>
        <SignInForm handleSubmit={handleSubmit} formData={FormData} onInputChange={handleInputChange}/>
        </>
    )
}
export default Login