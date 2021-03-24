import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlok from '../rowBlok/rowBlok';


export default class BooksPage extends Component {

    gotService = new GotService();

    state ={
        selectedBook : null,
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
            selectedBook : id
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const bookList = (
            <ItemList 
                onItemSelected ={this.onItemSelected}
                getData ={this.gotService.getAllBooks}
                renderItem ={(item) => item.name}
            />
        );

        const bookDetails = (
            <ItemDetails itemId ={this.state.selectedBook} getItem = {this.gotService.getBook}>

                <Field field = 'numberOfPages' label = 'Number Of Pages' />
                <Field field = 'publisher' label = 'Publisherr' />
                <Field field = 'released' label = 'Released' />

            </ItemDetails>
        )

        return (
          <RowBlok left={bookList} rghit ={bookDetails}/>
        )
    }
}
