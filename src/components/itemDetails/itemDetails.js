import React, {Component} from 'react';
import GotService from '../../services/gotService';
import Loader from '../loader/loader';
import './itemDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term"> {label} </span>
            <span> {item[field]} </span>
        </li>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {

    gotService = new GotService();

    state ={
        item : null,
        loading : true
    }

    componentDidMount(){
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId) {
            this.updateItem();
            this.setState({
                loading: true
            })
        }
    }

    updateItem  () {
        const {itemId, getItem} = this.props;
        if (!itemId) {
            return 
        }
        getItem(itemId)
        .then((item) => {
            this.setState({
                item,
                loading : false
            })
        })

    }

    render() {
        const {item, loading} =this.state
        if (!item) {
            return <span className='select-error'> Please  select a character</span>
        }

        const content = loading? <Loader/> : <View item ={item} children ={this.props.children}/>  
        
        return (
            <div className="char-details rounded">
                {content}
            </div>
            
        );
    }
}

const View = ({item, children}) => {
    const {name} = item;
    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, {item})
                })}
            </ul>
        </>
    )
}