import React, {useState} from 'react';

import {Alert, Image, ScrollView, StatusBar, Text} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../constants";
import FormField from "../../components/FormField";
import CustomBotton from "../../components/CustomButton";
import {router} from "expo-router";
import { createUser } from "../../requests/createUser";
import {useGlobalContext} from "../../context/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        username: "",
        mail: "",
        password: "",
    });
    const { setUser, setLoggedIn } = useGlobalContext();
    
    const submit = async () => {
        if (form.username === "" || form.mail === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setSubmitting(true);
        try {
            const result = await createUser(form.username, form.mail, form.password);
            const token = result["token"];
            await AsyncStorage.setItem('token', token);
            setUser(result);
            setLoggedIn(true);
            router.push("home");
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
                <FormField
                    text="Mail Address"
                    isTextHidden={false}
                    textChangeHandle={(e) => setForm({ ...form, mail: e })}/>
                <FormField
                    text="Username"
                    isTextHidden={false}
                    textChangeHandle={(e) => setForm({ ...form, username: e })}/>
                <FormField
                    text="Password"
                    isTextHidden={true}
                    textChangeHandle={(e) => setForm({ ...form, password: e })}/>

                <CustomBotton
                    title="Sign Up"
                    handlePress={() => {submit()}}
                    containerStyle="mt-6"
                    hasBackground={true}
                    isBoldFont={true}
                    isLoading={isSubmitting}
                />
                <CustomBotton
                    title="Have an account?"
                    handlePress={() => { router.push('/sign-in') }}
                    containerStyle="mt-6"
                    hasBackground={false}
                    isBoldFont={false}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
