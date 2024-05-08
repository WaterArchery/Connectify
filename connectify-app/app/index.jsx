import React from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Image, Text, ScrollView, StatusBar, View} from "react-native";
import {images} from "../constants";
import CustomButton from "../components/CustomButton";
import {Redirect, router} from "expo-router";
import {useGlobalContext} from "../context/Provider";

export default function App() {
    let currentText = "Gain memories from your journeys with";
    let currentImage = images.landing_memory;
    const { isLoading, isLoggedIn } = useGlobalContext();
    if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

    return (
        <SafeAreaView className="bg-primary">
            <ScrollView contentContainerStyle={{height: '100%'}}>
                <View className="items-center justify-center content-center">
                    <Image source={images.logo} className="h-[150px] w-full" tintColor="white" resizeMode="contain"/>
                    <View className="relative items-center">
                        <Image source={currentImage} className="max-w-[380px] h-[300px]" resizeMode="contain"/>
                        <Text className="text-3xl font-bold text-white text-center">
                            {currentText}
                            <Text className="text-secondary-200">Connectify</Text>
                        </Text>
                    </View>
                    <Text className="mt-12 text-sm font-pregular text-gray-100 text-center">Effortlessly upload,
                        share, and connect through photos.
                        Join now to share your world with ease and privacy.</Text>

                    <CustomButton
                        title="Join Now!"
                        handlePress={() => router.push('/sign-in')}
                        containerStyle="w-full mt-5 px-5"
                        hasBackground={true}
                        isBoldFont={true}
                    />

                    <StatusBar style="light"/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}