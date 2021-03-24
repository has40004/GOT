import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlok from '../rowBlok/rowBlok';
import propTypes from 'prop-types';

export default class HousesPage extends Component {

    gotService = new GotService();

    state ={
        selectedHouse : null,
        error : false
    }
    
    static propTypes ={
        selectedHouse: propTypes.number
    }

    componentDidCatch(){
        console.log('error');
        this.setState({
            error : true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse : id
        })
    }

   

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const houseList = (
            <ItemList 
                onItemSelected ={this.onItemSelected}
                getData ={this.gotService.getAllHouses}
                renderItem ={(item) => item.name}
            />
        );

        const houseDetails = (
            <ItemDetails itemId ={this.state.selectedHouse} getItem = {this.gotService.getHouse}>

                <Field field = 'region' label = 'Region' />
                <Field field = 'words' label = 'Words' />
                <Field field = 'titles' label = 'Titles' />
                <Field field = 'coatOfArms' label = 'Coat Of Arms' />
                <Field field = 'overlord' label = 'Over lord' />
                <Field field = 'heir' label = 'Heir' />

            </ItemDetails>
        )

        return (
          <RowBlok left={houseList} rghit ={houseDetails}/>
        )
    }
}
