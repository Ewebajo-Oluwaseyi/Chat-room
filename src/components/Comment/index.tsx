import React, { useRef, useState } from 'react';
import User from 'src/data/user';
import Request, { RequestReturnType } from 'src/data/request';
import TextArea from '../TextArea';
import format from 'date-fns/format';
import isThisYear from 'date-fns/isThisYear';
import Spinner from '../Spinner';
import Reply from '../Reply';
import { supabase } from '../../utils/supabase';
import { mutate } from 'swr';


export default function Comment({comment} : {comment: RequestReturnType['comments'][0]}) {
    const [showForm, setShowForm] = useState(false);
    const replyButtonRef = useRef<HTMLButtonElement>(null);
    const [reply, setReply] = useState('');
    const [isSubmit, setSubmit] = useState(false)
    const user = User();

    const closeReplyForm = () => {
      setShowForm(false);
      setTimeout(() => replyButtonRef.current?.focus(), 10)
    }

    const addComment = async (e: any) => {
        e.preventDefault();
        try {
            setSubmit(true);
            const { error } = await supabase.from("replies").insert([
                {
                    comment_id: comment.id,
                    user_id: user?.id,
                    content: reply
                }
            ]);
            if (error) throw new Error('Could not add to replies');
            setReply('');
            setShowForm(false);
            mutate(comment.request_id)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmit(false)
        }
    }

    return (
        <div className='py-6'>
            <div className='flex items-center'>
               <img
                src={`https://avatars.dicebear.com/api/avataaars/${comment.user_id}.svg`}
                height={36}
                width={36}
                className='rounded-full overflow-hidden'
                aria-hidden
                alt=''
               />
               <div className='ml-2'>
                    <div className='flex flex-col'>
                        <div className='flex space-x-2'>
                        <p className='text-small font-bold'>{comment.user.name}</p>
                        {comment.created_at && (
                            <p
                              className='text-small text-light'
                              title={format(new Date(comment.created_at), 'EEEE, d LLLL yyyy, HH:mm:ss')}
                            >
                                {format(new Date(comment.created_at), 'LLL dd')}
                                {!isThisYear(new Date(comment.created_at)) && 
                                ` '${new Date(comment.created_at).getFullYear().toString().slice(2)}`
                                }
                            </p>
                        )}
                        </div>
                        <p className='text-small text-light'>@{comment.user.username}</p>
                    </div>
               </div>
            </div>

            <p className='mt-4 text-light text-sm md:text-regular'>{comment.content}</p>

            {user && (
                <>
                  {showForm ? (
                      <form
                        className='mt-6 bg-white rounded '
                        onSubmit={e => addComment(e)}
                      >
                          <TextArea
                            id=""
                            autoFocus
                            className='mt-0'
                            value={reply}
                            onChange={(e: any) => setReply(e.currentTarget.value)}
                            disabled={isSubmit}
                          />
                          <span className='text-light text-sm'></span>
                          <div className='mt-2 flex space-x-2'>
                              <button 
                                className='text-primary hover:text-black'
                              >
                                  {isSubmit ? <Spinner className='text-2xl'/>: 'Reply'}
                              </button>
                              <button
                                className='text-danger'
                                type='button'
                                disabled={isSubmit}
                                onClick={closeReplyForm}
                              >
                                  Cancel
                              </button>
                          </div>
                      </form>
                  ) : (
                     <button
                       className='text-alternate rounded p-2 text-small bg-alternate-light text-sm font-medium mt-4'
                        onClick={() => setShowForm(true)}
                        ref={replyButtonRef}
                     >
                         Reply
                     </button> 
                  )}
                </>
            )}

              {comment.replies && (
                  <div className='space-y-6 mt-6'>
                      {comment.replies.map(reply => {
                        return <Reply reply={reply} key={reply.content}/>
                      })}
                  </div>
              )}
        </div>
    )
}