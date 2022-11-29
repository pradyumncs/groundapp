import { View, Text, Image, Button, TouchableOpacity, ImageBackground, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import pr from '../assets/progresss.png';
import { Input } from "react-native-elements";
import { useFonts } from 'expo-font';
import { useTailwind } from "tailwind-rn";
import { StyleSheet } from 'react-native';
import useAuth from "../hooks/useAuth";

const Names = ({ navigation }) => {

    const [text, setText] = React.useState('.');
    const hasUnsavedChanges = Boolean(text);

    const tw = useTailwind();
    const [Username, setUsername] = React.useState("");

    const [buttonTitle, setButtonTitle] = useState("Continue");
    const { user } = useAuth();
    const route = useRoute();

    const Register = () => {
        navigation.navigate("Age", {
            Username: Username,
        });
    };


    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (!hasUnsavedChanges) {
                    // If we don't have unsaved changes, then we don't need to do anything
                    return;
                }

                // Prevent default behavior of leaving the screen
                e.preventDefault();

                // Prompt the user before leaving the screen
                Alert.alert(
                    'Discard changes?',
                    'You have unsaved changes. Are you sure to discard them and leave the screen?',
                    [
                        { text: "Don't leave", style: 'cancel', onPress: () => { } },
                        {
                            text: 'Discard',
                            style: 'destructive',
                            // If the user confirmed, then we dispatch the action we blocked earlier
                            // This will continue the action that had triggered the removal of the screen
                            onPress: () => navigation.navigate("Name")
                        },
                    ]
                );
            }),
        [navigation, hasUnsavedChanges]
    );





    const incompleteForm = !Username;

    const [fontsLoaded] = useFonts({
        'NexaBold': require('../assets/NexaBold.otf'),
    });
    return (
        <View style={tw("flex-1 ")}
        >
            <ImageBackground
                resizeMode="cover"
                style={tw("flex-1")}
                source={require("../assets/appbacc.png")}

            >
                <View style={tw("flex flex-col my-auto items-center bgimg bg-cover ")}>
                    <TextInput
                        value={text}
                        placeholder="Type something…"
                        onChangeText={setText}
                    />
                    <Image style={styles.titleimage} source={pr} />
                    <Text style={styles.buttonText}>
                        What's your  {"\n"}
                        Name?
                    </Text>
                    <Text style={styles.buttonTextsm}>You Wont be able to change this later</Text>


                    <Input
                        style={styles.input}
                        onChangeText={(Username) => setUsername(Username)}
                        value={Username}

                    />

                </View>

                <View style={tw("flex-1 items-center  pt-1 mb-10 ")}>
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




});

export default Names