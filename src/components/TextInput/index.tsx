import * as React from 'react';

interface TextInputProps extends React.HTMLProps<HTMLInputElement> {
    id: string,
    label: string,
    isInValid?: boolean;
    validationMessage?: string;
    hint?: string
}

export default React.forwardRef<HTMLInputElement, TextInputProps> (
    function TextInput(props, ref) {
        const { id, label, hint, isInValid, validationMessage, ...rest} = props;

        return (
            <div>
                <label htmlFor={props.id} className='font-bold text-sm'>
                    {props.label}
                </label>
                {props.hint && (
                    <p className="mt-[.125rem]" id={`helper-text-for-${id}`}>
                        {props.hint}
                    </p>
                )}
                <input
                    id={id}
                    type="text"
                    {...rest}
                    ref={ref}
                    aria-invalid={props.isInValid}
                    aria-describedby={`helper-text-for-${id}`}
                />
                {props.validationMessage && (
                    <p className={`text-sm mt-2 ${props.isInValid ? 'text-danger': 'text-light'}`}>
                        {props.validationMessage}</p>
                )}
            </div>
        )
    }
)