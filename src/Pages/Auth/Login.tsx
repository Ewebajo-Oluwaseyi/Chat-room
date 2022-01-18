import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/TextInput';
import Spinner from '../../components/Spinner';
import { supabase } from '../../utils/supabase';

type FormValues = {
    name: string;
    email: string;
    password: string
}

export default function Login() {
    const history = useHistory();
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>() 
    
    const [isSubmit, setSubmit] = useState(false);
    
    async function login(values: FormValues) {
        try {
            setSubmit(true);
            const { error } = await supabase.auth.signIn({
                email: values.email,
                password: values.password
            });
            if(error) throw new Error(error.message);
            history.replace('/')
        } catch (e: any) {
            setSubmit(false);
        }
    }

    return (
        <form className='mt-10' onSubmit={handleSubmit(login)}>
           <div className='space-y-4'>
                <TextInput
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    isInValid={!!errors.email}
                    validationMessage={errors.email?.message}
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {value: /^\S+@\S+$/i, message: 'Invalid email'}
                    })}
                    required
                />
                 <TextInput
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    isInValid={!!errors.password}
                    validationMessage={errors.password?.message}
                    {...register('password', {
                        required: 'Password is required',
                    })}
                    required
                />
           </div>
           <button className='btn bg-blue-600 w-full h-12 mt-8' type="submit" disabled={isSubmit}>
               {isSubmit ? <Spinner className="text-2xl"/> : 'Login'}
            </button>
        </form>
    )
}