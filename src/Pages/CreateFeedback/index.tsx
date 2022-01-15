import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import { useForm } from 'react-hook-form';
import User from 'src/data/user';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import Spinner from '../../components/Spinner';
import { supabase } from 'src/utils/supabase';
import toast from 'react-hot-toast';

type FormValues = {
    title: string;
    category: string;
    status: string;
    description: string
}

{/*const statuses = [
  { label: 'Suggestion', value: 'suggestion' },
  { label: 'Planned', value: 'planned' },
  { label: 'In-Progess', value: 'in-progess' },
  { label: 'Live', value: 'live' },
];*/}

const categories = [
    { label: 'Music', value: 'Music' },
    { label: 'Movies', value: 'Movies' },
    { label: 'Lifestyle', value: 'Lifestyle' },
    { label: 'Fashion', value: 'Fashion' },
    { label: 'Relationship', value: 'Relationship' },
]

export default function CreateFeedback({feedback} : { feedback?: App.Request}) {
  //console.log(feedback) 
    const history = useHistory();
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormValues>({ defaultValues: feedback}) ;
    const [category, setCategory] = useState(
      feedback ? categories.find(( { value }) => value === feedback.category) ?? 
      categories[0]: categories[0]);
    {/*const [status, setStatus] = useState(() => feedback ? 
      statuses.find(({ value }) => value === feedback.status) ??
      statuses[0] : statuses[0]
    );*/}
    const user = User();
    if(!user) return <Redirect to="/auth/login"/>

    async function createRequest({ title, description}: FormValues) {
 
      try {
          const { error } = await supabase.from('requests').insert(
            [
              {
                title,
                description,
                category: category.value,
                user_id: supabase.auth.user()?.id
              }
            ],
            { returning: 'minimal'}
          );
          if(error) throw new Error(error.message);
          toast.success('Feedback added')
          history.push('/');
        } catch (error: any) {
          console.log(error)
        }
    }

    async function deleteRequest() {
      try {
        const {error} = await supabase.from('requests').delete().match({id: feedback?.id})
        if (error) throw new Error(error.message);
        toast.success('Feedback deleted');
        history.push('/');
      } catch (error: any) {
          console.log(error)
      }
    }

    async function updateRequest({title, description}: FormValues) {
        try {
            const { error } = await supabase.from('requests').update({
              title, description, category: category.value
            }, {returning: 'minimal'});
            if (error) throw new Error(error.message);
            toast.success('Feedback updated');
            history.goBack();
        } catch (error : any) {
          toast.error(error.message)
        }
    }

    return (
        <main className={`page-container px-6 py-8 md:py-14`} style={{ maxWidth: "40rem", gridTemplateColumns: "1fr"}}>
           <button onClick={history.goBack} className='flex items-center space-x-4'>
            <svg width="1em" height="1em" viewBox="0 0 5 10" fill="none">
              <path d="M4 9L0 5l4-4" stroke="currentColor" strokeWidth={2} />
            </svg>
            <span className='font-bold text-small'>Go Back</span>
          </button>
          <form
            className='mt-14 md:mt-16 p-6 md:p-10 bg-white rounded relative w-full'
            onSubmit={handleSubmit(feedback ? updateRequest : createRequest)}
          >
              <div className={` h-10 w-10 md:w-14 md:h-14 rounded-full flex items-center justify-center absolute top-0 -translate-y-1/2 bg-primary`}
                aria-hidden
              >
                {feedback ? (
                  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" className='text-white md:text-2xl'>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.082 3.48L16.832 0l6.513 6.272-3.548 3.68-6.715-6.471zM0 23.596c.92-3.942 3.487-14.02 3.487-14.02l8.203-4.821 6.83 6.396-5.218 7.82L.313 24l6.157-5.79c1.043.39 2.516.038 3.312-.836a2.818 2.818 0 00-.177-3.983c-1.149-1.05-3.02-1.05-4.071.098-.783.855-1.053 2.365-.605 3.36L0 23.596z"
                      fill="currentColor"
                    />
                  </svg>
                  ) : ( 
                  <svg width="1em" height="1em" viewBox="0 0 12 12" fill="none" className='text-white mobile:text-small'>
                    <path
                      d="M7.673 11.714V7.547h4.062V4.474H7.673V.286H4.39v4.188H.286v3.073H4.39v4.167h3.283z"
                      fill="currentColor"
                    />
                  </svg>)}
              </div>

              <h1 className='text-lg font-bold mt-6'>
                   {feedback ? `Editing '${feedback.title}'`: "What's on your mind?"} 
              </h1>
              <div className='mt-10 space-y-8'>
                <TextInput
                    id="title"
                    label="Topic"
                    isInValid={!!errors.title}
                    validationMessage={errors.title?.message}
                    {...register('title', {
                        required: 'Title is required',
                        min: {value: 2, message: 'Enter at lease 2 characters'},
                        maxLength: {value: 100, message: 'Title too long'}
                    })}
                    required
                />
                <Select
                    value={category}
                    onChange={setCategory}
                    options={categories}
                    label="category"
                    id="feedback-category"
                />
                {/*feedback && (
                  <Select
                    value={status}
                    onChange={setStatus}
                    options={statuses}
                    label="Status"
                    hint="Choose a status for your feedback"
                    id="feedback-category"
                  />
                )*/}
                <TextArea
                  label="Details"
                  hint="Include any details on the topic"
                  id="description"
                  validationMessage={errors.description?.message}
                  isInvalid={!!errors.description}
                  rows={3}
                  {...register('description', {
                    required: 'Description is required',
                    min: {value: 2, message: 'Enter at lease 2 characters'},
                    maxLength: {value: 250, message: 'Description too long'}
                })}
                />
              </div>
              <div className='flex space-x-4 mobile:space-x-2 justify-between mt-8'>
                {feedback && feedback.user_id === user?.id && (
                  <button
                    onClick={deleteRequest}
                    type='button'
                    className='btn danger'
                    disabled={isSubmitting}
                  >
                    Delete
                  </button>
                )}
                <div className='flex space-x-4 mobile:space-x-2 ml-auto'>
                  <button className='text-secondary'
                    type='button'
                    onClick={history.goBack}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button className='text-primary'
                    type='submit'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Spinner className='text-2xl'/>
                    ) : feedback ? (
                      <>Save<span className='mobile:hidden'>Changes</span></>
                    ) : (
                      'Post'
                    )}
                  </button>
                </div>
              </div>
          </form>
        </main>
    )
}