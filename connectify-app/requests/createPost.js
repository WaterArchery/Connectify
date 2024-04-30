const {api_url} = require("../constants");

async function createPost(token, image, caption) {
    try {
        const data = {
            "caption": caption,
            "image": image,
            "token": token
        }
        const response = await fetch(
            `${api_url}:8080/posts/create`,{
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

module.exports = { createPost }