import React, {useEffect} from 'react';

import {Text, View} from 'react-native';
import {router} from "expo-router";
import {useGlobalContext} from "../../context/Provider";
import {SafeAreaView} from "react-native-safe-area-context";

const MyProfile = () => {
    const { user } = useGlobalContext();

    useEffect(() => {
        return () => {
            router.dismissAll();
            router.replace("profile/" + user.username);
        };
    }, [true]);

    return(
        <SafeAreaView>
            {router.replace("profile/" + user.username)}
        </SafeAreaView>
    )
};

export default MyProfile;
