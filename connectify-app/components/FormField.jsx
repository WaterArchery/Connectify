import React, {useState} from 'react';

import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {icons} from "../constants";

const FormField = ({text, isTextHidden, textChangeHandle}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className="w-[300px] h-16 px-4 bg-black-100 rounded-2xl border-2 border-amber-500 focus:border-green-200 flex flex-row items-center mt-2 mb-2">
        <TextInput
                editable={true}
                multiline={false}
                numberOfLines={1}
                maxLength={32}
                onChangeText={text => textChangeHandle(text)}
                placeholder={text}
                placeholderTextColor="grey"
                secureTextEntry={isTextHidden && !showPassword}
                className="flex-1 font-psemibold text-base text-white"
            />

            {isTextHidden === true && (
                <TouchableOpacity onPress={() => {setShowPassword(!showPassword)}}>
                    <Image
                        className="h-[30px]"
                        resizeMode="contain"
                        source={showPassword ? icons.eyeHide : icons.eye}/>
                </TouchableOpacity>
            )}
        </View>
    );
};


export default FormField;
