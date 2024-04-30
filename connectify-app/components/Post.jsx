import React from 'react';

import {Image, Text, TouchableOpacity, View} from 'react-native';
import {images} from "../constants";
import IconButton from "./IconButton";
import {likePost} from "../requests/likePost";
import {router} from "expo-router";
import {Icon} from "react-native-elements";
import {useGlobalContext} from "../context/Provider";

const Post = ({postObject, deleteFunc}) => {
    const id = postObject.id;
    const content = postObject.content;
    const createdAt = postObject.createdAt;
    const authorId = postObject.userId;
    const image = postObject.imageUrl;
    const authorName = postObject.authorName;
    const authorPicture = postObject.authorProfile === null ? images.profilePic : {uri: postObject.authorProfile};
    const likes = postObject.likes;
    const {user} = useGlobalContext();

    const redirectToProfile = () => {
        router.push("/profile/" + authorName);
    }

    return (
        <View className="items-center">
            <View className="bg-black-200 w-[90vw] mb-3">

                <TouchableOpacity onPress={redirectToProfile}>
                    <View className="flex-row mx-1 py-1 my-2">
                        <Image
                            style={{
                                height: 45,
                                width: 45,
                                borderRadius:150,
                            }}
                            source={authorPicture}/>
                        <View className="mx-2">
                            <Text className="text-white font-pregular">{authorName}</Text>
                            <Text className="text-gray-300 font-plight">{createdAt}</Text>
                        </View>
                        {
                            authorId == user.id ? <View className="absolute items-end w-full -mx-2">
                                <TouchableOpacity className="" onPress={() => {deleteFunc();}}>
                                    <Icon color="white" name={"delete"} />
                                </TouchableOpacity>
                            </View> : <View></ View>
                        }
                    </View>
                </TouchableOpacity>

                <View>
                    <Image
                        source={{uri: image}}
                        className="w-[90vw] h-[67vw]"
                        resizeMode="cover"
                        />
                </View>

                <View className="px-1 mt-2">
                    <Text className="font-pregular text-white">{content}</Text>
                </View>

                <View className="flex-row m-auto">
                    <IconButton
                        valueList={likes}
                        color="red"
                        icon="favorite"
                        funcPress={async ()=> {await likePost(id)}}
                        incrementOnClick={true}/>
                </View>

            </View>
        </View>
    );
};

export default Post;