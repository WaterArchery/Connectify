import React from 'react';

import {StatusBar, Text, View} from 'react-native';
import {Redirect, Stack} from "expo-router";
import {useGlobalContext} from "../../context/Provider";

const AuthLayout = () => {
    const { isLoading, isLoggedIn } = useGlobalContext();

    if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

    return (
        <Stack>
            <Stack.Screen
                name="sign-in"
                title="Sign in"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="sign-up"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    );
};

export default AuthLayout;
