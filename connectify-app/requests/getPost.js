const {api_url} = require("../constants");
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getOwnPosts() {
    const token = await AsyncStorage.getItem("token");
    if (token === null || token === undefined)
        return [];
    try {
        const data = {
            "token": token
        }
        const response = await fetch(
            `${api_url}:8080/posts/own`,{
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
    return [];
}

async function getFollowedPosts() {
    const token = await AsyncStorage.getItem("token");
    if (token === null || token === undefined)
        return [];
    try {
        const data = {
            "token": token
        }
        const response = await fetch(
            `${api_url}:8080/posts/followed`,{
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
    return [];
}

async function getExplorePosts() {
    const token = await AsyncStorage.getItem("token");
    if (token === null || token === undefined)
        return [];
    try {
        const response = await fetch(
            `${api_url}:8080/posts/explore`,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        return await response.json();

    } catch (error) {
        console.error(error);
    }
    return [];
}

module.exports = { getOwnPosts, getFollowedPosts, getExplorePosts }