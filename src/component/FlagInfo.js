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
    const { borderCountries } = location.state;

    const fetchBorder = async (e) => {
        try {
            // setBorder(countryData[0].borders.join(','))
            const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCountries}`)
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
        fetchBorder();

        const nativeNames = Object.values(countryData[0].name.nativeName);
        const cur = Object.values(countryData[0].currencies);
        const lang = Object.values(countryData[0].languages);
        setNativeName(nativeNames[0].common);
        setCountry(countryData[0].name.common);
        setPopulation(countryData[0].population);
        setRegion(countryData[0].capital);
        setSubRegion(countryData[0].subregion);
        setCapital(countryData[0].capital);
        setTopLevelDomain(countryData[0].tld[0]);
        setCurrencies(cur[0].symbol);
        setLanguages(lang[0]);
    

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