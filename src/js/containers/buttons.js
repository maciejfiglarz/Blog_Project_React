import React from 'react';
import {Redirect} from 'react-router-dom'


const RegularButton = (props)=> <button className="button button-regular">Dodaj</button>;
const RegularSubmitButton = (props)=> <input type="submit" value={props.text} className="button button-regular"/>;

export {RegularButton,RegularSubmitButton};

// class Button extends React.Component {

//     state = {
//         redirect: false
//     }

//     setRedirect = () => {
//         this.setState({redirect: true})
//     }
//     renderRedirect = () => {

//         if (this.state.redirect) {
//             return <Redirect to={"/" + this.props.path}/>
//         }
//     }

//     render() {
//         const {className, label, align, type} = this.props;
//         let classNames = [className, align,type].join(" ");

//         return (

//             <button className={classNames}>
//                 {label
//                     ? label
//                     : ""}

//                 {/* {this.props.icon
//                     ? <i className={"fas " + this.props.icon}/>
//                     : ""} */}
//             </button>
//         )
//     }

// }

// class ButtonSocial extends React.Component {

//     render() {
//         const {label, type, size, align} = this.props;
//         let buttonSize = "";

//         switch (size) {
//             case "normal":
//                 buttonSize = "btn-social-connect btn-social-connect--facebook"
//                 break;
//             case "small":
//                 buttonSize = "btn-social-connect--small btn-social-connect--facebook"
//                 break;
//             default:
//                 buttonSize = "btn-social-connect btn-social-connect--facebook"
//         }
//         console.log('buttonSize',buttonSize);
//         let classNames = ["btn-social-connect", buttonSize, align].join(" ");

//         return (

//             <button className={classNames}>
//                 {label}
//             </button>
//         )
//     }
// }

