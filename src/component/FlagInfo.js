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
        <div className='flex flex-col text-left m-[1.8rem]'>
            <button onClick={handleBack} className='self-start'>back</button>
            {
                data.map(item => {
                    const cur = Object.values(item.currencies);
                    const lang = Object.values(item.languages);
                    const nativeNames = Object.values(item.name.nativeName);
                    return (
                        <>
                            <img src={item.flags.png} className='w-[300px] self-center' />
                            <h4>{nativeNames[0].common}</h4>
                            <h4>{item.name.common}</h4>
                            <p>{item.population}</p>
                            <p>{item.capital}</p>
                            <p>{item.subregion}</p>
                            <p>{item.tld[0]}</p>
                            <p>{cur[0].symbol}</p>
                            <p>{lang[0]}</p>
                        </>
                    )
                })
            }
            {
                borderJson.map(x => {
                    return (
                        <div key={x.name.common}>
                            <button onClick={(e) => {
                                setSearchInput(x.name.common); 
                                setBorderCountry(x.borders.join(','));}}>
                                    {x.name.common}
                            </button>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default FlagInfo