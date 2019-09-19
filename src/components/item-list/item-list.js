import React from 'react';
import PropTypes from 'prop-types';

import { withData } from '../hoc-helpers';
import SwapiService from '../../services/swapi-service';
import './item-list.css';

const ItemList = (props) => {

      const { data, onItemSelected, children: renderLabel } = props; //получаем данные из props

      const items = data.map((item) => { //передаем их сюда
            const { id } = item; //достаем id из item
            const label = renderLabel(item); //передаем наш item

            return (
                <li className="list-group-item"
                    key ={id} //у которого есть уникальный ключ, который является айди персонажа //онКлик это ивент листенер на который мы вызовем онИтемСелектед
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li> // используем label внутри нашего элемента-списка
            );
        });

    return (
      <ul className="item-list list-group">
          {items}
      </ul>
    );
};

ItemList.defaultProps = { //ItemList.defaultProps это объект, ключи которого это названия props, которое есть у нас в компоненте
    onItemSelected: () => {} //onItemSelected по умполчанию это пустая функция, которая ничего не делает. Если в наш код мы не передадим значения для onItemSelected, то вместо него будет использовано значение по умолчанию, то есть пустая функция.
};

ItemList.propTypes = {
    onItemSelected: PropTypes.func, //onItemSelected - это опциональная функция
    data: PropTypes.arrayOf(PropTypes.object).isRequired, //массив любых объектов, в скобках передаем какого типа наш массив. isRequired поскольку наш массив расчитывает что ему передадут данные
    children: PropTypes.func.isRequired //должно обязательно быть функцией
};

const { getAllPeople } = new SwapiService();

export default withData(ItemList, getAllPeople);
