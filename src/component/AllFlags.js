import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AllFlags() {
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState([])
    const [allFlags, setAllFlags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();
    const flagsPerPage = 6;

    const fetchData = async (input) => {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${input}`);
            console.log(`API response`, res);

            if (res.ok) {
                const dataRes = await res.json();
                return dataRes || [];
            } 
        }
        catch {
            console.log('error in fetching data')
        }
        return [];
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
    useEffect(() => {
        const start = (currentPage - 1) * flagsPerPage;
        const end = start + flagsPerPage;
        const allFlagsDisplay = flag.slice(start, end);
        setAllFlags(allFlagsDisplay)
    }, [flag, currentPage])

    useEffect(() => {
        fetchData();
        fetchFlag();

    }, [])
    const handlePage = nextPage => {
        setCurrentPage(nextPage)
    }

    const handleClick = async(itemName) => {    
        const dataArray = await fetchData(itemName);
        console.log(dataArray)

        if (!dataArray.some(x => x.borders)) {
            console.log('no border countries')
            navigate(`/flagInfo`, { state: { countryData: dataArray } });
        } else {
            const borderCountries = dataArray.map(x => x.borders.join(','))
            console.log(borderCountries, 'broderCountries')
            navigate(`/flagInfo`, { state: { countryData: dataArray, borderCountries: borderCountries } });

        }
    }

    return (
        <>
            {
                allFlags.map((item) => (
                    <div className='text-left mt-[1rem] bg-white dark:text-white dark:bg-darkBlue'>
                        <div className='space-y-3 space-x-4'>
                            <img src={item.flags.png} alt={item.name.common}  onClick={() => handleClick(item.name.common)} />
                            <h3 className='text-bold'>{item.name.common}</h3>
                            <div>
                                <h4>{item.region}</h4>
                                <h4>{item.capital}</h4>
                                <p>{item.population}</p>
                            </div>
                        </div>

                    </div>
                ))

            }
            <div>
                <button onClick={() => handlePage(currentPage - 1)} > Prev</button>
                <button onClick={() => handlePage(currentPage + 1)} > Next</button>
            </div>
        </>
    )
}

export default AllFlags