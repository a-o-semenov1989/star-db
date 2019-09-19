import React, { Component } from 'react';

import ErrorIndicator from '../error-indicator/error-indicator';

export default class ErrorBoundry extends Component {

  state = {
    hasError: false
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() { //он не делает ничего, кроме как возвращать this.props.children. Этот компонент расчитывает получить один или несколько элементов и этот компонент отрендерит их точно в том виде, в котором он их получил

        if (this.state.hasError) { //если у на есть ошибки, мы не будем пытаться отрисовывать children, а вместо этого вернем ErrorIndicator
            return <ErrorIndicator/>
        }

        return this.props.children;
  }
}
