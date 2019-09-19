import React from 'react';
import PropTypes from 'prop-types';

import './row.css';
//этот компонент в качестве left и right может принимать любые свойства, которые можно отрендерить в jsx, он одинаково хорошо будет работать как со строками, так и с числами и с другими реакт элементами. В нашем коде мы передаем другие реакт элементы
const Row = ({ left, right }) => { //наш компонент-контейнер принимает два свойства, left и right и взависимости от их содержания отображает их слева и справа
  return (
        <div className="row mb2">
            <div className="col-md-6">
                {left}
            </div>
            <div className="col-md-6">
                {right}
            </div>
        </div>
  );
};

Row.propTypes = {   //так описали, поскольку это компонент-функция
    left: PropTypes.node, //PropTypes.node проверяет что соответствующий проперти это что-то, что можно отрендерить в jsx. В PropTypes описан еще один тип, который называется PropTypes.element, но он намного более узкий, он принимает только реакт элементы, хотя наш компонент может работать отлично и со строками и числами, поэтому мы здесь использовали node
    right: PropTypes.node
};

export default Row;
