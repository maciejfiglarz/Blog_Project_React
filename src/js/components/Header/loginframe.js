import React from 'react'

import {Button, ButtonSocial} from '../../containers/buttons'
import {Input} from './../../containers/form'
import {NavLink} from 'react-router-dom'
import {login} from './../../services/user_services'

class LoginFrame extends React.Component {
    state = {
        email: '',
        password: ''
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        login(this.state);


    }
    render() {
        console.log('smallcomp', this.state);
        return (
            <div className="access-frame">
                <form onSubmit={this.onSubmit}>
                    <ButtonSocial label="Zaloguj się" align="center" type="login" size="small"/>
                    <div className="access-frame__item">
                        <div className="access-frame__label">
                            Email:
                        </div>
                        <div className="access-frame__input">
                            <Input
                                onChange={this.onChange}
                                value={this.state.email}
                                type="email"
                                name="email"/></div>
                    </div>
                    <div className="access-frame__item">
                        <div className="access-frame__label">
                            Hasło:
                        </div>
                        <div className="access-frame__input">
                            <Input
                                onChange={this.onChange}
                                value={this.state.password}
                                type="password"
                                name="password"/></div>
                    </div>
                    <Button label={"Zaloguj"} className="btn-primary" align={"center"}/>

                    <NavLink className="access-frame__link" to="/rejestracja">Załóż konto</NavLink>
                </form>
            </div>
        )
    }
}

export default LoginFrame;