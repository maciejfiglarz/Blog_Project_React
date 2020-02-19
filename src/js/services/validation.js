import axios from 'axios';
import {BACKEND_URL} from './../constants/types'


const inDatabase = async(email, password) => {
    const url = `${BACKEND_URL}/users`;
    return await axios
        .get(url)
        .then(respond => respond.data[0])
        .then(respond => {

            if (respond.email == email && respond.password == password) {
                return true;
            } else {
                return false;
            }
        });

}

export const loginValidation = async(email, password) => {
    let errors = [];
    let checkInDatabase = await inDatabase(email, password);

    if (!email || !password) {
        errors.push('Pola email i hasło nie mogą być puste!');
    }
    if (!checkInDatabase) {
        errors.push('Podane hasło lub email jest nieprawidłowe!');
    }
    console.log('errors', errors);
    return errors;
}

export const addPostValidation = (props) => {
    console.log('props', props);
    const {title, temponaryFile, describe, source, confirmation} = props;
    let errors = [];
    if (title.length > 255) {
        errors.push({"title": "Tytuł to maksymalnie 255 znaków"});
    }
    if (!temponaryFile) {
        errors.push({"temponaryFile": "Nie wybrano żadnego materiału"});
    }
    if (describe.length > 600) {
        errors.push({"describe": "Opis nie może zawierać więcej niż 600 znaków"});
    }
    if (!confirmation) {
        errors.push({"confirmation": "Musisz potwierdzić regulamin"});
    }
    return errors;
}