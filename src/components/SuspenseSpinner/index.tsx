import React from 'react';
import Spinner from '../Spinner';

export default function SuspenseSpinner() {
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <Spinner className='text-6xl text-primary'/>
        </div>
    )
}