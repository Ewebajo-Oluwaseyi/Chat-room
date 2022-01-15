import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';


export default function Auth() {
    const history = useHistory();
    let { url } = useRouteMatch();

    const isLogin = history.location.pathname !== '/auth/register'
    return (
        <>
            <main className="bg-white rounded overflow-hidden mx-6 xs:mx-auto my-8 max-w-md">
              <div className='px-6 py-8 md:px-8 md:py-10'>
                <div className='items-center'>
                 <img
                    src={`https://avatars.dicebear.com/api/avataaars/${new Date().toISOString()}.svg`}
                    height={40}
                    width={40}
                    className="mx-auto rounded-full"
                    role="presentation"
                  />
                  <h2 className='text-center mt-2 text-blue-600 text-2xl'>Chat Room</h2>
                </div>
                <div
                    className={`grid grid-cols-2 before:h-1 before:bg-blue-600 before:w-1/2 pb-5 mt-10 
                    ${!isLogin ? 'before:translate-x-full' : ''} relative before:absolute before:bottom-0 before:transition-transform -scale-x-90 border-b border-light border-opacity-40`}
                    role="tablist"
                >
                    <button
                        className={`w-full text-center ${isLogin ? 'font-bold': ''}`}
                        role="tab"
                        id="login-tab"
                        aria-controls='login-tabpanel'
                        aria-selected={isLogin}
                        onClick={() => history.replace(`${url}/login`)}
                    >Login</button>
                    <button
                        className={`w-full text-center ${!isLogin ? 'font-bold': ''}`}
                        role="tab"
                        id="register-tab"
                        aria-controls='register-tabpanel'
                        aria-selected={!isLogin}
                        onClick={() => history.replace(`${url}/register`)}
                    >Register</button>
                </div>
                        {
                            isLogin ? (
                                <div role="tab-panel" id="login-tabpanel">
                                    <Login/>
                                </div>
                            ) : (
                                <div role="tab-panel" id="register-tabpanel">
                                    <Register/>
                                </div>
                            )
                        }
              </div>
           </main>
        </>
    )
}