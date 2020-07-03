import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component{
  
  buttons = [
    {
      name: 'all',
      label: 'All'
    },
    {
      name: 'active',
      label: 'Active'
    },
    {
      name: 'done',
      label: 'Done'
    }
  ];

  render(){

    const { onChangeFilter, typeFilter } = this.props;

    return (
      <div className="btn-group">
        {
          this.buttons.map(({name, label}) => {
            const statusClass = typeFilter === name ? 'btn-info': 'btn-outline-secondary';
            return (
              <button 
                type="button"
                className={`btn ${statusClass}`}
                key={name}
                onClick={() => onChangeFilter(name)}>{label}</button>
            )
          })
        }
      </div>
    );
  }
}

