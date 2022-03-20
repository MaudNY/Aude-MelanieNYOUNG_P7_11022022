import authApi from "../api/auth";

export const users =
    authApi.get('/users')
        .then(users => {

            return users;
        })
        .catch(error => {
            console.log(error);
        });