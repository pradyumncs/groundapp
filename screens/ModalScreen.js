import { useNavigation } from "@react-navigation/core";
import React, { useState, useLayoutEffect, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Platform,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";



const ModalScreen = () => {
    const tw = useTailwind();
    const navigation = useNavigation();
    const { user } = useAuth();
    const [image, setImage] = useState(null);
    const [age, setAge] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [job, setJob] = useState(null);
    const [buttonTitle, setButtonTitle] = useState("Continue");

    const incompleteForm = !image;

    if (!user.uid) {
        user.uid = user.user.uid
        console.log(user.uid)
    }
    else {
        console.log("bye")

    }




    const updateUserProfile = () => {
        setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            displayName: user.displayName,
            photoURL: image,
            job: job,
            age: age,
            timestamp: serverTimestamp(),
        })
            .then(() => {
                navigation.navigate("Home");
            })
            .catch((error) => {
                alert(error.message);
            });
    };


    return (
        <View style={tw("flex-1")}>

            <View style={tw("items-center pt-1")}>

                <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
                    Welcome, {user.displayName}!
                </Text>
                <Text style={tw("text-center p-4 font-bold text-red-400")}>
                    Step 1: The Profile Pic
                </Text>
                <TouchableOpacity style={[styles.selectButton]} >
                    <Text style={styles.buttonText}>Pick an image</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>


                <TouchableOpacity style={styles.uploadButton} >
                    <Text style={styles.buttonText}>Upload image</Text>
                </TouchableOpacity>
            </View>

            <View style={tw("flex-1 items-center pt-1 pb-20")}>
                <Text style={tw("text-center p-4 font-bold text-red-400")}>
                    Step 2: The Job
                </Text>
                <TextInput
                    value={job}
                    onChangeText={setJob}
                    style={tw("text-center text-xl pb-2")}
                    placeholder="Enter your occupation"
                />
                <Text style={tw("text-center p-4 font-bold text-red-400")}>
                    Step 3: The Age
                </Text>
                <TextInput
                    value={age}
                    onChangeText={setAge}
                    style={tw("text-center text-xl pb-3")}
                    placeholder="Enter your age"
                    maxLength={2}
                    keyboardType="numeric"
                />
            </View>

            <View style={tw("flex-1 items-center  pt-1 mb-10")}>
                <TouchableOpacity
                    disabled={incompleteForm}
                    style={[
                        tw("w-64 p-3 rounded-xl  absolute bottom-1 bg-red-400"),
                        incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
                    ]}
                    onPress={updateUserProfile}
                >
                    <Text style={tw("text-center text-white text-xl")}>
                        {buttonTitle}
                    </Text>
                </TouchableOpacity>

            </View>



        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#bbded6",
    },
    selectButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center",
    },
    uploadButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: "#FF5864",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: "center",
    },
    progressBarContainer: {
        marginTop: 20,
    },
    imageBox: {
        width: 300,
        height: 300,
    },
});
export default ModalScreen