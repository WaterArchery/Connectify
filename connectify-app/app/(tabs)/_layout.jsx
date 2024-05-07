import React from 'react';

import {Image, Text, View} from 'react-native';
import {Tabs} from "expo-router";
import Icons from "../../constants/icons";
import {useGlobalContext} from "../../context/Provider";

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className={"items-center content-center justify-center gap-1 "}>
            <Image source={icon} resizeMode="contain" tintColor={color} className="w-5 h-5"/>
            <Text className={focused ? 'font-psemibold' : 'font-pregular'} style={{color: color}}>{name}</Text>
        </View>
    )
}

const TabsLayout = () => {
    const { user } = useGlobalContext();

    return (
        <>
            <Tabs screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#FFA001",
                tabBarInactiveTintColor: "#CDCDE0",
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#161622",
                    borderTopWidth: 1,
                    borderTopColor: "#232533",
                    height: 94
                }
            }}>
                <Tabs.Screen
                    name="home"
                    options={{
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon icon={Icons.home} color={color} focused={focused} name="Home"/>
                        )
                    }}/>
                <Tabs.Screen
                    name="create"
                    options={{
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon icon={Icons.upload} color={color} focused={focused} name="Create"/>
                        )
                    }}/>
                <Tabs.Screen
                    name="explore"
                    options={{
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon icon={Icons.explore} color={color} focused={focused} name="Explore"/>
                        )
                    }}/>
                <Tabs.Screen
                    name="myprofile"
                    options={{
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon icon={Icons.profile} color={color} focused={focused} name="My Pofile"/>
                        )
                    }}/>
            </Tabs>
        </>
    );
};

export default TabsLayout;
