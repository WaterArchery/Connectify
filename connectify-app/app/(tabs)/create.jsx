import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
    ActivityIndicator,
    Button, Dimensions,
    Image,
    StatusBar,
    Text, TextInput, TouchableOpacity,
    View,
} from "react-native";
import "react-native-get-random-values";
import {uploadImageAsync} from "../../lib/imageUpload";
import {SafeAreaView} from "react-native-safe-area-context";
import {Icon} from "react-native-elements";
import CustomBotton from "../../components/CustomButton";
import {createPost} from "../../requests/createPost";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";
import {images} from "../../constants";

export default class Create extends React.Component {

    state = {
        image: "",
        uploading: false,
        text: "",
    };

    handleRequest = async () => {
        const token = await AsyncStorage.getItem("token");
        const text = this.state.text;
        const image = this.state.image;
        this.setState({uploading: true});
        await createPost(token, image, text);
        this.setState({uploading: false});
        this.setState({image: ""});
        this.setState({text: ""});
        router.navigate('/home');
        alert("Post created successfully!");
    }

    render() {
        let { image } = this.state;
        return (
            <SafeAreaView className="bg-primary h-full items-center">
                <StatusBar barStyle="light-content"/>
                {!!image ?
                    (
                    <View className="w-full items-center">
                        <View className="flex-row w-full bg-black-100 py-3 mb-4">
                            <TouchableOpacity className="items-start" onPress={() => {}}>
                                <Icon color="white" size={32} name={"arrow-left"} />
                            </TouchableOpacity>
                            <View className="absolute w-full py-3 items-center">
                                <Text className="text-2xl text-white text-center font-pregular">New Post</Text>
                            </View>
                        </View>

                        <View className="m-5">
                            <CustomBotton
                                title="Share!"
                                handlePress={this.handleRequest}
                                containerStyle="mt-6 bg-blue-500"
                                hasBackground={true}
                                isBoldFont={true}
                                isLoading={false}
                            />
                        </View>

                        {this.renderImage()}

                        <View className="w-full mt-4">
                            <View className="h-[100px] w-full bg-black-100 px-1">
                                <TextInput
                                    multiline={true}
                                    numberOfLines={3}
                                    maxLength={128}
                                    onChangeText={this.handleTextChange}
                                    placeholder=" Enter a caption..."
                                    placeholderTextColor="white"
                                    className="font-pregular text-base text-white"
                                    returnKeyType={ 'done' }

                                />
                            </View>
                        </View>
                    </View>
                ) : (
                    <View>
                        <View className="w-[90vw] items-center">
                            <Image className="h-[100px]" style={{tintColor: "white"}} source={images.logo} resizeMode="contain"/>
                            <Image className="h-[350px] " source={images.landing_show_talents} resizeMode="contain"/>
                            <Text className="text-2xl text-white font-semibold text-center">
                                You can show your talents, hobbies and happy moments with Connectify. Share them now!
                            </Text>
                        </View>

                        <View className="mx-12 mt-6">
                            <Button onPress={this._takePhoto} title="Take a photo" />
                        </View>
                        <View className="mx-12 mt-6">
                            <Button onPress={this._pickImage} title="Pick an image from camera roll"/>
                        </View>
                    </View>
                )}
                {this.uploadingIndicator()}
            </SafeAreaView>
        );
    }

    handleTextChange = (formText) => {
        this.setState({text: formText});

    }

    uploadingIndicator = () => {
        if (this.state.uploading) {
            return (
                <View className="items-center justify-center content-center bg-gray-300">
                    <ActivityIndicator color="#fff" animating size="large" />
                </View>
            );
        }
    };

    renderImage = () => {
        let { image } = this.state;
        if (!image) {
            return;
        }
        const dimensions = Dimensions.get('window');
        const imageHeight = Math.round(dimensions.width * 8 / 10);
        return (
            <View className="items-center w-full">
                <Image source={{ uri: image }} style={{ width: imageHeight, height: imageHeight }} />
            </View>
        );
    };

    _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this._handleImagePicked(pickerResult);
    };

    _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async (pickerResult) => {
        try {
            this.setState({ uploading: true });
            if (!pickerResult.cancelled) {
                const uploadUrl = await uploadImageAsync(pickerResult.assets[0].uri);
                this.setState({ image: uploadUrl });
            }
        } catch (e) {
            console.log(e);
            alert("Upload failed!");
        } finally {
            this.setState({ uploading: false });
        }
    };

}


