import React from 'react'
import { useLocation } from "react-router-dom";

function FlagInfo() {
    const location = useLocation();
    const { countryData } = location.state;
  return (
    <>
        {
            countryData.map((item, index) =>{
                return(
                    <div key={index}>
                        <h4>{item.name.common}</h4>

                    </div>
                )
            })
        }
    </>
  )
}

export default FlagInfo