import React, {useEffect, useState} from 'react';

import {Text, TouchableOpacity, View} from 'react-native';
import {Icon} from "react-native-elements";
import {useGlobalContext} from "../context/Provider";

const IconButton = ({icon, color, funcPress, incrementOnClick, valueList}) => {
    const [isPressed, setPressed] = useState(false);
    const [count, setCount] = useState(0);
    const { user } = useGlobalContext();

    useEffect(() => {
        if (valueList !== undefined && valueList !== null) {
            setCount(valueList.length);
            let bool = false;
            valueList.forEach((element) => {
                if (element == user.id) {
                    bool = true;
                }
            });
            setPressed(bool);
        }
    }, []);

    const onPress = () => {
        setPressed(!isPressed);
        funcPress();
        if (incrementOnClick) {
            if (isPressed)
                setCount(count - 1);
            else
                setCount(count + 1);
        }
    };

    return (
        <View className="flex-row p-2 space-x-1.5">
            <TouchableOpacity className="" onPress={onPress}>
                <Icon color={isPressed ? color : "white"} name={icon} />
            </TouchableOpacity>
            <Text className="text-white">{count}</Text>
        </View>
    );
};

export default IconButton;
