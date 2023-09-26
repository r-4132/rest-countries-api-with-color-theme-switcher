import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';


function FlagInfo() {
    const [borderJson, setBorderJson] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [dataShow, setDataShow] = useState(false)



    const location = useLocation();
    const navigate = useNavigate();

    const { countryData } = location.state;
    const [data, setData] = useState(countryData);

    const { borderCountries } = location.state;
    const [borderCountry, setBorderCountry] = useState(borderCountries)

    const fetchBorder = async (e) => {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCountry}`)
            if (res.ok) {
                const dataJson = await res.json();
                setBorderJson(dataJson);
                console.log(dataJson, 'Fetched border country')
            }

        }
        catch {
            console.log('error in fetching border country names');
        }
    }


    const fetchData = async (e) => {
        try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${searchInput}`);


            if (res.ok) {
                const dataRes = await res.json();
                setData(dataRes)
                console.log('fetched data')

            }
        }
        catch {
            console.log('error in fetching data')
        }
    }
    useEffect(() => {
        fetchBorder();
        fetchData();
    }, [borderCountry, searchInput])


    const handleBack = e => {
        navigate('/')
    }
    return (
        <div className='flex flex-col lg:h-[calc(100vh-3.9rem)] text-left p-[1.8rem] bg-lightGray dark:bg-veryDarkBlue dark:text-white'>
            <div className='lg:w-[90%] lg:mx-auto lg:mt-[5rem]'>

                <div className=''>
                    {
                        data.map(item => {
                            const cur = Object.values(item.currencies);
                            const lang = Object.values(item.languages);
                            const nativeNames = Object.values(item.name.nativeName);
                            const population = item.population;
                            return (
                                <div className='space-y-5 lg:flex lg:justify-evenly'>
                                    <div className=''>
                                        <button onClick={handleBack} className='flex font-[600] w-[5rem] lg:w-[8rem] lg:h-[2rem] lg:justify-center p-[2px] shadow-sm shadow-gray-400 dark:shadow-gray-900 dark:bg-darkBlue'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 px-[.3rem] lg:w-7 lg:h-7">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                            </svg>

                                            <p className='text-[12px] lg:text-[14px] pt-1'>Back</p>
                                        </button>
                                        <img src={item.flags.png} className='w-[300px] lg:w-[500px] lg:h-[300px] self-center mt-[3rem]' />
                                    </div>
                                    <br></br>
                                    <div className='lg:pt-[3rem] lg:grid lg:grid-cols-2 lg:gap-2  lg:content-center'>
                                            <h4 className='font-[800] text-[22px] lg:col-span-2'>{item.name.common}</h4>
                                        <div className='space-y-2 lg:space-y-0'>
                                            <br></br>

                                            <h4><span className='font-[600]'>Native Name:</span> {nativeNames[0].common}</h4>
                                            <p><span className='font-[600]'>Population:</span> {population.toLocaleString()}</p>
                                            <p><span className='font-[600]'>Region:</span> {item.region}</p>
                                            <p><span className='font-[600]'>Sub Region:</span>{item.subregion}</p>
                                            <p><span className='font-[600]'>Capital:</span> {item.capital}</p>
                                        </div>
                                        <div className='space-y-2 lg:space-y-0'>
                                            <br></br>
                                            <p><span className='font-[600]'>Top Level Domain:</span> {item.tld[0]}</p>
                                            <p><span className='font-[600]'>Currencies:</span> {cur[0].symbol}</p>
                                            <p><span className='font-[600]'>Languages:</span> {lang.join(',')}</p>
                                        </div>
                                        <div className='space-y-3 lg:space-y-0 lg:col-span-2 lg:flex lg:mt-[2rem]'>
                                            <br></br>
                                            <h4 className='font-[600]'>Border Countries:</h4>
                                            <div className='grid grid-cols-3 lg:pl-[.5rem] '>
                                                {
                                                    borderJson.map(x => {
                                                        return (
                                                            <div>
                                                                <button className='text-[14px] self-start shadow-sm shadow-gray-400 dark:shadow-gray-900 w-[5rem] dark:bg-darkBlue' onClick={(e) => {
                                                                    setSearchInput(x.name.common);
                                                                    setBorderCountry(x.borders.join(','));
                                                                }}>
                                                                    {x.name.common}
                                                                </button>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default FlagInfo