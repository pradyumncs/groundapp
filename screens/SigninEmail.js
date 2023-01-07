import {
    View,
    Text,
    Button,
    ImageBackground,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
    Linking,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'

import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/core";
import { useTailwind } from "tailwind-rn";
import logo from '../appassets/logo.png';
import { db, firebase } from "../firebase";
import pbar from '../assets/loginbar.gif';


const SignInEmail = () => {
    const { onGoogleButtonPress, loading, loginUser } = useAuth()
    const navigation = useNavigation();
    const tw = useTailwind();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')





    return (

        <View style={tw("flex-1")}>




            <ImageBackground
                resizeMode="cover"
                style={tw("flex-1")}
                source={require("../assets/bac.png")}
            >


                <View style={tw("p-4")} />
                <View style={tw("flex items-center justify-center")}>
                    <Image style={tw("flex items-center justify-center h-32 w-32")} source={logo} />
                    <View style={tw("p-2")} />
                    <Text style={styles.buttonTextsm}>Login</Text>
                </View>

                <TouchableOpacity
                    style={tw(" flex items-center justify-center h-1/2 w-full")}
                >

                    <TextInput
                        style={styles.input}
                        onChangeText={(email) => setEmail(email)}
                        value={email}
                        placeholder="Email."
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={(password) => setPassword(password)}
                        value={password}
                        secureTextEntry={true}
                        placeholder="Password."
                    />

                    <View style={tw("p-4")} />

                    <TouchableOpacity style={styles.loginBtn}

                        onPress={() => loginUser(email, password)
                        }

                    >

                        <Text >LOGIN</Text>


                    </TouchableOpacity>

                </TouchableOpacity>
                <View style={tw(" items-center ")}>
                    <Image style={tw("flex items-center justify-center h-20 w-16")}
                        source={pbar} />
                </View>

                <View style={tw("absolute inset-x-0 bottom-0 h-32 items-center justify-center   ")}
                >
                    <Text style={styles.buttonTextli}>
                        By clicking "Sign in with Email" you agree with our Terms.
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
        width: 300,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#e9f5f8",

    },
    buttonText: {
        color: "#000000",
        fontSize: 35,

    },
    buttonTextli: {
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
        fontSize: 25,


    },
    titleimage: {

        resizeMode: 'cover',
        justifyContent: 'center',

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
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#e9f5f8",

    },



});
export default SignInEmail