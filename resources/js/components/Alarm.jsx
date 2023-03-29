import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

function alarm(body) {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
      const notification = new Notification("Sunrise/Sunset Alarm", {body});

      notification.onclick = e => {
          notification.close();
      }
  } else if (Notification.permission !== "denied") {
   
    }
}


function Alarm() {
    const [data, setData] = useState({});
    const abortRef = useRef(new AbortController());
    const [isLoading, setLoading] = useState(true);

    if (!("Notification" in window)) {
         Notification.requestPermission().then((permission) => {
        if (permission === "denied") {
            alert('Cannot send notification!');
        }
        });
    }

    const offset = +1;

 

    function setTime(time) {
        const split = time.split(":");
        const hr = (Number(split[0]) + offset) % 24;
        split[0] = hr;
        return split.join(':');
    }

    function sendNotification(res) {
        const sunrise = res.sunrise;
        const sunset = res.sunset;

        let sunriseHr = Number(sunrise.split(':')[0]) + offset;
        let sunsetHr = Number(sunset.split(':')[0]) + offset;

        sunsetHr = sunset.includes('PM') ? sunsetHr + 12 : sunsetHr;

        const currentHr = new Date().getHours();
        let msg = "";

        if ((sunsetHr - currentHr) >= 0 && (sunsetHr - currentHr) <= 3) {
            msg = `The sun will set in ${sunsetHr - currentHr} hour(s)`;
        } else if ((currentHr - sunsetHr) >= 0 && (currentHr - sunsetHr) <= 3) {
            msg = `The sun set ${currentHr - sunsetHr} hour(s) ago`;
        }

        if ((sunriseHr - currentHr) >= 0 && (sunriseHr - currentHr) <= 3) {
            msg = `The sun will rise in ${sunriseHr - currentHr} hour(s)`;
        } else if ((currentHr - sunriseHr) >= 0 && (currentHr - sunriseHr) <= 3) {
            msg = `The sun rose ${currentHr - sunriseHr } hour(s) ago`;
        }
        alarm(msg);
    }

    useEffect(() => {
        setLoading(true);
        const url = `https://api.sunrisesunset.io/json?lat=7.398980&lng=3.920400&timezone=UTC&date=today`;
        axios.get(url,
            {
                signal: abortRef.current.signal,
                headers: {
                    "Cache-Control": null,
                    "X-Requested-With": null,
                }
            }
        )
            .then(res => {
                console.log(res.data);
                setData({...res.data.results});
                sendNotification(res.data.results);
            })
            .catch(err => { console.warn(err) })
            .finally(() => { setLoading(false); })
    
      return () => {
        //   abortRef.current.abort();
      };
    }, [])
   


    const loading = (<div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>);


    if (isLoading) {
        return loading;
    }
    
    return (
        <div className="row mx-0 justify-content-center mt-5 text-center g-3">
            <div className="col-auto">
                <h3>Sunrise</h3>
                <h5>{setTime(data.sunrise)}</h5>
            </div>
            <div className="col-auto">
                <h3>Sunset</h3>
                <h5>{setTime(data.sunset)}</h5>
            </div>
        </div>
    );
}

export default Alarm;

if (document.getElementById('alarm-app')) {
    const Index = ReactDOM.createRoot(document.getElementById("alarm-app"));

    Index.render(
        <React.StrictMode>
            <Alarm/>
        </React.StrictMode>
    )
}
