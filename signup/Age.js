import { View, Text, Image, Button, TouchableOpacity, ImageBackground } from 'react-native';
import { Input } from "react-native-elements";
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import pr from '../assets/progress.png';
import { useTailwind } from "tailwind-rn";
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';

const Age = () => {
    const tw = useTailwind();
    const [Age, setAge] = React.useState("");
    const navigation = useNavigation();
    const [buttonTitle, setButtonTitle] = useState("Continue");
    const route = useRoute();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);



    var city;

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {

                setErrorMsg('Without your location we can not show users near your area');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            let z = await Location.getCurrentPositionAsync({});

            let address = await Location.reverseGeocodeAsync(location.coords)
            let ada = await Location.reverseGeocodeAsync(z.coords)


            city = (ada[0].city)
            setLocation(address);



        })();
    }, []);

    let text = '';

    let countrya = 'null';
    let statea = 'null';
    let subregiona = 'null';


    if (errorMsg) {
        text = errorMsg;

    } else if (location) {


        countrya = location[0].country
        subregiona = location[0].subregion
        statea = location[0].region


        //text = (location.city)
    }

    console.log(location)
    console.log(countrya)
    console.log(statea)
    console.log(subregiona)
    console.log("ageeee")


    const incompleteForm = !Age;

    let usernamea = route.params.Username
    console.log(usernamea)
    console.log(usernamea)

    const Register = () => {


        navigation.navigate("Gender", {
            Age: Age,
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
                        What's your Age? {"\n"}

                    </Text>
                    <Text style={styles.buttonTextsm}>You Wont be able to change this later</Text>


                    <Input
                        style={styles.input}
                        onChangeText={(Age) => setAge(Age.replace(/[^\d]/g, ''))}
                        value={Age}
                        maxLength={2}

                    />

                </View>

                <View style={tw("flex-1 items-center  pt-1 mb-10")}>
                    <TouchableOpacity
                        disabled={incompleteForm}
                        style={[
                            tw("w-64 p-3 rounded-xl  absolute bottom-1 bg-white"),
                            incompleteForm ? tw("bg-gray-400") : tw("bg-white"),
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

export default Age