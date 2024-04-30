import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {v4 as uuidv4} from "uuid";
import {getApps, initializeApp} from "firebase/app";
import {LogBox} from "react-native";
import {firebaseConfig} from "../constants/databaseInfo";


if (!getApps().length) {
    initializeApp(firebaseConfig);
}

LogBox.ignoreLogs([`Setting a timer for a long period`]);

async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuidv4());
    const result = await uploadBytes(fileRef, blob);
    blob.close();
    return await getDownloadURL(fileRef);
}

module.exports = { uploadImageAsync }