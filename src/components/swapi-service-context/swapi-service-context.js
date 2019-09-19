import React from 'react';

const { //эта функция возвращает пару - Provider и Consumer, мы их сразу переименовываем
    Provider: SwapiServiceProvider,
    Consumer: SwapiServiceConsumer
} = React.createContext(); //Эта функция может принимать опциональный аргумент, это значение по умолчанию, если наш Consumer не сможет найти никакого Provider, то по он будет использоваться значение, которое мы сюда можем передать. В нашем приложении всегда присутствует значение, поэтому мы сюда ничего не передаем.

export {
    SwapiServiceProvider,
    SwapiServiceConsumer
};