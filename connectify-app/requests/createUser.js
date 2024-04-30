const {api_url} = require("../constants");

async function createUser(username, mail, password) {
    try {
        const data = {
            "username": username,
            "mail": mail,
            "password": password
        }
        const response = await fetch(
            `${api_url}:8080/users/create`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        return await response.json();

    } catch (error) {
        console.error(error + " a");
    }
    return null;
}

module.exports = { createUser }