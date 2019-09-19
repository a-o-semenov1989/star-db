import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from "../error-boundry";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";

import {
    PeoplePage,
    PlanetsPage,
    StarshipsPage,
    LoginPage,
    SecretPage} from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; //BrowserRouter сразу переименовываем в Router
import StarshipDetails from '../sw-components/starship-details';

export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
      this.setState({
          isLoggedIn: true
      });
    };

    onServiceChange = () => { //ивент листенер
        this.setState(({ swapiService }) => { //нам нужно знать предыдущий state, мы от него зависим //передаем сюда функцию, которая принимает наш текущий стэйт, точнее нам нужен только swapiService из этого state
            const Service = swapiService instanceof SwapiService ?  //наш новый сервис будет зависить от  того какой тип у нашего текущего сервиса
                                DummySwapiService : SwapiService;
            return {//возвращаем обновленную часть состояния
                swapiService: new Service() //пересоздаем объект и изменяем его с DummySwapiService на SwapiService и наоборот
            };
        });
    };

    render() {

        const { isLoggedIn } = this.state; //деструктурируем isLoggedIn из стэйта

    return ( //мы обернули все приложение в SwapiServiceProvider и теперь у всех компонентов внутри есть доступ к тому значению которое мы передаем value={this.swapiService} и для того чтобы получить это значение нужно использовать SwapiServiceConsumer
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService} >
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} /*передаем в качестве листенера onServiceChange в header*/ />
                <RandomPlanet />

                  <Switch>
                    <Route path="/"
                      render={() => <h2>Welcome to StarDB</h2>} /*используем рендер функцию для создания header2 с приветствием. exact по умолчанию true, следуя правилам jsx, поскольку мы не передаем значение*/
                      exact />
                    <Route path="/people/:id?" component={PeoplePage} /*Мы используем Route для того чтобы сконфигурировать какие именно компоненты будут отображаться в зависимости от того какой адрес вводит пользователь. Чтобы сконфигурировать Route, передаем два свойства, первое - path(то какой путь будет у этой страницы) и второе - component то какой именно компонент будет отображаться если наш url соответствует шаблону "/people"/ /people/:id? - знак вопроса обозначает что блок "/:id?" опционален, и при отсутствии будет отображаться просто /people/ */ />
                    <Route path="/planets" component={PlanetsPage} />
                    <Route path="/starships" exact component={StarshipsPage} />
                    <Route path="/starships/:id"
                            render={({ match /*В рендер функцию React Router передаст объект с 3 спец. параметрами (объектами, которые используются для роутинга): 1) match - детали о том как именно path="/starships/:id" совпал с тем конкретным адресом, который находится сейчас в строке браузера и вчастности в объекте match есть те параметры что мы передали в этот объект. 2) location содержит детальную информацию о текущем состоянии Router-a о текущем положении у текущей страницы, которая отображается 3)history - для того чтобы программно например перейти на другую страничку. это тот API который внутри себя использует Router для того чтобы организовать переходы между страницами*/}) => {
                                const { id } = match.params /*берем айди из из значения url из match.params*/;
                                return <StarshipDetails itemId={id} /*передаем айди в StarshipDetails для отображения на отдельной странице*/ />
                            }}/>

                    <Route
                        path="/login"
                        render={() => (
                            <LoginPage
                                isLoggedIn={isLoggedIn}
                                onLogin={this.onLogin}/>
                        )}/>

                    <Route
                        path="/secret"
                        render={() => (
                            <SecretPage isLoggedIn={isLoggedIn} />
                        )}/>

                    <Route render={() => <h2>Page not found</h2>} />
                  </Switch>

            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
