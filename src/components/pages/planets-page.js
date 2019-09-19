import React, { Component } from 'react';
import { PlanetDetails, PlanetList } from '../sw-components';
import Row from '../row';

export default class PlanetsPage extends Component {

  state = {
    selectedItem: null
  };

  onItemSelected = (selectedItem) => { //листенер, который срабатывает когда пользователь нажимает на один из элементов списка PersonList. Устанавливаем текущий выбранный элемент (айди этого элемента) в selectedItem. Затем этот selectedItem используется чтобы отобразить PersonDetails
    this.setState({ selectedItem });
  };

  render() {
    const { selectedItem } = this.state;

    return (
      <Row
        left={<PlanetList onItemSelected={this.onItemSelected} />}
        right={<PlanetDetails itemId={selectedItem} />} />
    );
  }
}
