import React from 'react';

import {Text, TouchableOpacity, View} from 'react-native';

const CustomButton = ({ title, handlePress, containerStyle, textStyle, isLoading, hasBackground, isBoldFont}) => {
    return (
        <View className="items-center">
            <TouchableOpacity
                className={" w-[250] min-h-[45px] justify-center items-center "
                    + (isLoading ? "opacity-50 " : "opacity-100 ")
                    + (hasBackground ? "bg-secondary rounded-xl " : "") + containerStyle}
                onPress={handlePress}
                activeOpacity={0.7}
            >
                <Text className={"text-white text-lg text-center " + (isBoldFont ? "font-psemibold" : "font-pregular")}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomButton;