import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserList from './components/user_list';
import ActiveUser from './components/active_user';
import SearchInput from './components/search_input';
import SortByButtons from './components/sort_buttons';

import $ from 'jquery';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            Searchusers: [], //not sure abt this shit
            activeUser: {}
        };
    }

    componentDidMount() {
        //get json data from the generated file
        $.ajax({
            url: '../data.json',
            dataType: 'json',
            cache: false,
            success: function (users) {
                // random number for random active user
                var max = users.length,
                    rand = Math.floor(Math.random() * max);
                this.setState({users});
                this.setState({Searchusers: users});
                this.setState({activeUser: users[rand]});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    changeList(term) {
        term = term['term'].toLowerCase();
        var users = this.state.Searchusers;
        if(term == ''){
            console.log('aaaaaaaaaaa', users);
            this.setState({users});
        }
        var newList = [];
        for (var i = 0; i < users.length; i++) {
            if (users[i]['name'].toLowerCase().indexOf(term) > -1) {
                //push data into results array
                newList.push(users[i]);
            }
        }
        this.setState({users: newList});
    }

    render() {
        return (
            <div className="app container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <SearchInput onSearchTermChange={term => this.changeList({term})}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <SortByButtons users={this.state.users}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 col-md-3 col-lg-2">
                        <ActiveUser activeUser={this.state.activeUser}/>
                    </div>
                    <div className="col-sm-8 col-md-9 col-lg-10">
                        <UserList users={this.state.users} selectUser={activeUser => this.setState({activeUser})}/>
                    </div>
                </div>
            </div>
        );
    }
}

