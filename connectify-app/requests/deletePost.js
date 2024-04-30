const {api_url} = require("../constants");
import AsyncStorage from '@react-native-async-storage/async-storage';

async function deletePost(postID) {
    const token = await AsyncStorage.getItem('token');
    try {

        const data = {
            "postID": postID,
            "token": token
        }
        const response = await fetch(
            `${api_url}:8080/posts/delete`,{
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

module.exports = { deletePost }