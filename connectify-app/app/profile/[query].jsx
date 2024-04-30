import React, {useEffect, useState} from 'react';

import {ActivityIndicator, Button, FlatList, Image, RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import {router, useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {getProfile} from "../../requests/getUser";
import Post from "../../components/Post";
import {useGlobalContext} from "../../context/Provider";
import {followUser} from "../../requests/followUser";
import {Icon} from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import {uploadImageAsync} from "../../lib/imageUpload";
import {setPicture} from "../../requests/setPicture";
import {deletePost} from "../../requests/deletePost";

const Profile = () => {
    const { query } = useLocalSearchParams();
    const [isLoading, setLoading] = useState(false);
    const [following, setFollowing] = useState(false);
    const [profileUser, setProfileUser] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [isUploading, setUploading] = useState(false);

    const [posts, setPosts] = useState([]);
    const { user, setLoggedIn, setUser } = useGlobalContext();

    useEffect(() => {
        setLoading(true);
        loadProfile().then(() => {
            setLoading(false);
        })
    }, []);

    const onPostDelete = (id) => {
        deletePost(id).then(() => {
            loadProfile();
        });
    }

    const loadProfile = async () => {
        const profileUser = await getProfile(query === undefined ? user.username : query);
        if (profileUser.followers !== null && profileUser.followers !== undefined) {
            profileUser.followers.forEach((element) => {
                if (element == user.id) {
                    setFollowing(true);
                }
            });
        }
        setProfileUser(profileUser);
        setPosts(profileUser.posts.reverse());
    };

    const logout = () => {
        AsyncStorage.removeItem("token");
        router.dismissAll();
        setLoggedIn(false);
        setUser(null);
        router.replace("");
    }

    const changeProfilePicture = () => {
        _pickImage();
    }

    const _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [3, 3],
        });

        _handleImagePicked(pickerResult);
    };

    const _handleImagePicked = async (pickerResult) => {
        try {
            setUploading(true);
            if (!pickerResult.cancelled) {
                const uploadUrl = await uploadImageAsync(pickerResult.assets[0].uri);
                console.log(uploadUrl);
                await setPicture(uploadUrl);
                await loadProfile();
            }
        } catch (e) {
            console.log(e);
            alert("Upload failed!");
        } finally {
            setUploading(false);
        }
    };


    const followPuttonPressed = async () => {
        followUser(profileUser.id);
        setFollowing(!following);
    }

    if (isLoading || profileUser === null || profileUser === undefined) {
        return (
            <SafeAreaView className="bg-primary h-full w-full items-center">
                <Text className="text-white">Loading please wait...</Text>
            </SafeAreaView>
        );
    }
    else {
        return (
            <SafeAreaView className="bg-primary h-full w-full items-center">
                { isUploading ?
                    <SafeAreaView><ActivityIndicator
                        color="#fff"
                        animating size="large"
                        className="absolute items-center"/></SafeAreaView>
                    : <View></View>}

                <View className="items-center w-full mb-6">
                    <TouchableOpacity
                        className="items-start absolute top-0 left-0"
                        onPress={() => {router.dismissAll(); router.navigate("home");}}>
                        <Icon color="white" size={52} name={"arrow-left"} />
                    </TouchableOpacity>
                    <View>
                        <Image
                            className="mt-4 w-[100px] h-[100px]"
                            style={{borderRadius: 100}}
                            source={{uri: profileUser.profilePicture}}/>
                    </View>
                </View>

                <View className="mb-4 flex-row w-full justify-between px-16">
                    <Text className="text-white text-2xl font-bold">{profileUser.username}</Text>
                    <View className="">
                        <View className="w-full">
                            <Text className="text-gray-200 text-base font-pregular text-right">Followers</Text>
                            <Text className="text-gray-200 text-base font-psemibold text-right">{profileUser.followers.length !== undefined ? profileUser.followers.length : 0}</Text>
                        </View>
                    </View>
                </View>
                {
                    user.id == profileUser.id ?
                        <View className="flex-row p-3 justify-between w-full">
                            <Button title={"Change Profile Picture"} onPress={changeProfilePicture}/>
                            <Button title={"Log Out"} onPress={logout}/>
                        </View> :
                        <View>
                            <Text className="p-3">
                                <Button title={following ? "Unfollow!" : "Follow!"} onPress={followPuttonPressed}/>
                            </Text>
                        </View>
                }
                <FlatList
                    data={posts}
                    renderItem={({item}) => (
                        <Post postObject={item} deleteFunc={() => {onPostDelete(item.id);}}/>
                    )}
                    ListEmptyComponent={() => (
                        <Text className="text-white">This user didn't post anything :(</Text>
                    )}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadProfile}/>}
                />

            </SafeAreaView>
        );
    }
};

export default Profile;