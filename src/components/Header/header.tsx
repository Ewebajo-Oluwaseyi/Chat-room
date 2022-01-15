import { Menu, RadioGroup, Transition } from '@headlessui/react';
import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import Profile from 'src/data/profile';
import User from 'src/data/user';
import { supabase } from 'src/utils/supabase';

interface Props {
    toggleMenu(): void;
    isMenuVisible: boolean;
    selectFilterOption: string;
    setSelectFilterOption(value: string): void
}

const header = (prop: Props) => {

   const options = ['All', 'Music', 'Movies', 'Lifestyle', 'Fashion', 'Relationship']
   const history = useHistory();
   const user = User();
   const { data: profile } = Profile();

   const logout = () => {
       supabase.auth.signOut().then(() => history.push('/auth/login'));
       
   }
    
    return (
      <div className='header'>
        <div className='nav bg-primary'>
            <div className='text-white text-left flex flex-grow md:flex-row lg:flex-col-reverse justify-between mr-4'>
                <div>
                    <h1 className='block lg:hidden font-bold text-bold mt-2 md:mt-5 lg:mt-0 text-2xl md:text-xl'>Chat Room</h1>
                   { /*<p className='opacity-75 text-small md:text-regular block font-medium'>Feedback App</p>*/}
                </div>
                {user ? (
                    <div className='flex flex-row-reverse lg:flex-col items-center space-x-2'>
                       {/* <div className='block md:hidden'>
                         <img src={`https://avatars.dicebear.com/api/avataaars/${profile?.id}.svg`}
                                    alt={profile?.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                </div>*/}
                        <Menu as="div" className="relative text-left hidden md:inline-block ">
                            <Menu.Button>
                                <img src={`https://avatars.dicebear.com/api/avataaars/${profile?.id}.svg`}
                                    alt={profile?.name}
                                    width={50}
                                    height={50}
                                    className="rounded-full w-16 lg:w-28"
                                />
                            </Menu.Button>
                            <Transition
                                as={React.Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute z-50 top-12 mobile:right-0 md:left-0 overflow-auto bg-white shadow-dropdown max-h-60 focus:outline-none divide-y divide-secondary divide-opacity-10 w-40">
                                    <Menu.Item>
                                        <button 
                                            className='w-full flex items-center space-x-2 px-3 py-3 text-danger hover:text-primary text-sm'
                                            onClick={logout}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                 height="1em"
                                                width="1em"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="text-xl"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                            </svg>
                                            <span>Sign Out</span>
                                        </button>
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <div className='hidden md:block text-center'>
                            <p className='truncate text-xl'>{profile?.name}</p>
                            <p className='text-small leading-none font-semibold text-sm'>@{profile?.username}</p>
                        </div>
                    </div>
                ): (
                <Link to ="/auth/login" className='hidden item-center md:flex space-x-2'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                    </svg>
                    <span>Login</span>
                </Link>
                )}
            </div>
            <button className='md:hidden' onClick={() =>prop.toggleMenu()}>
                <span className="sr-only">{prop.isMenuVisible ? "close Menu" : "Open Menu"}</span>
                <svg
                    width="20"
                    height="17"
                    viewBox="0 0 20 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="20" height="3" fill="white" />
                    <rect y="7" width="20" height="3" fill="white" />
                    <rect y="14" width="20" height="3" fill="white" />
                </svg>
            </button>
        </div> 
        <div className={`menubackdrop ${prop.isMenuVisible ? "show" : ""}`}
            role="button"
            onClick={() => prop.toggleMenu}
            aria-hidden
        />
            <div className={`menu ${prop.isMenuVisible ? "show" : ""} bg-background`}>
              {user && <div className='flex md:hidden'>
                <img src={`https://avatars.dicebear.com/api/avataaars/${profile?.id}.svg`}
                    alt={profile?.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                />  
                <div className='p-2 block md:hidden'>
                    <p className='truncate text-xl mb-2'>{profile?.name}</p>
                    <p className='text-small leading-none font-semibold'>@{profile?.username}</p>
                </div>
              </div>}
                <div className='rounded p-6 bg-white'>
                    <RadioGroup value={prop.selectFilterOption} onChange={prop.setSelectFilterOption}>
                        <RadioGroup.Label className="sr-only">Filter feedback</RadioGroup.Label>
                        <div className='flex flex-wrap -ml-2 -mb-2'>
                        {options.map((option) => (
                            <RadioGroup.Option
                                key={option}
                                value={option}
                                className={({checked}) => `px-4 py-2 rounded font-semibold text-small cursor-pointer ml-2 mb-2
                                    ${checked ? 'bg-alternate' : 'bg-alternate-light'}`
                                } 
                            >
                                {({checked}) => (
                                    <RadioGroup.Label
                                        as='p'
                                        className={`font-medium ${checked ? 'text-white': 'text-alternate'}`}
                                    >
                                        {option}
                                    </RadioGroup.Label>
                                )}
                            </RadioGroup.Option>
                        ))}
                        </div>
                    </RadioGroup>
                </div>
               {/* <div className='rounded p-6 bg-white'>
                   <div className='flex items-center justify-between'>
                    <p className='text-lg font-bold'>Roadmap</p>
                    <Link to="!#"
                    className='text-alternate font-semibold text-small'
                    onClick={prop.toggleMenu}
                    >
                    View <span className='sr-only'>Roadmaps</span>
                    </Link>
                   </div>   
                   <div className='mt-6'>
                       <div className='flex items-center mt-2'>
                        <div className='w-2 h-2 rounded-full bg-status-planned' role="presentation"></div>
                        <span className='ml-4'>Planned</span>
                        <span className='ml-auto font-bold'></span>
                       </div>
                       <div className='flex items-center mt-2'>
                        <div className='w-2 h-2 rounded-full bg-status-in-progress' role="presentation"></div>
                        <span className='ml-4'>In Progess</span>
                        <span className='ml-auto font-bold'></span>
                       </div>
                       <div className='flex items-center mt-2'>
                        <div className='w-2 h-2 rounded-full bg-status-live' role="presentation"></div>
                        <span className='ml-4'>Live</span>
                        <span className='ml-auto font-bold'></span>
                       </div>
                    </div>                  
                </div>
                */}
                {!user ? (
                    <div className='md:hidden flex space-x-4'>
                        <Link to="/auth/login" className='btn primary w-full' onClick={prop.toggleMenu}>
                            Login
                        </Link>
                        <Link to="/auth/register" className='btn secondary w-full' onClick={prop.toggleMenu}>
                            Register
                        </Link>
                    </div>
                ): (
                    <button className='md:hidden btn bg-danger w-full' onClick={logout}>
                        Logout
                    </button>
                ) }
            </div>
      </div>
    )
}

export default header


{ /*<div className="header_bar">
           <div className="header_bar__suggestions">
            <svg width="23" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 2.274c2.237 0 4.339.854 5.923 2.408a8.123 8.123 0 012.465 5.839 8.084 8.084 0 01-1.7 4.979 8.457 8.457 0 01-3.652 2.71l-.31.112.003.826h.369c.262 0 .475.21.475.469a.47.47 0 01-.39.46l-.085.008h-.365l.004 1.02h.36c.263 0 .476.21.476.469a.47.47 0 01-.39.461l-.085.008h-.358l.006 1.487a.466.466 0 01-.381.46l-.094.01H9.23a.478.478 0 01-.466-.378l-.01-.092.006-1.487h-.357a.472.472 0 01-.475-.47.47.47 0 01.39-.46l.085-.008h.361l.004-1.02h-.365a.472.472 0 01-.475-.468.47.47 0 01.39-.462l.085-.007h.368l.004-.826a8.452 8.452 0 01-3.996-2.867 8.08 8.08 0 01-1.666-5.056c.032-2.127.923-4.152 2.511-5.7 1.508-1.471 3.448-2.322 5.493-2.416l.324-.009h.06zm1.791 19.769H9.709l-.004 1.02h3.59l-.004-1.02zm-.007-1.958H9.716l-.003 1.02h3.574l-.003-1.02zM11.5 3.212h-.054c-3.946.027-7.327 3.325-7.384 7.2-.048 3.266 2.14 6.192 5.322 7.118.174.05.3.193.332.364l.008.088-.004 1.166h3.56l-.004-1.166a.47.47 0 01.34-.452c3.134-.912 5.323-3.794 5.323-7.01a7.197 7.197 0 00-2.185-5.173A7.453 7.453 0 0011.5 3.212zm.829 1.782a.4.4 0 01.401.397v.322c.48.12.932.307 1.346.552l.228-.226a.405.405 0 01.569 0L16.046 7.2a.393.393 0 010 .56l-.23.228c.247.41.437.858.557 1.333h.323a.4.4 0 01.402.397v1.645a.4.4 0 01-.402.396h-.323c-.12.476-.31.924-.557 1.333l.23.228a.393.393 0 010 .56l-1.173 1.163a.405.405 0 01-.57 0l-.227-.227a5.02 5.02 0 01-1.346.553v.322a.4.4 0 01-.401.396H10.67a.4.4 0 01-.402-.396v-.322a5.022 5.022 0 01-1.345-.553l-.228.227a.405.405 0 01-.569 0L6.954 13.88a.393.393 0 010-.56l.23-.228a4.924 4.924 0 01-.557-1.333h-.324a.4.4 0 01-.401-.396V9.719a.4.4 0 01.401-.397h.324c.12-.475.31-.923.557-1.333l-.23-.228a.393.393 0 010-.56L8.127 6.04a.405.405 0 01.569 0l.228.226a5.021 5.021 0 011.345-.552V5.39a.4.4 0 01.402-.397zM11.5 7.721c-1.572 0-2.846 1.263-2.846 2.82 0 1.558 1.274 2.82 2.846 2.82s2.846-1.262 2.846-2.82c0-1.557-1.274-2.82-2.846-2.82zm11.025 4.152c.262 0 .475.21.475.469a.47.47 0 01-.39.461l-.085.008h-.498a.472.472 0 01-.475-.469.47.47 0 01.39-.461l.085-.008h.498zm-21.552 0c.262 0 .475.21.475.469a.47.47 0 01-.39.461l-.085.008H.475A.472.472 0 010 12.342a.47.47 0 01.39-.461l.085-.008h.498zM3.112 3.45l.074.06.46.451c.185.183.186.48 0 .663a.476.476 0 01-.596.062l-.075-.06-.459-.451a.465.465 0 01-.001-.663.48.48 0 01.597-.062zm17.373.062c.162.16.182.408.06.59l-.061.073-.46.45a.476.476 0 01-.67 0 .464.464 0 01-.06-.59l.06-.074.46-.45a.48.48 0 01.671 0zM11.5 0c.233 0 .427.166.467.384l.008.085v.49a.472.472 0 01-.475.468.473.473 0 01-.467-.384l-.008-.084v-.49c0-.26.213-.469.475-.469z" fill="#FFF" fill-rule="nonzero"/>
            </svg>
            <h3>6 suggestions</h3>
           </div>
           <div className="sort">
            <span className="sort_by">Sort By : </span>
            <div className="sort">Most Upvotes <i className="fa fa-angle-down"></i></div>
           </div>
           <button className="btn button_feeback">
               + Add Feedback
           </button>
    </div>*/}