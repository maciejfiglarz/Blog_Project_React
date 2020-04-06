import React, { useState } from "react";
import { PrimaryBtn } from "../../containers/buttons";
import { connect } from "react-redux";
import { userActions } from "./../../actions/users_action";

import { login } from "./../../services/user_services";
import { ProgressPlugin } from "webpack";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('sub');
    userActions.login({ email, password });
  };

  

  return (
    <div>

      <form className="form-default container-small" onSubmit={onSubmit}>
        <h1 className="form-default__h1">Zaloguj!</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="input__text-regular"
          type="email"
          name="email"
          placeholder="Email"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="input__text-regular"
          type="password"
          name="password"
          placeholder="Hasło"
        />

        <PrimaryBtn text={"Zaloguj"} />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return { user: state.user };
};

const actionCreators = {
  // login: userActions.login,
  // logout: userActions.logout,
};

export default connect(mapStateToProps, actionCreators)(Login);

// class Login extends React.Component {

//     state = {
//         email: '',
//         password: '',
//         errors: {},
//         isLoading: false,
//         redirect: false
//     }

//     onChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }
//     isValid = () => {}

//     onSubmit = (e) => {
//         e.preventDefault();
//         this.setState({
//             isLoading: true
//         }, () => {
//             // const valid = loginValidation(this.state.email, this.state.password);
//             // console.log(valid); this     .props     .login(this.state);
//             // this.setState({redirect: true}) this     .props     .history     .push('/');
//             this
//                 .props
//                 .login(this.state);

//         });

//     }
//     getSession = () => {
//         const url1 = `${BACKEND_URL}/index.php?model=getsession`;
//         const request1 = axios.get(url1);

//         request1.then(function (response) {
//             // console.log('sesja', response);
//             return true;
//         })
//             .catch(function (error) {
//                 // console.log(error);
//                 return false;
//             });
//     }
//     handleLogout = () => {
//         this.props.logout();
//     }

//     render() {

//         return (
//             <div>
//                 <form className="form-default container-small" onSubmit={this.onSubmit}>
//                     <h1 className="form-default__h1">Sign up!</h1>

//                     <input
//                         onChange={this.onChange}
//                         value={this.state.email}
//                         type="text"
//                         name="email"
//                         placeholder="Email"/>

//                     <input
//                         onChange={this.onChange}
//                         value={this.state.password}
//                         type="password"
//                         name="password"
//                         placeholder="Password"/>

//                     <Button label={"Sing in"} icon={"basket"}/>
//                 </form>
//                 <button onClick={this.getSession}>seesion</button>
//                 <button onClick={this.handleLogout}>logout</button>

//             </div>
//         )
//     }

// }
// const mapStateToProps = (state) => {
//     return {user: state.user};
// };

// export default connect(mapStateToProps,{login,logout})(Login);
