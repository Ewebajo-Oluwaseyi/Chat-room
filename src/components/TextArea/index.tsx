import { isValid } from 'date-fns';
import React, { forwardRef } from 'react';

interface TextAreaInputProps 
    extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    id: string;
    label?: string;
    hint?: string;
    isInvalid?: boolean;
    validationMessage?: string | undefined;  
}

export  default forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
    function TextArea(props, ref) {
        const {id, label, hint, isInvalid, validationMessage, ...rest} = props;

        return (
            <div>
                <label htmlFor={id} className="font-bold text-sm">
                    {label}
                </label>
                {hint && (
                    <p className='mt-[.125rem]' id={`helper-text-for-${id}`}>
                        {hint}
                    </p>
                )}
                <textarea
                    {...rest}
                    id={id}
                    aria-invalid={isInvalid}
                    aria-describedby={`helper-text-for-${id}`}
                    ref={ref}
                />
                {isInvalid && validationMessage && (
                    <p className='text-danger text-sm' aria-live="assertive">
                        {validationMessage}
                    </p>
                )}
            </div>
        )
    }

)