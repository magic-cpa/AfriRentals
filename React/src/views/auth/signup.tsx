import React, { useState } from "react"
import SignUpForm from "../components/auth/SignUpFrom"
import api from "../../services/api"


const Signup : React.FC = function(){
    const [FormData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        console.log(FormData)
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