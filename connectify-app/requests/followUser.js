const {api_url} = require("../constants");
import AsyncStorage from '@react-native-async-storage/async-storage';

async function followUser(id) {
    const token = await AsyncStorage.getItem('token');
    try {
        const data = {
            "followerToken": token,
            "followedID": id,
        }
        const response = await fetch(
            `${api_url}:8080/users/follow`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        return response;
    } catch (error) {
        console.error(error + " a");
    }
}

module.exports = { followUser }