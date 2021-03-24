import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import GotService from '../../services/gotService';
import HousesPage from '../houses-page/houses-page';
import BooksPage from '../books-page/books-page';
import {BrowserRouter as Router , Route} from 'react-router-dom';


import './app.css';


export default class  App  extends Component {

    gotService = new GotService();

    state ={
        onToggleRandom : true,
        error : false
    }

    componentDidCatch(){
        console.log('error');
        this.setState({
            error : true
        })
    }

    onToggleRandom = () => {
        this.setState({
            onToggleRandom: ! this.state.onToggleRandom
        })
    }
    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }
        return (
        
            <Router> 
                <div className ="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                { this.state.onToggleRandom ? <RandomChar/> : null  }
                            </Col>
                        </Row>
                        <div className ="toggle">
                            <button  className =" btn btn-info" 
                            onClick ={this.onToggleRandom}> Toggle Random  Character</button>
                        </div>
                        <Route path= '/character' component ={CharacterPage}/>
                        <Route path= '/houses' component ={HousesPage}/>
                        <Route path= '/books' component ={BooksPage}/>

                    
                    </Container>
                </div>
            </Router>
        );
    }
    
};