import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service'; //получаем АПИ клиент

import './random-planet.css';

export default class RandomPlanet extends Component {

  static defaultProps = {
     updateInterval: 10000
  };

  static propTypes = {
      updateInterval: PropTypes.number
  };

  swapiService = new SwapiService(); //создаем поле swapiService и инициализируем его в теле класса

  state = {
    planet: {},
    loading: true
};

  componentDidMount() {
      const { updateInterval } = this.props;
      this.updatePlanet();
      this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
      clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => { //получаем planet
    this.setState({
      planet,
      loading: false,
      error: false
    }); //устанавливаем стэйт целиком, поскольку мы знаем какие данные мы получаем и какие нам нужны // когда планета загрузилась, спиннер больше не нужно показывать
  };

  onError = (err) => { //меняет в стэйте эррор на тру
    this.setState({
        error: true,
        loading: false //если произошла ошибка, лоадинг стает фалс
    });
  };

  updatePlanet = () => {
    console.log('update');
    const id = Math.floor(Math.random()*25) + 3; //(мат.рэндом возвращает значение от 0 до 1 случайное * 25 (первые 25 планет)//math.floor округляет вниз до ближайщего целого) + 3 прибавляем два
    this.swapiService
    .getPlanet(id) //используем айди когда получаем планету
    .then(this.onPlanetLoaded)
    .catch(this.onError);
  };

  render() {
    const { planet, loading, error } = this.state;//деструктурируем необходимые значение из стэйт, чтобы затем использовать их в jsx коде //додбавляем сюда лоадинг и эррор для отображения в случае необходимости

    const hasData = !(loading || error); //дата есть когда нет ни ошибки ни загрузки

    const errorMessage = error ? <ErrorIndicator/> : null; // показываем эррор индикатор в случае эррора, если нет - нет
    const spinner = loading ? <Spinner /> : null; //если загружаемся - спиннер, если нет - null (который не отображается)
    const content = hasData ? <PlanetView planet={planet}/> : null; //отображаем наши данные о планете

    return (
      <div className="random-planet jumbotron rounded">
          {errorMessage}
          {spinner}
          {content}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {

    const { id, name, population,
        rotationPeriod, diameter } = planet;

    return (
        <React.Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};