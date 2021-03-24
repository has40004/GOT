import React, {Component} from 'react';
import GotService from '../../services/gotService';
import Loader from '../loader/loader';
import './itemList.css';
import propTypes from 'prop-types'
export default class ItemList extends Component {
    gotService = new GotService();

    state = {
        itemList: null
    }

    static defaultProps = {
        onItemSelected : () =>{}
    }
    
    static propTypes = {
        onItemSelected : propTypes.func
    }

    componentDidMount() {
        const{getData} = this.props 

        getData()
        .then((itemList) => {
            this.setState({
                itemList
            })
        })
    }
   

    renderItems (arr) {
        return arr.map((item) => {
            const {id} = item;

            const label = this.props.renderItem(item);
            return (

                <li  
                    key ={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                    >
                    {label}
                </li>
            )
        })
    }

    render() {
        const {itemList} =this.state;
        if (!itemList) {
            return (
                <div className="item-spiner " > 
                    <div className='spiner'>
                        <Loader /> 
                    </div>
                </div>
            ) 
        }

        const items = this.renderItems(itemList);
        return (
            <ul className="item-list list-group">
               {items}
            </ul>
        );
    }
}