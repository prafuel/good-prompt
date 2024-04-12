'use client'

import React from 'react';
import Logo from './Logo';
import Image from 'next/image';


import { signIn } from "next-auth/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faGithub, faDiscord, faReddit, faFacebook } from '@fortawesome/free-brands-svg-icons'

// Cookies
import Cookies from 'js-cookie';
import { setCookie } from 'cookies-next'

const handleLogin = (str) => {
    setCookie("login", "true");
    signIn(str);
}

const socialHandle = ['Google', 'Github', 'Discord', 'Facebook', 'Reddit']
const socialHandleObj = {
    'Google': ['bg-red-600', faGoogle],
    'Github': ['bg-gray-700', faGithub],
    'Discord': ['bg-sky-600', faDiscord],
    'Facebook': ['bg-blue-700', faFacebook],
    'Reddit': ['bg-orange-600', faReddit]
}

const Login = () => {

    return (

        <main className='min-w-full min-h-full flex flex-row items-center justify-center absolute'>

            <div className='flex flex-col items-center justify-center gap-1'>
            <Logo data={{ width: "fit" }} />
                {
                    socialHandle.map((item, index) => {
                        return <div key={index} className={`text-white w-1/2 flex items-center px-4 gap-4 p-4 cursor-pointer ${socialHandleObj[item][0]}`}
                            onClick={() => {
                                handleLogin("google")
                            }}
                        >
                            <FontAwesomeIcon className='h-5' icon={socialHandleObj[item][1]} />
                            Sign in with {item}
                        </div>
                    })
                }
            </div>
        </main>
    )
}

export default Login