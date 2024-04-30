const {api_url} = require("../constants");
import AsyncStorage from '@react-native-async-storage/async-storage';

async function likePost(postID) {
    const token = await AsyncStorage.getItem('token');
    try {
        const data = {
            "postID": postID,
            "token": token,
        }
        await fetch(
            `${api_url}:8080/like`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    } catch (error) {
        console.error(error + " a");
    }
}

module.exports = { likePost }