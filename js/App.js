import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserList from './components/user_list';
import ActiveUser from './components/active_user';

import $ from 'jquery';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
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
                this.setState({users});
                this.setState({activeUser: users[0]});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="container app">
                <div className="row">
                    <div className="col-sm-4 col-md-3 col-lg-2">
                        <div className="thumbnail">
                            <ActiveUser activeUser={this.state.activeUser} users={this.state.users} />
                        </div>
                    </div>
                    <div className="col-sm-8 col-md-9 col-lg-10">
                        <UserList users={this.state.users} selectUser={activeUser => this.setState({activeUser})} />
                    </div>
                </div>
            </div>
        );
    }
}

