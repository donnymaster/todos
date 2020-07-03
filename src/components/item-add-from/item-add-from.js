import React, { Component } from 'react';

import './item-add-from.css';

export default class ItemAddForm extends Component{

    state = {
        label: ''
    }

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value
        })
    }

    formSubmit = (event) => {
        
        event.preventDefault();

        if(this.state.label === ''){
            window.alert('Вы не ввели названия задачи!');
            return;
        }

        this.props.onAddItem(this.state.label);

        this.setState({
            label: ''
        });
    }

    render(){
        return (
            <form className="item-add-form d-flex"
                onSubmit={ this.formSubmit }>
                <input type="text"
                    className="form-control"
                    onChange={ this.onLabelChange }
                    value={ this.state.label }
                />
                <button
                    className="btn btn-outline-secondary"
                >Add item</button>
            </form>
        )
    }
}