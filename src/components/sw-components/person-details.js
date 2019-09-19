import React from 'react';
import ItemDetails, { Record } from '../item-details';
import { withSwapiService } from '../hoc-helpers';

const PersonDetails = (props) => { //благодаря тому что мы обернули PersonDetails в withSwapiService, у нас в пропс есть swapiService и мы можем его здесь получить и мы можем рассчитывать на то что оно всегда будет //примаем props вместо itemId, getData, getImageUrl благодаря mapMethodsToProps
    return (
        <ItemDetails {...props} /*благодаря тому что в mapMethodsToProps мы контролируем что получаем из swapiService и имена этих свойств идентичны (itemId, getData, getImageUrl), мы можем заменить их на пропс*/>
            <Record field="gender" label="Gender" />
            <Record field="eyeColor" label="Eye Color" />
        </ItemDetails>
    );
};
//Функция ниже: берем определенные методы из swapiService и присвоим их определенным свойствам в компоненте// Эта функция помогает понять какие методы из сервиса будут использоваться и для каких целей
const mapMethodsToProps = (swapiService) => { //функция принимает swapiService
    return { //возвращает обычный объект который будет использоваться как маппинг для свойств
        getData: swapiService.getPerson,
        getImageUrl: swapiService.getPersonImage
    }
};

export default withSwapiService(mapMethodsToProps)(PersonDetails); //оборачиваем PersonDetails в withSwapiService. Это означает что когда PersonDetails будет вызываться, withSwapiService позаботиться о том, чтобы в свойствах этого компонента (в пропс) обязательно было свойство swapiService
//consumer теперь находится в withSwapiService. Код нашего основного компонента не изменился, но теперь перед тем как его экспортировать мы просто обернули его в дополнительный компонент hoc
//передаем mapMethodsToProps в withSwapiService
//теперь вместо всего swapiService мы получаем itemId, getData, getImageUrl