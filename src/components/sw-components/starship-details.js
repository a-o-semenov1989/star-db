import React from 'react';
import ItemDetails, { Record } from '../item-details';
import { withSwapiService } from '../hoc-helpers';

const StarshipDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record field="model" label="Model" />
            <Record field="length" label="Length" />
            <Record field="costInCredits" label="Cost" />
        </ItemDetails>
    );
};
//Функция ниже: берем определенные методы из swapiService и присвоим их определенным свойствам в компоненте// Эта функция помогает понять какие методы из сервиса будут использоваться и для каких целей
const mapMethodsToProps = (swapiService) => { //функция принимает swapiService
    return { //возвращает обычный объект который будет использоваться как маппинг для свойств
        getData: swapiService.getStarship,
        getImageUrl: swapiService.getStarshipImage
    }
};

export default withSwapiService(mapMethodsToProps)(StarshipDetails);
