import {
    View,
    Text,
    Button,
    ImageBackground,
    TouchableOpacity,
    Image,
    StyleSheet,
    Linking,
} from "react-native";
import React, { useLayoutEffect } from 'react'
import useAuth from '../hooks/useAuth'

import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/core";
import { useTailwind } from "tailwind-rn";
import logo from '../appassets/logo.png';
import title from '../appassets/title.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
    const { onGoogleButtonPress, loading } = useAuth()
    const navigation = useNavigation();
    const tw = useTailwind();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);




    return (

        <View style={tw("flex-1")}>




            <ImageBackground
                resizeMode="cover"
                style={tw("flex-1")}
                source={require("../assets/appbacch.png")}
            >
                <View style={tw("p-4")} />
                <View style={tw("p-4")} />
                <View style={tw("p-4")} />
                <View style={tw(" flex items-center justify-center")}>
                    <Image style={styles.titleimage} source={title} />
                </View>
                <View style={tw(" flex items-center justify-center")}>

                </View>
                <View style={tw("p-4")} />
                <View style={tw("p-4")} />

                <View
                    style={tw("items-center justify-center ")}

                >


                    <GoogleSigninButton
                        style={{ width: 300, height: 62 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Light}
                        onPress={onGoogleButtonPress}
                    />

                </View>
                <View style={tw("p-4")} />
                <View style={tw("p-4")} />
                <TouchableOpacity
                    style={[tw("flex items-center justify-center  ")

                    ]}
                >

                    <TouchableOpacity


                        style={[
                            tw("flex flex-row p-1"),

                            styles.loginBtn,
                            styles.shadow,
                        ]}


                        onPress={() => navigation.navigate("SigninEmail")}>
                        <MaterialCommunityIcons name="gmail" size={28} color="black" />
                        <Text >Login in with Email</Text>
                    </TouchableOpacity>

                    <View style={tw("p-4")} />

                    <View style={tw("p-4")} />


                </TouchableOpacity>


                <View style={tw("absolute inset-x-0 bottom-0 h-32 items-center justify-center   ")}
                >
                    <Text style={styles.buttonText}>
                        By clicking "Sign in with Google" you agree with our Terms.
                        Learn how we process your data in our {' '}
                        <Text
                            style={styles.hyperli}
                            onPress={() => { Linking.openURL('https://doc-hosting.flycricket.io/wealthy-privacy-policy/40c2379a-e568-46a5-8d36-6cda8e9c56e0/privacy') }}>
                            Privacy policy
                        </Text>
                        {"\n"} and {' '}
                        <Text
                            style={styles.hyperli}
                            onPress={() => { Linking.openURL('https://doc-hosting.flycricket.io/wealthy-terms-of-use/a213a6e7-dcc0-427f-b2ac-72124dbb1598/terms') }}>
                            Terms of Service.
                        </Text>

                    </Text>
                </View>


            </ImageBackground>

        </View >

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
        fontSize: 13,
        fontWeight: "bold",

    },
    hyperli: {
        color: "#000000",
        fontSize: 14,
        fontWeight: "bold",
        textDecorationLine: 'underline',
        fontStyle: 'italic',
    },
    buttonTextsm: {
        color: "#000000",
        fontSize: 15,
        padding: 10,
        fontFamily: 'NexaBold',
    },
    loginBtn: {
        width: 290,
        borderRadius: 2,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",

    },
    shadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 5,
            height: 9,
        },
        shadowOpacity: 2.27,
        shadowRadius: 20.65,

        elevation: 8,
    },
    titleimage: {

        resizeMode: 'cover',
        justifyContent: 'center',
        width: 200,
        height: 99,

    },




});

export default LoginScreen