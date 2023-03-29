import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

function Weather() {
    const key = "ad69fc62eae34e3d90355107232803";
    const [data, setData] = useState({});
    const [city, setCity] = useState('Ibadan');
    const [url, setURL] = useState('/current.json');
    const abortRef = useRef(new AbortController());
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setLoading] = useState(true);


    const loading = (<div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>);

    const selectCity = e => {
        setCity(e.target.value);
    }

    useEffect(() => {
        setLoading(true);
        const baseURL = "http://api.weatherapi.com/v1";
        axios.get(`${baseURL}${url}?key=${key}&q=${city}`,
            { signal: abortRef.current.signal }
        )
            .then(res => { setData({ ...res.data }); })
            .catch(err => { console.warn(err.response) })
            .finally(() => { setLoading(false); })
    
      return () => {
        //   abortRef.current.abort();
      };
    }, [url, refresh, city])

    if (isLoading) {
        return loading;
    }

    const current = data.current;
    const location = data.location;
    return (
        <>
          <div className="d-flex justify-content-center justify-content-md-end align-items-center my-3">
                <span className='mx-1'>Last updated: <strong>{ current.last_updated }</strong></span>
                <i onClick={() => setRefresh(!refresh)} title="reload" className="bi bi-arrow-clockwise fs-4 mx-1 text-success"></i>
            </div>
                    
            <div className="form-floating my-4">
                <select onChange={selectCity} value={city} className="form-select" id="cities" aria-label="City">
                    <option hidden>Select City</option>
                    <option value="Ibadan">Ibadan</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Oshogbo">Oshogbo</option>
                    <option value="Nairobi">Nairobi</option>
                </select>
                <label htmlFor="cities">Choose city</label>
            </div>

            <div className="row mx-0 justify-content-center">
                <div className="col-12 col-md-10 text-center">
                        
                    <h5 className='mb-4'>{location.name}, { location.country}</h5>
                    <img className="my-3" src={current.condition.icon ?? ""} alt="icon" width="100" height="100" />
                    <h3 className="my-4">
                        <span>{current.temp_c}</span>
                        <sup>o</sup>
                        <span>C</span>
                    </h3>
                    <h2>{current.condition.text}</h2>
                </div>
            </div>  
        </>
    );
}

export default Weather;

if (document.getElementById('weather-app')) {
    const Index = ReactDOM.createRoot(document.getElementById("weather-app"));

    Index.render(
        <React.StrictMode>
            <Weather/>
        </React.StrictMode>
    )
}
