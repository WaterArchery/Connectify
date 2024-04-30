import React, {useState} from 'react';

import {Alert, Image, ScrollView, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../constants";
import FormField from "../../components/FormField";
import CustomBotton from "../../components/CustomButton";
import {router} from "expo-router";
import {getUserWithCreadiantels} from "../../requests/getUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useGlobalContext} from "../../context/Provider";

const SignIn = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [latestError, setLatestError] = useState("");
    const [errorColor, setErrorColor] = useState("");
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const { setUser } = useGlobalContext();

    const submit = async () => {
        if (form.username === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setSubmitting(true);
        try {
            setLatestError("Logging in please wait.");
            setErrorColor("text-amber-200");
            const result = await getUserWithCreadiantels(form.username, form.password);
            const mes = result["message"];
            if (mes.includes("successfully")) {
                setUser(result);
                console.log("token saved");
                const token = result["token"];
                await AsyncStorage.setItem('token', token);
                setLatestError("Logged in successfully.");
                setErrorColor("text-green-300");
                router.push("/home");
            }
            else {
                setLatestError(mes);
                setErrorColor("text-red-500");
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full items-center content-center justify-center">
            <ScrollView contentContainerStyle={{justifyContent: "center", alignItems: "center", minHeight: "85%"}}>
                <StatusBar barStyle="light-content"/>
                <Image source={images.logoSmall} className="h-[115px]" tintColor="white"/>
                <Text className="text-gray-100 font-psemibold mt-5">You can enter your credentials here</Text>
                { latestError !== "" ? <Text className={errorColor}>{latestError}</Text> : <Text></Text>}
                <FormField
                    text="Username"
                    isTextHidden={false}
                    textChangeHandle={(e) => setForm({ ...form, username: e })}/>
                <FormField
                    text="Password"
                    isTextHidden={true}
                    textChangeHandle={(e) => setForm({ ...form, password: e })}/>
                <CustomBotton
                    title="Log in"
                    handlePress={() => { submit() }}
                    containerStyle="mt-6"
                    hasBackground={true}
                    isBoldFont={true}
                />
                <CustomBotton
                    title="Don't have an account?"
                    handlePress={() => { router.push('/sign-up') }}
                    containerStyle="mt-6"
                    hasBackground={false}
                    isBoldFont={false}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
