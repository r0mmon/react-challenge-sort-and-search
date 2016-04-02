/**
 * Created by gayane.gasparyan on 01/04/2016.
 */

import React from 'react';

const SortByButtons = ({users}) => {
    return (
        <div className="toolbar form-group">
            <button className="btn btn-default">
                <i className="icon fa fa-sort-alpha-asc"></i>
                <span>Sort by name</span>
            </button>
            <button className="btn btn-default">
                <i className="icon fa fa-sort-numeric-desc"></i>
                <span>Sort by age</span>
            </button>
        </div>
    );
};

export default SortByButtons;