import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SignUpForm from "../components/auth/SignUpFrom"
import api from '../../services/api'


const Signup : React.FC = function(){
    const Navigate = useNavigate()
    const [FormData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: ''
    })


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target

        setFormData(prevData=>({
            ...prevData,
            [name]: value
        })
        )
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        try{
                const response = await api.post('/auth/signup', FormData)
                if(response.status === 201){
                  Navigate('/authentication/signin')  
            }
        }catch(e){
            console.error('error:', e)
        }
    }

    return(
        <>
        <SignUpForm 
            handleSubmit={handleSubmit} 
            formData={FormData} 
            onInputChange={handleInputChange}/>
        </>
    )
}
export default Signup