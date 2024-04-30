import React, {useEffect, useState} from 'react';

import {FlatList, RefreshControl, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import Post from "../../components/Post";
import SearchBar from "../../components/SearchBar";
import {getExplorePosts} from "../../requests/getPost";

const Explore = () => {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        setRefreshing(true);
        let myData = await getExplorePosts();
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

    return (
        <SafeAreaView className="bg-primary h-full w-full">
            <StatusBar barStyle="light-content"/>
            <FlatList
                data={data}
                renderItem={({item}) => (
                    <Post postObject={item} key={item.id}/>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            />
        </SafeAreaView>
    );
};

export default Explore;
