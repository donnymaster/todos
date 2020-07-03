import React, { Component } from 'react';

import AppHeader from '../app-header/'; 
import SearchPanel from '../search-panel/';
import TodoList from '../todo-list/';
import ItemStatusFilter from '../item-status-filter/';
import ItemAddForm from '../item-add-from/';

import './app.css';

export default class App extends Component {

    constructor(props){
        super(props);

        this.maxId = 100;
        this.state = {
            todoData: [
                this.createItem('Drink Coffee'),
                this.createItem('Make Awesome App'),
                this.createItem('Drunks coffee')
            ],
            term: '',
            filter: 'all' // all, active, done
        }
    }

    searchItem = (id) => {
        return this.state.todoData.findIndex((el) => el.id === id);
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = this.searchItem(id);

            const newState = [ 
                ...todoData.slice(0, idx), 
                ...todoData.slice(idx + 1) 
            ];
             
            return {
                todoData: newState
            }
        });
    }

    createItem = (text) => {
        return {
            label: text,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    addItem = (todo) => {

        const newTodo = this.createItem(todo);

        this.setState(({ todoData }) => {
            return {
                todoData: [
                    ...todoData,
                    newTodo
                ]
            }
        });
    }

    onToggleImportant = (id) => {
        this.setState( ({ todoData }) =>{
            const newState = this.toogleProperty(todoData, id, 'important');
            
            return {
                todoData: newState
            }
        })
    }

    onToggleDone = (id) => {
        this.setState( ({ todoData }) =>{
            const newState = this.toogleProperty(todoData, id, 'done');
            
            return {
                todoData: newState
            }
        })
    }

    toogleProperty = (arr, id, property) => {

        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];

        const newItem = { ...oldItem, [property]: !oldItem[property] };

        return [ 
            ...arr.slice(0, idx), 
            newItem,
            ...arr.slice(idx + 1) 
        ];
    }

    search = (items, term) => {

        if(term.length === 0){
            return items;
        }

        term = term.toLowerCase();

        return items.filter( item => {
            return (item.label).toLowerCase().indexOf(term) > -1;
        });

    }

    changeQuery = event => {
        const term = event.target.value.toLowerCase();
        this.setState({
            term
        })
    }

    changeStatusFilter = filter => {
        this.setState({
            filter
        });
    }

    filter = (items, type) => {

        switch (type) {
            case 'all':
                return items;
                break;
            case 'active':
                return items.filter( item => !item.done);
                break;
            case 'done':
                return items.filter( item => item.done);
                break;
            default:
                return items;
                break;
        }
    }
 
    render(){

        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);

        const countDone = todoData.filter((el) => el.done).length;
        const countImportant = todoData.length - countDone;

        return (
            <div className="todo-app">
            <AppHeader toDo={ countImportant } done={ countDone } />
            <div className="top-panel d-flex">
                <SearchPanel onSearch={this.changeQuery}/>
                <ItemStatusFilter 
                    onChangeFilter={this.changeStatusFilter}
                    typeFilter={filter} />
            </div>
        
            <TodoList 
                todos={ visibleItems } 
                onDeleted={ this.deleteItem }
                onToggleDone={ this.onToggleDone }
                onToggleImportant={ this.onToggleImportant }

            />
            <ItemAddForm onAddItem={this.addItem} />
            </div>
        );
    }
};