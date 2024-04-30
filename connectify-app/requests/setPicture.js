const {api_url} = require("../constants");
import AsyncStorage from "@react-native-async-storage/async-storage";

async function setPicture(picture) {
    try {
        const token = await AsyncStorage.getItem("token");
        const data = {
            "picture": picture,
            "token": token
        }
        await fetch(
            `${api_url}:8080/users/setpic`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        return;

    } catch (error) {
        console.error(error + " a");
    }
    return null;
}

module.exports = { setPicture }