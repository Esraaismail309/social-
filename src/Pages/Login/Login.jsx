
// import styles from './Register.module.css'

import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import * as zod from 'zod'
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function Login() {


    const [errorMsg, setErrorMsg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()


    const { setUserToken } = useContext(AuthContext)



    const schema = zod.object({
        email: zod.string().email('Email is invalid'),
        password: zod.string().regex(/^[a-zA-Z0-9@$!%*?&]{8,15}$/, 'Password must be 8-15 characters long and contain at least one letter, one number, and one special character'),
    })




    const { handleSubmit, register, formState, getValues, watch } = useForm({
        defaultValues: {
            "email": "bahnasy2040@gmail.com",
            "password": "Bahnasy@123",

        },
        mode: 'onBlur',
        resolver: zodResolver(schema),
    })
    const { errors } = formState


    function handleLogin(values) {
        setErrorMsg(null)
        setIsLoading(true)

        // axios('https://linked-posts.routemisr.com/users/signup',{
        //     method:'POST',
        //     data:values
        // })
        axios.post('https://linked-posts.routemisr.com/users/signin', values).then((response) => {
            if (response.data.message === 'success') {
                setIsLoading(false)
                setUserToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                navigate('/')
            }
        }).catch((err) => {
            setErrorMsg(err.response.data.error);
            setIsLoading(false)

        })
    }



    return (
        <main className="w-2/4 mx-auto p-4 shadow bg-blue-50/20">


            <h1 >Login Now </h1>
            {errorMsg && <div className="bg-red-300 p-3 my-3 rounded-2xl">{errorMsg}</div>}
            <form onSubmit={handleSubmit(handleLogin)} >

                <Input isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message} className="my-3" label="Email" type="text" id="email" name="email" variant={"bordered"}
                    {...register('email')} />
                <Input isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message} className="my-3" label="Password" type="password" id="password" name="password" variant={"bordered"}

                    {...register('password', {

                    })} />


                <Button color="primary" variant="bordered" type="submit" isLoading={isLoading}>{'Login'}</Button>

            </form>
        </main>
    )
}