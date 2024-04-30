import React, {useEffect, useState} from 'react';

import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {router, useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {searchUser} from "../../requests/getUser";
import ProfileCard from "../../components/ProfileCard";
import {Icon} from "react-native-elements";

const Search = () => {
    const { query } = useLocalSearchParams();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        searchUser(query).then((data) => {
            setUsers(data);
            setLoading(false);
        })
    }, []);

    const onBackPressed = () => {
        router.push("/home");
    }

    if (loading) {
        return (
            <SafeAreaView className="bg-primary h-full">
                <Text className="text-white text-3xl">LOADING</Text>
            </SafeAreaView>
        );
    }
    else {
        return (
            <SafeAreaView className="bg-primary h-full w-full items-center">
                <View className="flex-row justify-between w-full mb-6">
                    <TouchableOpacity className="items-start" onPress={onBackPressed}>
                        <Icon color="white" size={32} name={"arrow-left"} />
                    </TouchableOpacity>
                    <View>
                        <Text className="font-pmedium text-gray-100 text-sm">
                            Search Results
                        </Text>
                        <Text className="text-2xl font-psemibold text-white mt-1 text-right">
                            {query}
                        </Text>
                    </View>
                </View>

                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ProfileCard user={item}/>
                    )}
                    ListEmptyComponent={() => (
                        <Text className="text-white text-3xl text-center">There is no user with this name!</Text>
                    )}
                />
            </SafeAreaView>
        );
    }
};

export default Search;