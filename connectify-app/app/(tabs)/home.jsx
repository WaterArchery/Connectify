import React, {useEffect, useState} from 'react';

import {FlatList, RefreshControl, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import SearchBar from "../../components/SearchBar";
import {getFollowedPosts, getOwnPosts} from "../../requests/getPost";

import Post from "../../components/Post";
import {deletePost} from "../../requests/deletePost";

const Home = () => {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        setRefreshing(true);
        let myData = await getFollowedPosts();
        setData(myData.reverse());
        setRefreshing(false);
    }

    useEffect(() => {
        fetchData().then(() => {
            setRefreshing(false);
        });
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }

    const onPostDelete = (id) => {
        deletePost(id).then(() => {
            onRefresh();
        });
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <StatusBar barStyle="light-content"/>
            <FlatList
                data={data}
                renderItem={({item}) => (
                    <Post postObject={item} deleteFunc={() => {onPostDelete(item.id);}}/>
                )}
                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4 space-y-6">
                        <SearchBar />
                    </View>
                )}
                ListEmptyComponent={() => (
                    <Text className="text-white">Start following someone!</Text>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        title="Pull to refresh"
                        tintColor="#fff"
                        titleColor="#fff"
                    />
                }
            />
        </SafeAreaView>
    );
};

export default Home;
