import React from 'react';

import {Image, Text, TouchableOpacity, View} from 'react-native';
import {router} from "expo-router";

const ProfileCard = ({ user }) => {
    const profilePicture = user.profile_picture;
    const id = user.id;
    const username = user.username;

    const onPressed = () => {
        router.navigate("/profile/" + username);
    }

    return (
        <TouchableOpacity onPress={onPressed}>
            <View className="w-[90vw] bg-black-100 p-3 flex-row mb-3">
                <Image style={{
                    height: 80,
                    width: 80,
                    borderRadius:150,
                }} source={{ uri: profilePicture }}/>
                <View className="my-auto mx-5">
                    <Text className="text-3xl text-white font-psemibold">{username}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProfileCard;
