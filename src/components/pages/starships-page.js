import React from 'react';
import { StarshipList } from '../sw-components';
import { withRouter } from 'react-router-dom'; //импортируем hoc из react-router-dom

const StarshipsPage = ({ history }) => { //из 3 объектов реакт роутер нам нужен только history и мы сразу достаем его из props
    return (
        <StarshipList
            onItemSelected={(id) => history.push(id)} /*получаем Id// пользователь перейдет на новую страницу, адрес которой будет /starships/{Id} для этого используем метод history.push. history это объект, который работает с историей браузера и когда мы говорим history.push мы как-бы добавляем новый элемент в историю браузера, соответственно переводим браузер на новую страницу*/ />
    );
};

export default withRouter(StarshipsPage); //оборачиваем, передаем StarshipsPage в hoc withRouter, благодаря чему withRouter передаст в StarshipsPage три объекта, которые использует React Router: match, location, history