import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/TextInput';
import Spinner from '../../components/Spinner';
import { supabase } from '../../utils/supabase';
import toast from 'react-hot-toast';

type FormValues = {
    name: string;
    email: string;
    password: string
}

export default function Register() {
    const history = useHistory();
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>() 
    
    const [isSubmit, setSubmit] = useState(false);
    
    async function signUp(values: FormValues) {
       // console.log(supabase)
        try {
            setSubmit(true)
            const {user, error: signUpError} = await supabase.auth.signUp({
                email: values.email,
                password: values.password
            });
            if (signUpError) throw new Error(signUpError.message);
            console.log(user?.id)
            const { error: createProfileError } = await supabase.from('profiles')
            .insert([{ id: user?.id, name: values.name, username: user?.email?.split('@')[0]}],
             {
                 returning: 'minimal'
             });
             
             if(createProfileError) {
                 await supabase.from('profiles').delete();
                 throw new Error(createProfileError.message);
             }

             toast.success('Account created successfully')
            setSubmit(false)
            history.replace('/');
        } catch (e: any) {
            
        }
    }

    return (
        <form className='mt-10' onSubmit={handleSubmit(signUp)}>
           <div className='space-y-4'>
                <TextInput
                    id="name"
                    label="Full Name"
                    placeholder="Enter full name"
                    isInValid={!!errors.name}
                    validationMessage={errors.name?.message}
                    {...register('name', {
                        required: 'Name is required',
                        min: {value: 2, message: 'Enter at lease 2 characters'},
                        maxLength: {value: 100, message: 'too long'}
                    })}
                    required
                />
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
           {isSubmit ? <Spinner className="text-2xl"/> : 'Register'}
            </button>
        </form>
    )
}