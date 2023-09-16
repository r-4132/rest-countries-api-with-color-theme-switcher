import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AllFlags from './AllFlags';

export default function Search() {
    const [data, setData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filter, setFilter] = useState([]);
    const [region, setRegion] = useState('');
    const [showResult, setShowResult] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [showFilter, setShowFilter] = useState(false)

    const navigate = useNavigate();


    const fetchData = async (input) => {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${input}`);
            console.log(`API response`, res);


            if (res.ok) {
                const dataRes = await res.json();
                setData(dataRes)
                setNotFound(false)
                console.log(`data response`, dataRes)
            } else if (res.status === 404) {
                setNotFound(true)
            }
        }
        catch {
            console.log('error in fetching data')
        }
    }

    const fetchFilter = async (regionName) => {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/region/${regionName}`);
            if (res.ok) {
                const filterRes = await res.json();
                setFilter(filterRes);
                console.log(filterRes)
            }
        }
        catch {
            console.log('error in filter region');
        }
    }


    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setShowResult(true)
            fetchData(searchInput);
            if (showFilter) {
                setShowFilter(false);
            }
        }
    }

    const regionFilter = [
        "Asia",
        "Europe",
        "Africa",
        "Antartica",
        "Australia",
        "North America",
        "South America",
    ]


    const handleFilterRegion = (event) => {
        const selectedRegion = event.target.value;
        fetchFilter(selectedRegion);
        setShowFilter(true);
    }

    const handleClick = (dataArray) => {
        if (!dataArray.some(x => x.borders)) {
            console.log('no border countries')
            navigate(`/flagInfo`, { state: { countryData: dataArray } });
        } else {
            const borderCountries = data.map(x => x.borders.join(','))
            console.log('with border countries')
            navigate(`/flagInfo`, { state: { countryData: dataArray, borderCountries: borderCountries } });
        }
    }
    


    return (
        <>
            <div className='h-auto flex flex-col space-y-8 bg-lightGray dark:bg-veryDarkBlue'>
                <label className='w-[90%] h-[3rem] flex flex-col self-center mt-[1rem] relative mb-[5rem] '>
                    <div >
                        <input className='w-[100%] h-[100%] rounded-md p-[1rem] pl-[2rem] dark:bg-darkBlue dark:text-white' onKeyPress={handleSearch} type='text' value={searchInput} placeholder='&nbsp; search country...' onChange={e => setSearchInput(e.target.value)} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 absolute top-6 transform -translate-y-1/2 left-4 text-gray-500 dark:text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <div className='self-start mt-[1rem]'>

                        <select value={region} onChange={handleFilterRegion} className='h-[3rem] w-[15rem] p-[.5rem]  rounded-md dark:bg-darkBlue dark:text-white'>
                            <option value="" >Filter by region</option>
                            {regionFilter.map((item) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>

                    </div>

                </label>

                {
                    !showFilter ? (

                        showResult ? (
                            !notFound ? (
                                data.map((item) => {
                                    return (
                                        <div className='flex self-center justify-center flex-col'>
                                            <img src={item.flags.png} onClick={() => handleClick(data)}  />
                                            <h4>{item.name.common}</h4>
                                            <p>{item.population}</p>
                                        </div>
                                    )
                                })

                            ) : (<h3>Country not found</h3>)
                        ) : (

                            <div className='self-center'>
                                <AllFlags />
                            </div>
                        )
                    ) : (
                        <div className='self-center'>
                            {
                                filter.map((filter) => {
                                    return (
                                        <div className='text-left mt-[1rem] bg-white dark:text-white dark:bg-darkBlue'>
                                            <div className='space-y-3 space-x-4'>
                                                <img src={filter.flags.png} alt={filter.name.common} onClick={() => handleClick([filter])} />
                                                <h3 className='text-bold'>{filter.name.common}</h3>
                                                <div>
                                                    <h4>{filter.region}</h4>
                                                    <h4>{filter.capital}</h4>
                                                    <p>{filter.population}</p>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}
