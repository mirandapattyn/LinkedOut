import React, { Component } from 'react';
import axios from 'axios';
import './loginButtons.css';

class LoginButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
        }
    }

    onSignupClicked = (username, password) => {
        if (!username || !password) {
            console.log("err message empty");
            this.setState({
                error: "Missing username or password"
            })
        } else {
            this.setState({
                username: username,
                password: password
            });
            axios.post('/api/signup', {
                username: username,
                password: password
            })
                .then(response => this.setState({
                    userId: response.data,
                }));
        }
    };

    onLoginClicked = (username, password) => {
        if (!username || !password) {
            console.log("err message empty");
            this.setState({
                error: "Missing username or password"
            })
        } else {
            this.setState({
                username: username,
                password: password
            });
            axios.post('/api/login', {
                username: username,
                password: password
            })
                .then(response => this.setState({
                    userId: response.data,
                }));
        }
    };

    render() {
        let userName = React.createRef();
        let password = React.createRef();

        let errMessage;
        if (this.state.error) {
            errMessage = <h5 className="errorMessage">{this.state.error}</h5>
        }

        let successMessage;
        if (this.state.userId) {
            successMessage = <h5 className="successMessage">"Logged in!"</h5>
            errMessage = ""
        }
        
        return (
            <div className="LoginButtons">
                {errMessage}
                {successMessage}
                <form action="" className="login-form">
                    <label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            ref={(userName)}>
                        </input>
                    </label>
                    <label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            ref={(password)}>
                        </input>
                    </label>
                </form>
                <button 
                    className="btn btn-warning"
                    type="button"
                    onClick={() => {
                        this.onLoginClicked(userName.current.value, password.current.value);
                    }}>
                    Log In
                </button>
                <button 
                    className="btn btn-info"
                    type="button"
                    onClick={() => {
                        this.onSignupClicked(userName.current.value, password.current.value)
                    }}>
                    Sign Up
                </button>
            </div>
        );
    }
}

export default LoginButtons;