import React from 'react'
import moonSolid from '../assets/moon-solid.svg'
import moonReg from '../assets/moon-regular.svg'
import { useEffect, useState } from 'react'

function NavBar() {
    const [theme, setTheme] = useState('light');
    // change to null ^^


    // useEffect(() => {
    //     if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //         setTheme('dark');
    //     }
    //     else {
    //         setTheme('light');
    //     }
    // }, [])

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add("dark")
        }
        else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])
    const handleDark = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <div className='p-[1rem] bg-white shadow-lg shadow-black-500/50 dark:bg-darkBlue dark:text-white'>
            <div className='w-[100%] flex flex-row justify-between content-center my-[1.5rem] lg:my-[0] lg:px-[5rem]'>

                <h3 className='font-[800] text-[14px] lg:text-[20px]'>Where in the world?</h3>
                <div className='dark:text-white'>
                    <button className='flex flex-row justify-end self-center text-[14px] lg:text-[16px] font-[800] lg:font-[600]' onClick={handleDark}>
                        {
                            theme === 'light' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3.5 h-3.5 mt-[.2rem] mr-[.4rem] top-1 lg:w-4 lg:h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                </svg>

                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 mt-[.2rem] mr-[.4rem] top-1 lg:w-4 lg:h-4">
                                    <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd" />
                                </svg>

                            )
                        }


                        Dark Mode
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavBar