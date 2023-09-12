import React from 'react'
import moonSolid from '../assets/moon-solid.svg'
import moonReg from '../assets/moon-regular.svg'

function NavBar() {
    return (
        <div className='flex flex-row justify-between content-center p-[1rem] shadow-lg shadow-black-500/50'>
            <h3>Where in the world?</h3>
            <div className='flex'>
                <img src={moonReg} className=' w-[15px] mr-[.5rem]'></img>
                <button>Dark Mode</button>
            </div>
        </div>
    )
}

export default NavBar