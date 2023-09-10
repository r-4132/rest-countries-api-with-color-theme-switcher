import React from 'react'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

function FlagInfo() {
    const [border, setBorder] = useState([]);
    const [borderJson, setBorderJson] = useState([]);
    const [nativeName, setNativeName] = useState('');
    const [country, setCountry] = useState('');
    const [population, setPopulation] = useState('');
    const [region, setRegion] = useState('');
    const [subRegion, setSubRegion] = useState('');
    const [capital, setCapital] = useState('');
    const [topLevelDomain, setTopLevelDomain] = useState('');
    const [currencies, setCurrencies] = useState('');
    const [languages, setLanguages] = useState('');


    const location = useLocation();
    const { countryData } = location.state;

    const fetchBorder = async (e) => {
        setBorder(countryData[0].borders.join(','))
        try {
            const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${border}`)
            if (res.ok) {
                const dataJson = await res.json();
                setBorderJson(dataJson);
                console.log(dataJson, 'datajson')
            }
            
        }
        catch {
            console.log('error in fetching border country names');
        }
    }

    useEffect(() => {

        const country = countryData.map((country) => {
            const nativeNames = Object.values(country.name.nativeName);
            const cur = Object.values(country.currencies);
            const lang = Object.values(country.languages);
            setNativeName(nativeNames[0].common)
            setCountry(country.name.common);
            setPopulation(country.population);
            setRegion(country.capital);
            setSubRegion(country.subregion);
            setCapital(country.capital);
            setTopLevelDomain(country.tld[0]);
            setCurrencies(cur[0].symbol);
            setLanguages(lang[0]);
        });

        fetchBorder();

    }, [countryData]);
    return (
        <>
            <h4>{nativeName}</h4>
            <h4>{country}</h4>
            <h4>{population}</h4>
            <h4>{region}</h4>
            <h4>{subRegion}</h4>
            <h4>{capital}</h4>
            <h4>{topLevelDomain}</h4>
            <h4>{currencies}</h4>
            <h4>{languages}</h4>
            <h4>
                {
                    borderJson.map(x => {
                        return(
                            <div>
                                <button>{x.name.common}</button>
                            </div>
                        )
                    })
                }
            </h4>
        </>
    )
}

export default FlagInfo