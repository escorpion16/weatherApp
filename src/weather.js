import {useState, useEffect} from 'react';

const api = {
    key: 'bebce4c562eebdfe889e766b08a506c8',
    base: 'https://api.openweathermap.org/data/2.5/'
  }

export const Weather = () => {
    const [data, setData] = useState({});
    const [lat, setLat] =  useState('');
    const [lon, setLon] = useState('');
    
    useEffect(() => {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
          
          function success(pos) {
            var crd = pos.coords;
            setLat(crd.latitude)
            setLon(crd.longitude)
          };
          
          function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
          };
          
          navigator.geolocation.getCurrentPosition(success, error, options);
    }, [])
    
  
    useEffect(() => {
      const geoposition = async () => {
        let url = `${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.key}`;
        const response = await fetch(url).then(res => res.json())            
        setData(response)
      }
      if(lat && lon){
        geoposition()
      }
      
    },[lat,lon])
  
    useEffect(() => {
      if(data) {
        console.log(data)   
      }
    }, [data])

    return (
      
        <div className="weather-container">
            {(typeof data.main != 'undefined') ? (
              <div>
                <h3>{data.name}</h3>
                <h3>{data.sys.country}</h3>
                <div className="weather-content">
                    <div className="weather-icon">

                    </div>
                    <div className="weather-information">
                        <h4>{data.weather[0].main}</h4>
                        <div className="icon">
                          <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}  alt="imagen"></img>
                          <h4>Wind speed: {data.wind.speed}</h4>
                        </div>
                        <h4>Cloud: {data.clouds.all} %</h4>
                        <h4>Pressure: {data.main.pressure} mb</h4>
                    </div>
                </div>
              </div>  
      ) : ('')}
        </div>
    )
}
