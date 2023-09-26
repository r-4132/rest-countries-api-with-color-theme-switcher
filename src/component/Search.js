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
    const [currentPage, setCurrentPage] = useState(1);
    const [flagFilter, setFlagFilter] = useState([]);



    const navigate = useNavigate();
    const flagsPerPage = 8;


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
        "America",
        "Oceania",
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

    const handlePage = nextPage => {
        setCurrentPage(nextPage);
    }

    useEffect(() => {
        const start = (currentPage - 1) * flagsPerPage;
        const end = start + flagsPerPage;
        const allFlagsDisplay = filter.slice(start, end);
        setFlagFilter(allFlagsDisplay);
    }, [currentPage, filter]);



    return (
        <>
            <div className='h-full flex flex-col space-y-8 bg-lightGray dark:bg-veryDarkBlue dark:text-white'>
                <label className='w-[90%] h-[3rem] flex flex-col self-center mt-[1rem] relative mb-[5rem] lg:flex-row lg:justify-between lg:w-[86.5%] lg:m-[2rem]'>
                    <div >
                        <input className='w-[100%] h-[100%] rounded-md p-[1rem] pl-[2rem] dark:bg-darkBlue dark:text-white lg:w-[30rem]' onKeyPress={handleSearch} type='text' value={searchInput} placeholder='&nbsp; &nbsp; &nbsp;search country...' onChange={e => setSearchInput(e.target.value)} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 absolute top-6 transform -translate-y-1/2 left-4 text-gray-500 dark:text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <div className='self-start mt-[1rem] lg:mt-[0rem]'>
                        <select value={region} onChange={handleFilterRegion} className='h-[3rem] w-[15rem] p-[.5rem] rounded-md dark:bg-darkBlue dark:text-white appearance-none'>
                            <option value="" >Filter by region</option>
                            {regionFilter.map((item) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                        <div className='relative'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 absolute bottom-3.5 right-4 dark:text-white">
                                <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />
                            </svg>

                        </div>

                    </div>

                </label>

                {
                    !showFilter ? (

                        showResult ? (
                            !notFound ? (
                                data.map((item) => {
                                    return (
                                        <div className='flex self-center justify-center flex-col'>
                                            <img src={item.flags.png} onClick={() => handleClick(data)} />
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
                            <div  className='lg:grid lg:grid-cols-4 gap-16'>
                                {
                                    flagFilter.map((filter) => {
                                        return (
                                            <div className='text-left mt-[1rem] bg-white dark:text-white dark:bg-darkBlue'>
                                                <div className='space-y-3 space-x-4'>
                                                    <img src={filter.flags.png} alt={filter.name.common} onClick={() => handleClick([filter])}
                                                        className='w-[280px] h-[190px]' />
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
                            <div className='space-x-5 lg:m-[2rem]'>
                                <button onClick={() => handlePage(currentPage - 1)} > Previous</button>
                                <button onClick={() => handlePage(currentPage + 1)} > Next</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
