import React, { forwardRef, useState } from 'react';
import User from 'src/data/user';
import {  RequestReturnType } from '../../data/suggestions';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import CommentCount from '../CommentCount/index';
import { likeRequest } from '../../data/suggestions';
import toast from 'react-hot-toast';
import { mutate } from 'swr';


export default forwardRef<HTMLDivElement, { request: RequestReturnType}>(
   
    function RequestCard({request}, ref) {
        const user = User();

        async function likedRequest() {
            try {
                if (!user) throw new Error('You need to be logged in to like')
                await likeRequest(request.id);
                toast.success("");
                mutate('requests');
            } catch (error: any) {
                console.log(error);            
            }
        }
        return (
            <div
                key={request.id}
                ref={ref}
                className='rounded p-4 md:p-6 bg-white grid grid-cols-2 gap-5 md:gap-10'
                style={{ gridTemplateColumns: 'auto 1fr auto'}}
            >
                <Link to={`/${request.id}`}>
                    <div className='flex items-center'>
                        <img src={`https://avatars.dicebear.com/api/avataaars/${request.user_id}.svg`}
                            height={36} width={36} className='rounded-full overflow-hidden' aria-hidden
                        />
                        <div className='ml-2'>
                            <p className='text-small font-bold'>{request.user.name}</p>
                            {request.created_at && (
                                <p className='text-small text-light'>
                                    {format(new Date(request.created_at), 'dd LLL yyyy')}
                                </p>
                            )}
                        </div>
                    </div>
                    <p className='font-bold mt-2 md:ml-6'>{request.title}</p>
                    <p className='mt-1 text-light text-sm md:ml-6'>{request.description}</p>
                    <p className='categorylabel mt-3 md:ml-6'>{request.category}</p>
                                
                </Link>
                <div className='flex flex-col justify-around items-center ml-auto'>
                    <div onClick={() => likedRequest()}>
                        {request.liked_count?.[0].count > 0 ? 
                            <i className='fas fa-heart text-danger cursor-pointer md:text-2xl'></i> :
                            <i className='fas fa-heart text-[#CDD2EE] cursor-pointer md:text-2xl'></i>
                        }
                        <span className='ml-2 font-bold text-sm'>{request.liked_count?.[0].count}</span>
                    </div>
                    <Link to={`/${request.id}#comments`} className='ml-2'>
                        <CommentCount count={request.comments_count?.[0].count ?? 0}/>
                    </Link>
                </div>
            </div>
        )
    }

)
  