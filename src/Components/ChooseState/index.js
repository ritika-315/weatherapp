import cities from "../../Data/in.json";
import { UseWeatherAppContext } from "../../Context/Context";
import axios from "axios";
import { useEffect } from "react";
import dayjs from "dayjs"; // you need this for dt conversion

const ChooseStateComponents = () => {
  const {
    state: { city },
    dispatch,
  } = UseWeatherAppContext();

  const handleChange = (e) => {
    const selectedCity = cities.find((c) => c.city === e.target.value);
    dispatch({
      type: "SET_CITY",
      payload: selectedCity,
    });
  };

  const APIKEY = "c1465d62c8daff9b1d240fc1dd1949e2";
  const lat = city?.lat || "";
  const long = city?.lng || "";
  const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&lang=tr&appid=${APIKEY}`;

  const fetchData = () => {
    if (!lat || !long) return;
    axios(URL)
      .then((res) => {
        const forecastList = res.data.list;

        // Group by date
        const grouped = {};
        forecastList.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(item);
        });

        // Extract one entry per day
        const daily = Object.keys(grouped)
          .slice(0, 5) // limit to next 5 days
          .map((date) => {
            const entries = grouped[date];
            const maxTemp = Math.max(...entries.map((e) => e.main.temp_max));
            const minTemp = Math.min(...entries.map((e) => e.main.temp_min));
            const middayEntry = entries[Math.floor(entries.length / 2)];

            return {
              dt: dayjs(date).unix(), // dayjs required for dt
              temp: { max: maxTemp, min: minTemp },
              weather: middayEntry.weather,
            };
          });

        dispatch({
          type: "SET_DAILY",
          payload: daily,
        });

        // Set the first day as current
        dispatch({
          type: "SET_CURRENT",
          payload: daily[0],
        });
        dispatch({ 
            type: 'SET_FORECAST', 
            payload: res.Data });
        })
      .catch((err) => {
        console.error("Failed to fetch weather data", err);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [city]);

  return (
    <div className="stateWrap">
      <select className="stateMenu" defaultValue={city} onChange={handleChange}>
        {cities &&
          cities.length > 0 &&
          cities.map((city) => (
            <option key={`${city.population}${city.lat}`} value={city.city}>
              {city.city} - {city.admin_name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default ChooseStateComponents;
