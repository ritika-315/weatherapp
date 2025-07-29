import dayjs from "dayjs";
import { UseWeatherAppContext } from '../../Context/Context';

const LeftComponents = () => {
  const WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const { state: { city, current } } = UseWeatherAppContext();

  if (!current || !current.temp || !current.weather) return <div>Loading...</div>;

  const weekdayIndex = dayjs.unix(current.dt).day();
  const currentTime = dayjs().format('hh:mm A');
  const isDay = dayjs().hour() >= 6 && dayjs().hour() < 18;
  const dayOrNight = isDay ? "Daytime 🌞" : "Nighttime 🌙";

  return (
    <div className='leftWrap'>
      <div className='dateWrap'>
        <h2>{WEEKDAYS[weekdayIndex]}</h2>
        <span className="dateDay">
          {dayjs.unix(current.dt).format("DD MMM YYYY")}
        </span>
        <span className="locationName">
          {city.city} - {city.admin_name} - {city.country}
        </span>
        <span className="timeNow">Local Time: {currentTime}</span><br />
        <span className="dayNight">{dayOrNight}</span>
      </div>

      <div className="weatherContainer">
        <img
          className="weatherIcon"
          alt={current.weather[0].description || "Weather Icon"}
          src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
        />
        <h1 className="weatherTemp">{Math.round(current.temp.max)}°C</h1>
        <h3 className="weatherDesc">{current.weather[0].main}</h3>
      </div>
    </div>
  );
};

export default LeftComponents;
