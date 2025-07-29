import { UseWeatherAppContext } from '../../Context/Context';

const HumidityComponents = () => {
  let { state: { current, city } } = UseWeatherAppContext();

  console.log('Forecast Data: ', current, city);

  return (
    <>
      {current && (
        <div className='humidityWrap'>
          <div className='humidityData'>
            <div className='title'>{city.city} - {city.admin_name} - Population</div>
            <div className='value'>{parseFloat(city.population).toLocaleString('en')}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default HumidityComponents;
