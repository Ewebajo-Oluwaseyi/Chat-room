import React, { useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import Spinner from '../../components/Spinner';
import Request from '../../data/request';
import User from '../../data/user';
import RequestCard from '../../components/RequestCard/index';
import TextArea from '../../components/TextArea';
import Comment from '../../components/Comment';
import { supabase } from '../../utils/supabase';
import { mutate } from 'swr';

export default function ViewComment() {
    const history= useHistory();
    const params = useParams<{id: string}>();
    const user = User();

    const [comment, setComment] = useState('');
    const [isSubmit, setSubmitting] = useState(false);
    const { data, loading, error } = Request(params.id);
   // console.log(data);

    async function addComment(e: any){
        e.preventDefault();
        try {
            setSubmitting(true);
            const { error } = await supabase.from('comments').insert([{
                request_id: data?.id,
                user_id: supabase.auth.user()?.id,
                content: comment
            }])
            if(error) throw new Error('Cant add comment');
            setComment('')
            mutate(`${data?.id}`)
        } catch (error: any) {
            console.log(error)
        } finally {setSubmitting(false)}
    }

    return(
        <div className='page-container px-6 py-8 md:py-14' style={{display: "block", maxWidth: "40rem", gridTemplateColumns: "1fr", gridTemplateRows: "1fr"}}>
            <div className='flex items-center justify-between'>
                <button onClick={history.goBack} className='flex items-center space-x-4'>
                    <svg width="1em" height="1em" viewBox="0 0 5 10" fill="none" className='text-alternate'>
                        <path d="M4 9L0 5l4-4" stroke="currentColor" strokeWidth={2} />
                    </svg>
                    <span className='font-bold text-small'>Go Back</span>
                </button>
                {data?.user_id  === user?.id && (
                    <button
                      className='alternate'
                      disabled={!data}
                      onClick={() => history.push({ pathname: `/${data?.id}/edit`, state: data})}
                    >
                        Edit Post
                    </button>
                )}               
            </div>
            {error ? (
                <div className='flex flex-col items-center justify-between bg-white rounded flex-grow p-8 mt-16'>
                   <p className="font-bold text-lg mt-9 text-center">Post not found</p>
                    <p className="text-small text-center max-w-[44ch] mt-3">
                        Oops! We couldn't find the Posts you're looking for.
                    </p>     
                </div>
            ): loading ? (
                <Spinner className='text-6xl mx-auto mt-16'/>
            ): (
                data && (
                    <>
                        <div className='mt-6 md:px-2 md:py-1 bg-white rounded'>
                            <RequestCard request={data}/>
                        </div>

                        <form className='mt-6 p-6 md:px-8 md:py-7 bg-white rounded'
                            onSubmit={(e) => addComment(e)}
                        >
                            <h3 className='text-lg font-bold'>Add Comment</h3>
                            <TextArea
                                value={comment}
                                onChange={(e: any) => setComment(e.target.value)}
                                id="new-comment"
                                className='mt-6'
                                disabled={isSubmit || !user}
                            />
                            <div className='flex items-center justify-between mt-4'>
                                {user ? (
                                    <>
                                        <span className='text-light'>{250 - comment.length}</span>
                                        <button
                                            className='text-primary'
                                            type="submit"
                                            disabled={isSubmit || comment.length === 0}
                                        >
                                            {isSubmit ? <Spinner className='text-2xl'/> : 'Post Comment'}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p>Login to comment</p>
                                        <Link to="/auth/login"  className='btn primary'>Login</Link>
                                    </>
                                )}
                            </div>
                        </form>
                        <div className='mt-6 p-6 md:px-8 md:py-7 bg-white rounded'>
                            <h3 className='text-lg font-bold' id="comments">
                                    {data?.comments.length} Comment(s)
                            </h3>

                            <div className='mt-1 divide-y divide-light divide-opacity-25'>
                                {data?.comments?.map((comment) => {
                                   return  <Comment key={comment.id} comment={comment}/>
                                })}
                            </div>
                        </div>
                    </>
                )
            )}
        </div>
    )
}