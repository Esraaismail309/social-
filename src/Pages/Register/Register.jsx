
// import styles from './Register.module.css'

import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import * as zod from 'zod'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {


    const [errorMsg, setErrorMsg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()



    const schema = zod.object({
        name: zod.string().nonempty('Name is Req').min(3, ' Name 3 '),
        email: zod.string().email('Email is invalid'),
        password: zod.string().regex(/^[a-zA-Z0-9@$!%*?&]{8,15}$/, 'Password must be 8-15 characters long and contain at least one letter, one number, and one special character'),
        rePassword: zod.string(),
        dateOfBirth: zod.coerce.date().refine(function (value) {
            if (new Date().getFullYear() - value.getFullYear() >= 18) {
                return true
            }
        }, 'You must be at least 18 years old'),
        // .transform(function (value) {
        //     return `${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()}`

        // }),

        // dateOfBirth:zod.string(),
        // gender: zod.string().regex(/^(male|female)$/)
        gender: zod.enum(['male', 'female'], 'lkjedlkewj')
    }).refine(function (value) {
        if (value.password === value.rePassword) {
            return true
        } else {
            return false
        }
    }, {
        message: 'repassword not match',
        path: ['rePassword']
    })





    const { handleSubmit, register, formState, getValues, watch } = useForm({
        defaultValues: {
            "name": "Ahmed Bahnasy",
            "email": "bahnasy2040@gmail.com",
            "password": "Bahnasy@123",
            "rePassword": "Bahnasy@123",
            "dateOfBirth": "1994-08-15",
            "gender": ""
        },
        mode: 'onBlur',
        resolver: zodResolver(schema),
    })
    const { errors } = formState


    function handleRegister(values) {
        setErrorMsg(null)
        setIsLoading(true)

        // axios('https://linked-posts.routemisr.com/users/signup',{
        //     method:'POST',
        //     data:values
        // })
        axios.post('https://linked-posts.routemisr.com/users/signup', values).then((response) => {
            if (response.data.message === 'success') {
                setIsLoading(false)
                navigate('/login')
            }
        }).catch((err) => {
            setErrorMsg(err.response.data.error);
            setIsLoading(false)

        })
    }



    return (
        <main className="w-2/4 mx-auto p-4 shadow bg-blue-50/20">


            <h1 >Register Now </h1>
            {errorMsg && <div className="bg-red-300 p-3 my-3 rounded-2xl">{errorMsg}</div>}
            <form onSubmit={handleSubmit(handleRegister)} >
                <Input isInvalid={Boolean(errors.name)} errorMessage={errors.name?.message} className="my-3" label="Name" type="text" id="name" name="name" variant={"bordered"}

                    {...register('name')} />
                <Input isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message} className="my-3" label="Email" type="text" id="email" name="email" variant={"bordered"}
                    {...register('email')} />
                <Input isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message} className="my-3" label="Password" type="password" id="password" name="password" variant={"bordered"}

                    {...register('password', {

                    })} />

                <Input className="my-3" label="Confirm Password" type="password" id="rePassword" name="rePassword" variant={"bordered"}
                    isInvalid={Boolean(errors.rePassword)}
                    errorMessage={errors.rePassword?.message}
                    {...register('rePassword',
                        //      {
                        //     required: ' confirm Password is Req',
                        //     validate: function (selectField) {
                        //         if (selectField !== getValues('password')) {
                        //             return 'RePassword not match pass'
                        //         }

                        //     }
                        // }
                    )} />
                <Input isInvalid={Boolean(errors.dateOfBirth)}
                    errorMessage={errors.dateOfBirth?.message} className="my-3" label="Date Of Birth" type="date" id="dateOfBirth" name="dateOfBirth" variant={"bordered"} {...register('dateOfBirth')} />

                <Select label="Gender" className="my-3" variant={'bordered'} name="gender" {...register('gender')} >

                    <SelectItem key={'male'}>{'Male'}</SelectItem>
                    <SelectItem key={'female'}>Female</SelectItem>


                </Select>
                <Button color="primary" variant="bordered" type="submit" isDisabled={isLoading} isLoading={isLoading}>{isLoading ? 'Loadinggg' : 'Register'}</Button>

            </form>
        </main>
    )
}