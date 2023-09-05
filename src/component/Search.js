import React from 'react'
import { useEffect, useState } from 'react'

export default function Search() {
    const [data, setData] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const fetchData = async (e) => {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${searchInput}`);
            console.log(`API response`, res);


            if (res.ok) {
                const data = await res.json();
                console.log(`data`, data)
            }
        }
        catch {
            console.log('error')
        }
    }


    const handleSearch = () => {
        fetchData();
    }


    return (
        <>
            <label>
                search country:
                <input type='text' value={searchInput} placeholder='search country' onChange={e => setSearchInput(e.target.value)}  />
                <button type="submit" onClick={handleSearch} >Search</button>
            </label>
        </>
    )
}
