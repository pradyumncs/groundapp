import { View, Text, Image, Button, TouchableOpacity, ImageBackground } from 'react-native';
import { Input } from "react-native-elements";
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import pr from '../assets/progress.png';
import { useTailwind } from "tailwind-rn";
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';

const Number = () => {
    const tw = useTailwind();
    const [Number, setNumber] = React.useState("");
    const navigation = useNavigation();
    const [buttonTitle, setButtonTitle] = useState("Next");
    const route = useRoute();





    const incompleteForm = !Number;



    let text = '';

    let usernamea = route.params.Username
    let agea = route.params.Age
    let countrya = route.params.country
    let statea = route.params.state
    let subregiona = route.params.subregion






    const Register = () => {


        navigation.navigate("Gender", {
            Age: agea,
            Num: Number,
            Username: usernamea,
            country: countrya,
            state: statea,
            subregion: subregiona,
        });
    };

    const [fontsLoaded] = useFonts({
        'NexaBold': require('../assets/NexaBold.otf'),
    });






    return (
        <View style={tw("flex-1")}>
            <ImageBackground
                resizeMode="cover"
                style={tw("flex-1")}
                source={require("../assets/appbacc.png")}
            >
                <View style={tw("flex flex-col my-auto items-center bgimg bg-cover")}>

                    <Image source={pr} />
                    <Text style={styles.buttonText}>
                        What's your Number? {"\n"}

                    </Text>
                    <Text style={styles.buttonTextsm}>Your Number will be displayed to premium users . You can also skip this option</Text>


                    <Input
                        style={styles.input}
                        onChangeText={(Number) => setNumber(Number.replace(/[^\d]/g, ''))}
                        type='tel'
                        value={Number}
                        maxLength={14}

                    />

                </View>

                <View style={tw("flex-1 items-center  pt-1 mb-10")}>
                    <TouchableOpacity

                        style={[
                            tw("w-64 p-3 rounded-xl  absolute bottom-1 bg-white"),
                            incompleteForm ? tw("bg-white") : tw("bg-white"),
                            styles.shadow,
                        ]}
                        onPress={Register}
                    >
                        <Text style={tw("text-center text-black text-xl")}>
                            {buttonTitle}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>

    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#e9f5f8",

    },
    buttonText: {
        color: "#000000",
        fontSize: 35,
        fontFamily: 'NexaBold',
    },
    buttonTextsm: {
        color: "#000000",
        fontSize: 15,
        padding: 10,
        fontFamily: 'NexaBold',
    },

    shadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 8.65,

        elevation: 8,
    },


});

export default Number