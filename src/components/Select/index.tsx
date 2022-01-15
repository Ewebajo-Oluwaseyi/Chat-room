import * as React from 'react';
import { Listbox, Transition } from '@headlessui/react';

interface SelectProps {
    id: string;
    label: string;
    value: {
        label: string;
        value: string;
        disabled?: boolean;
    },
    options?: SelectProps['value'][];
    onChange(value: SelectProps['value']): void;
    hint?: string;
    isInvalid?: boolean;
    validationMessage?: string;

}
export default function Select(props: SelectProps) {
   const { id, options = [], value, onChange, isInvalid } = props;
    return (
        <div>
            <label htmlFor={props.id} className="font-bold text-sm">
                {props.label}
            </label>
            {props.hint && (
                <p className='mt-[.125rem]' id={`helper-text-for-${id}`}>
                    {props.hint}
                </p>
            )}
            <Listbox value={value} onChange={onChange}>
                <div className='relative flex items-center mt-4'>
                    <Listbox.Button
                        className="select mt-0 flex items-center justify-between"
                        id={id}
                        aria-invalid={isInvalid}
                        aria-describedby={`helper-text-for-${id}`}
                    >
                        {value.label}
                        <svg className='text-xs' width="1em" height="1em" viewBox="0 0 9 7" fill="none">
                            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth={2} />
                        </svg>
                    </Listbox.Button>
                    <Transition
                        appear
                        as={Listbox.Options}
                        className="absolute top-0 overflow-auto bg-white rounded shadow-dropdown max-h-60 focus:outline-none divide-y divide-secondary divide-opacity-10 w-full z-10"
                    >
                        {options.map((option) => (
                            <Listbox.Option
                                className={({active}) => `flex items-center justify-between whitespace-nowrap px-6 py-3 
                                    ${active ? 'text-primary' : 'text-default'}
                                `}
                                value={option}
                                key={option.value}
                                disabled={option.disabled}
                            >
                                {({ selected }) => (
                                    <>
                                        <span>{option.label}</span>
                                        {selected &&
                                          <svg width="1em" height="1em" viewBox="0 0 13 10" fill="none">
                                            <path d="M.968 4.859L4.5 8.39 12 .89" stroke="currentColor" />
                                          </svg>
                                        }
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
