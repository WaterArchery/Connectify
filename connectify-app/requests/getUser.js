const {api_url} = require("../constants");

async function getUserWithCreadiantels(username, password) {
    try {
        const data = {
            "username": username,
            "password": password
        }
        const response = await fetch(
            `${api_url}:8080/users/login`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        return await response.json();

    } catch (error) {
        console.error(error);
    }
    return null;
}

async function getUserWithtoken(token) {
    if (token === null || token === undefined)
        return null;
    try {
        const data = {
            "token": token
        }
        const response = await fetch(
            `${api_url}:8080/users/login`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        return await response.json();

    } catch (error) {
        console.error(error);
    }
    return null;
}

async function getProfile(name) {
    try {
        const response = await fetch(
            `${api_url}:8080/users/profile/${name}`,{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        return await response.json();

    } catch (error) {
        console.error(error);
    }
    return null;
}

async function searchUser(name) {
    try {
        const response = await fetch(
            `${api_url}:8080/users/search/${name}`,{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        return await response.json();

    } catch (error) {
        console.error(error);
    }
    return null;
}

module.exports = { getUserWithCreadiantels, getUserWithtoken, searchUser, getProfile }