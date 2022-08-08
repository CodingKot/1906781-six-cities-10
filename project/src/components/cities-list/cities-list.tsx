import {Cities, City} from '../../types/offer';
import {Link} from 'react-router-dom';


type CitiesListProps = {
  cities: Cities;
  selectedCity?: City;
  onCityClick: (city: City) => void;
}

function CitiesList ({cities, selectedCity, onCityClick}: CitiesListProps): JSX.Element {

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city.name} >
              <Link className= {`locations__item-link tabs__item ${selectedCity?.name === city.name && 'tabs__item--active'}`}
                onClick = {(evt) => {
                  evt.preventDefault();
                  onCityClick(city);}}
                to="/"
              >
                <span>{city.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
