import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
//withData это компонент, который получает данные и отображает состояние в правильном виде. То есть если данные все еще загружаются, то тогда отображается спиннер, если загружены - отображаются данные
const withData = (View) => { //передаем сюда аргумент View// передаем сюда функцию getData в виде явного аргумента, а не в свойствах, эта функция будет получать данные// вместо этого мы теперь получаем getData из пропс, больше не получаем в явном виде
    return class extends Component {
        
        state = {
            data: null,
            loading: true,
            error: false
        };

        componentDidUpdate(prevProps) { //получает prevProps
            if (this.props.getData !== prevProps.getData) { //если наша текущая функция this.props.getData не такая же как prevProps
                this.update(); //обновляем компонент
            }
        }

        componentDidMount() {
            this.update();
        }

        update() {
            this.setState( {
                loading: true,
                error: false
            });

            this.props.getData()//этот компонент получает функцию getData из props
                .then((data) => { //получаем промис
                    this.setState({
                        data, //затем этот компонент будет получать данные из функции, которая пришла к нему извне, устанавливать эти данные в качестве своего стэйта, а затем отрисовывать
                        loading: false
                    });
                })
                .catch(() => {
                    this.setState({
                        error: true,
                        loading: false
                    });
                });
            }

        render() {
            const { data, loading, error } = this.state; //достаем список людей из стейта

            if (loading) {
                return <Spinner />;
            }

            if (error) {
                return <ErrorIndicator/>;
            }

            return <View {...this.props} data={data} />; //отдаем View
        }
    };
};

export default withData;
