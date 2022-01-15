import { Listbox, Transition } from '@headlessui/react';
import * as React from 'react';
import { ValidationMode } from 'react-hook-form';
// ;
interface Props {
    selectSortOption: string;
    setSelectSortOption(value: string): void;
    sortOption: string[];
}

const SortOptions = (prop: Props) => {
    return (
        <Listbox
            value={prop.selectSortOption} onChange={prop.setSelectSortOption}
        >
            <Listbox.Label className="text-sm mr-2">Sort by:</Listbox.Label>
            <div className='relative flex items-center'>
                <Listbox.Button className="flex items-center">
                    <span className='font-bold text-sm mr-1'>{prop.selectSortOption}</span>
                    <svg width="0.7em" height="0.7em" viewBox="0 0 9 7" fill="none" className='mt-1'>
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth={2} />
                    </svg>
                </Listbox.Button>
                <Transition
                    appear
                    as={Listbox.Options}
                    className={`absolute top-10 overflow-auto bg-white rounded shadowww-dropdown max-h-60 focus:outline-none divide-y divide-secondary divide-opacity-10 w=[15.9375rem]`}
                    leave={`transition ease-in duration-75`}
                    leaveFrom={`transform opacity-100 scale-100`}
                    leaveTo={`transform opacity-0 scale-95`}
                >
                    {prop.sortOption.map((option) => (
                        <Listbox.Option
                            key={option}
                            value={option}
                            className={({ active }) => `flex items-center justify-between whitespace-nowrap px-6 py-3 cursor-pointer 
                                ${active ? 'text-primary': 'text-default'}
                            `}
                        >
                            {({ selected }) =>( 
                                <>
                                <span>{option}</span>
                                {selected && (
                                     <svg
                                     width="13"
                                     height="10"
                                     viewBox="0 0 13 10"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="ml-4"
                                   >
                                     <path
                                       d="M0.968262 4.85894L4.49995 8.39062L11.9999 0.890625"
                                       stroke="currentColor"
                                       strokeWidth="2"
                                     />
                                   </svg>
                                )}
                                </>
                            )}
                        </Listbox.Option>
                    ))}
                </Transition>
            </div>
        </Listbox>
    )
}

export default SortOptions