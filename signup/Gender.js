import { View, Text, Image, ImageBackground } from 'react-native';
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import pr from '../assets/progress3.png';
import { Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useTailwind } from "tailwind-rn";
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const Gender = () => {

    const navigation = useNavigation();

    const tw = useTailwind();
    const [Age, setAge] = React.useState("");
    const [buttonTitle, setButtonTitle] = useState("Male");
    const [FbuttonTitle, setFButtonTitle] = useState("Female");
    const route = useRoute();
    const [Male, setMale] = React.useState("Male");
    const [Female, setFemale] = React.useState("Female");




    const incompleteForm = !Age;

    let usernamea = route.params.Username
    let agea = route.params.Age
    let countrya = route.params.country
    let statea = route.params.state
    let subregiona = route.params.subregion
    let numbera = route.params.Num


    const Males = () => {

        navigation.navigate("Showme", {
            Age: agea,
            Username: usernamea,
            Gender: Male,
            country: countrya,
            state: statea,
            subregion: subregiona,
            number: numbera

        });
    };

    const Females = () => {

        navigation.navigate("Showme", {
            Age: agea,
            Username: usernamea,
            Gender: Female,
            number: numbera,
            country: countrya,
            state: statea,
            subregion: subregiona,
        });
    };




    const [fontsLoaded] = useFonts({
        'NexaBold': require('../assets/NexaBold.otf'),
    });


    console.log(countrya)
    console.log("countrya")
    return (
        <View style={tw("flex-1")}>
            <ImageBackground
                resizeMode="cover"
                style={tw("flex-1")}
                source={require("../assets/appbacc.png")}
            >
                <View style={tw("items-center pt-1")}>

                    <Image source={pr} />
                    <Text style={styles.buttonText}>
                        Your Gender ?{"\n"}

                    </Text>
                    <TouchableOpacity  >
                        <Text ></Text>
                    </TouchableOpacity>
                </View>

                <View style={tw("flex-1 items-center pt-1 pb-20")}>
                    <TouchableOpacity
                        value={Male} style={[tw("rounded-xl w-64 p-3 bottom-1 bg-white"),
                        styles.shadow]}
                        onPress={Males}>
                        <Text style={tw("text-center font-bold text-black text-xl")}>
                            {buttonTitle}
                        </Text>
                    </TouchableOpacity>
                    <Text

                        style={tw("text-center text-xl pb-2")}

                    />
                    <View style={tw("p-4")} />


                    <TouchableOpacity
                        value={Female} style={[tw("rounded-xl w-64 p-3 bottom-1 bg-white"),
                        styles.shadow]}
                        onPress={Females}>
                        <Text style={tw("text-center font-bold text-black text-xl")}>
                            {FbuttonTitle}
                        </Text>
                    </TouchableOpacity>
                    <Text

                        style={tw("text-center text-xl pb-3")}

                    />
                </View>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
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
        shadowRadius: 20.65,

        elevation: 8,
    },




});


export default Gender