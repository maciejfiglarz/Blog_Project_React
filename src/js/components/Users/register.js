import React from 'react'
import {Button, ButtonSocial} from '../../containers/buttons'
import {userRegister} from './../../services/user_services.js'
import {NavLink} from 'react-router-dom'
import {Input} from './../../containers/form'

class Register extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        userRegister(this.state);


    }

    render() {

        return (
            <form className="form-default container-small" onSubmit={this.onSubmit}>
                {/* <h1 className="form-default__h1">Załóż konto</h1> */}
                <ButtonSocial label="Zaloguj się przez FB" size="normal" align="center"/>
                <div className="form-default__item">
                    <div className="form-default__label">
                        Nick:</div>
                    <Input
                        onChange={this.onChange}
                        value={this.state.username}
                        type="text"
                        name="username"/>
                </div>
                <div className="form-default__item">
                    <div className="form-default__label">
                        Email:
                    </div>
                    <Input
                        onChange={this.onChange}
                        value={this.state.email}
                        type="email"
                        name="email"/>
                </div>
                <div className="form-default__item">
                    <div className="form-default__label">
                        Hasło:</div>
                    <Input
                        onChange={this.onChange}
                        value={this.state.password}
                        type="password"
                        name="password"/>
                </div>
                <div className="form-default__item">
                    <div className="form-default__label">
                        Powtórz hasło:</div>
                    <Input
                        onChange={this.onChange}
                        value={this.state.passwordConfirmation}
                        type="password"
                        name="passwordConfirmation"/>
                </div>
                <Button
                    label={"Założ konto"}
                    className="btn-primary"
                    align="center"
                    size="normal"/>
                    <div className="form-default">
                    Posiadasz już konto? Możesz zalogować się tutaj <NavLink to="/logowanie">tutaj.</NavLink>
            </div>
            </form>
            
        )
    }

}

export default Register;