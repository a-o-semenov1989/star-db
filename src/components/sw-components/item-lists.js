import React from 'react';
import ItemList from '../item-list';
import {
    withData,
    withSwapiService,
    withChildFunction,
    compose } from '../hoc-helpers';

const renderName = ({ name }) => <span>{name}</span>; //функция для рендера имени

const renderModelAndName = ({ model, name}) => <span>{name} ({model})</span>; //для кораблей мы будем рендерить еще и модель //принимает объект у которого есть model и name и возвращает такой jsx - <span>{name} ({model})</span>

const mapPersonMethodsToProps = (swapiService) => { //получаем swapiService
  return { //возвращаем объект, который скажет что getData в этой свойство пойдет swapiService.getAllPeople
    getData: swapiService.getAllPeople
  };
};

const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    };
};

const mapStarshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    };
};
//в каждом компоненте ниже мы берем за основу ItemList, затем он проходит через функцию withChildFunction, это создает новый компонент у которого уже установлена функция для рендера child-элементов этого списка. Затем этот самый компонент, который мы создали (мы даже не присваивали ему имя или не присваивали его константе) мы передаем дальше в функцию withData и эта функция в свою очередь оборачивает этот компонент в намного более сложный компонент, который занимается получением данных и обработкой ошибок.
const PersonList = compose(
                        withSwapiService(mapPersonMethodsToProps), // вызываем withSwapiService, он принимает сперва в качестве аргумента mapPersonMethodsToProps
                        withData, // и затем функция, которую мы возвращаем вызывается на самом компоненте, который мы получим из функции withData // withChildFunction - Это ItemList, у которого будут данные из функции getAllPeople// getAllPeople мы не получаем в явном виде, а получаем из контекста
                        withChildFunction(renderName)  //withChildFunction получает renderName
                    )(ItemList);   //затем оборачивает в компонент высшего порядка

const PlanetList = compose (
                        withSwapiService(mapPlanetMethodsToProps),
                        withData,
                        withChildFunction(renderName)
                    )(ItemList);

const StarshipList = compose (
                        withSwapiService(mapStarshipMethodsToProps),
                        withData,
                        withChildFunction(renderModelAndName)
                    )(ItemList);

export {
  PersonList,
  PlanetList,
  StarshipList
};
