import {Alert, Image, TextInput, TouchableOpacity, View} from 'react-native';
import {icons} from "../constants";
import React, {useState} from "react";
import {usePathname, router} from "expo-router";

const SearchBar = ({initialQuery}) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || "");

    return (
        <View className="w-full h-12 px-4 bg-black-100 rounded-xl border-2 border-amber-500 focus:border-green-200 flex items-center mt-2 mb-2 flex-row">
            <TextInput
                editable={true}
                multiline={false}
                numberOfLines={1}
                maxLength={32}
                onChangeText={text => setQuery(text)}
                placeholder={"Search a username!"}
                placeholderTextColor="grey"
                className="flex-1 font-psemibold text-base text-white"
            />
            <TouchableOpacity
                onPress={() => {
                    if (query === "")
                        return Alert.alert(
                            "Missing Query",
                            "Please input something to search results across database"
                        );

                    if (pathname.startsWith("/search")) router.setParams({ query });
                    else router.push("/search/" + query);
                }}
            >
                <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
};


export default SearchBar;
