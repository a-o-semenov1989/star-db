import React from 'react';
import { SwapiServiceConsumer } from "../swapi-service-context";
//этот компонент умеет доставать сервис из контекста и передать его в обернутый компонент. В наш компонент мы передаем функцию mapMethodsToProps, и вместо того чтобы передаваать весь сервис в компоненты, мы выбираем какие именно части сервиса мы хотим передать и под какими именами. Теперь независимо от того откуда взялся компонент, даже если мы не контролируем код этого компонента (например если компонент пришел из сторонней библиотеки), мы сможем адаптировать withSwapiService для того чтобы компонент получил свойство именно под тем именем, под которым он хочет это свойство получить
const withSwapiService = (mapMethodsToProps) => (Wrapped) => {  //создаем hoc, он принимает Wrapped// также принимаем mapMethodsToProps //функция, которая возвращает функцию и первая принимает mapMethodsToProps, а вторая - Wrapped

    return (props) => { //возвращает компонент-функцию// компонент-функция принимает props
        return (
            <SwapiServiceConsumer /*создаем Consumer, передаем в него функцию*/>
                {
                    (swapiService) => { //получаем swapiService
                        const serviceProps = mapMethodsToProps(swapiService); //после получения создаем serviceProps и получаем mapMethodsToProps. Вызываем функцию, которая умеет вызывать маппинг и передаем туда swapiService

                        return (
                            <Wrapped {...props} {...serviceProps}/> //возвращает Wrapped с теми же props, которые мы получили в hoc*///передаем сюда пропс полученные с помоцью serviceProps
                        )
                    }
                }
            </SwapiServiceConsumer>
        );
    }
};
//этот компонент hoc, который оборачивает нужный компонент в SwapiServiceConsumer, получает swapiService и устанавливает его на компоненте
export default withSwapiService;