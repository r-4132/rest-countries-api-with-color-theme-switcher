import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [data, setData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [flag, setFlag] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [allFlags, setAllFlags] = useState([]);
    const [filter, setFilter] = useState([]);
    const [region, setRegion] = useState('');
    const [showResult, setShowResult] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const flagsPerPage = 6;
    const navigate = useNavigate();


    const fetchData = async (e) => {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${searchInput}`);
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

    const fetchFlag = async (e) => {
        try {
            const res = await fetch('https://restcountries.com/v3.1/all');
            console.log(`flag response`, res);
            if (res.ok) {
                const flagRes = await res.json();
                setFlag(flagRes);
            }


        }
        catch {
            console.log('error loading flags');
        }

    }
    const fetchFilter = async (e) => {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/all?region=${region}`);
            if (res.ok) {
                const filterRes = await res.json();
                setFilter(filterRes)
            }
        }
        catch {
            console.log('error in filter region');
        }
    }


    useEffect(() => {
        fetchFlag();

    }, [])

    useEffect(() => {
        const start = (currentPage - 1) * flagsPerPage;
        const end = start + flagsPerPage;
        const allFlagsDisplay = flag.slice(start, end);
        setAllFlags(allFlagsDisplay)
    }, [flag, currentPage])


    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setShowResult(true)
            fetchData();
        }
    }

    const handlePage = nextPage => {
        setCurrentPage(nextPage)
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
        setRegion(event.target.value);
        const selectedRegion = event.target.value;
        fetchFilter();
    }

    const handleClick = () => {
        const dataArray = Object.values(data);

        if (!dataArray.some(x => x.borders)) {
            navigate(`/flagInfo`, { state: { countryData: dataArray } });
        } else {
            const borderCountries = data.map(x => x.borders.join(','))
            navigate(`/flagInfo`, { state: { countryData: dataArray, borderCountries: borderCountries } });
        }
    }


    return (
        <>
            <div className=' flex flex-col space-y-8 bg-pink-50 dark:bg-gray-900'>
                <label className='w-[90%] h-[2rem] outline outline-1 self-center mt-[1rem]'>
                    <input className='w-[100%] h-[100%]' onKeyPress={handleSearch} type='text' value={searchInput} placeholder='search country' onChange={e => setSearchInput(e.target.value)} />
                    {/* <button type="submit" onClick={handleSearch} >Search</button> */}
                </label>
                <label>
                    <select value={region} onChange={handleFilterRegion}>
                        <option value="">Filter by region:</option>
                        {regionFilter.map((item) => (
                            <option value={item}>{item}</option>
                        ))}
                    </select>
                    {
                        filter.map((filter) => {
                            return (
                                <div className='flex self-center justify-center'>
                                    <h4>{filter.name.common}</h4>
                                </div>
                            )
                        })
                    }
                </label>
                {showResult ? (!notFound ?

                    (data.map((item) => {
                        return (
                            <div className='flex self-center justify-center flex-col'>
                                <img src={item.flags.png} onClick={handleClick} />
                                <h4>{item.name.common}</h4>
                                <p>{item.population}</p>
                            </div>
                        )
                    })) : (
                        <h3>Country not found</h3>
                    )
                ) : (

                    <div className='flex flex-col justify-center content-center'>

                        {
                            allFlags.map((flagItem) => (
                                <div className='flex self-center'>
                                    <img src={flagItem.flags.png} alt={flagItem.name.common} />
                                </div>
                            ))
                        }
                        <div>
                            <button onClick={() => handlePage(currentPage - 1)} > Prev</button>
                            <button onClick={() => handlePage(currentPage + 1)} > Next</button>
                        </div>
                    </div>
                )
                }
                <div>
                </div>
            </div>
        </>
    )
}
