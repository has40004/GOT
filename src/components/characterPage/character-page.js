import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlok from '../rowBlok/rowBlok';

import './character-page.css';
export default class CharacterPage extends Component {

    gotService = new GotService();

    state ={
        selectedChar : 583,
        error : false
    }

    componentDidCatch(){
        console.log('error');
        this.setState({
            error : true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar : id
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const charList = (
            <ItemList 
                onItemSelected ={this.onItemSelected}
                getData ={this.gotService.getAllCharacters}
                renderItem ={(item) => `${item.name} (${item.gender})`}
            />
        );

        const charDetails = (
            <ItemDetails itemId ={this.state.selectedChar} getItem = {this.gotService.getCharacter}>
                <Field field = 'gender' label = 'Gender' />
                <Field field = 'born' label = 'Born' />
                <Field field = 'died' label = 'Died' />
                <Field field = 'culture' label = 'Culture' />


            </ItemDetails>
        )

        return (
          <RowBlok left={charList} rghit ={charDetails}/>
        )
    }
}
