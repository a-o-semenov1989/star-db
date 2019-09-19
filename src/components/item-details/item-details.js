import React, { Component } from 'react';

import ErrorButton from '../error-button/error-button';

import './item-details.css';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{ item[field] }</span>
    </li>
  );
};

export {
  Record
};

export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null
  };

  componentDidMount() { //первый раз вызываем функцию updatePerson после инициализации
    this.updateItem();
  }

  componentDidUpdate(prevProps) { //получаем prevProps //обязательно обернуть код в условие, надо сравнить. Потому что иначе setState сам по себе приведет к тому компонент обновится и Реакт вызовет componentDidUpdate, поскольку стейт обновился и если здесь не будет условия, начнется цикл обновления персонажа и заново вызовется все по безконечному циклу
    if (this.props.itemId !== prevProps.itemId ||
        this.props.getData !== prevProps.getData || //обновляемся теперь не только когда айди изменился, но и когда функция getData стала другой
        this.props.getImageUrl !== prevProps.getImageUrl )  {
        this.updateItem();
    }
  }

  updateItem() { //этот компонент получает айди персонажа из своих пропс //personId в самом начале может быть null, пока пользователь никого не выбрал мы ничего не будем делать
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item)
        });
      });
  }

  render() {

    const { item, image } = this.state;
    if (!item) {
      return <span>Select a item from a list</span>;
    }

    const { name } = item;

    return (
      <div className="item-details card">
        <img className="item-image"
          src={image}
          alt="item"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}
