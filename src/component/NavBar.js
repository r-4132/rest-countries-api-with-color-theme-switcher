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
    },[theme])
    const handleDark = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <div className='flex flex-row justify-between content-center p-[1rem] bg-white shadow-lg shadow-black-500/50 dark:bg-darkBlue dark:text-white'>
            <h3>Where in the world?</h3>
            <div className='dark:text-white'>
                {/* <img src={moonReg} className=' w-[15px] mr-[.5rem]'></img> */}
                <button className='flex flex-row justify-evenly self-center w-[120px]' onClick={handleDark}>
                    <img src={theme === 'light' ? moonReg: moonSolid} alt='moon' className=' w-[15px] '></img>
                    Dark Mode
                </button>
            </div>
        </div>
    )
}

export default NavBar