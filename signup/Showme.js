import { Image, Platform, Text, View, StyleSheet, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import pr from '../assets/progress4.png';
import { Button, TouchableOpacity } from 'react-native';
import { useTailwind } from "tailwind-rn/dist";
import { useFonts } from 'expo-font';


const Showme = () => {

    const navigation = useNavigation();

    const tw = useTailwind();
    const [Age, setAge] = React.useState("");
    const [buttonTitle, setButtonTitle] = useState("Men");
    const [FbuttonTitle, setFButtonTitle] = useState("Women");
    const route = useRoute();
    const [Male, setMale] = React.useState("Men");
    const [Female, setFemale] = React.useState("Women");






    let usernamea = route.params.Username
    let agea = route.params.Age
    let Gendera = route.params.Gender
    let countrya = route.params.country
    let statea = route.params.state
    let subregiona = route.params.subregion
    let numbera = route.params.number

    const Males = () => {

        navigation.navigate("Photo", {
            Age: agea,
            Username: usernamea,
            Gender: Gendera,
            Showme: Male,
            country: countrya,
            state: statea,
            subregion: subregiona,
            number: numbera
        });
    };

    const Females = () => {

        navigation.navigate("Photo", {
            Age: agea,
            Username: usernamea,
            Gender: Gendera,
            Showme: Female,
            country: countrya,
            state: statea,
            subregion: subregiona,
            number: numbera

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
                <View style={tw("items-center pt-1")}>

                    <Image source={pr} />

                    <Text style={styles.buttonText}>
                        Show Me ?{"\n"}

                    </Text>
                    <TouchableOpacity  >
                        <Text ></Text>
                    </TouchableOpacity>
                </View>

                <View style={tw("flex-1 items-center pt-1 pb-20")}>
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
                    <View style={tw("p-5")} />
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
        fontSize: 25,
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


export default Showme