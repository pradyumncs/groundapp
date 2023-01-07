import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import pr from '../assets/progress5.png';
import { Button, TouchableOpacity, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useTailwind } from "tailwind-rn";
import * as ImagePicker from 'expo-image-picker';
import { firebase, storage } from "../firebase";
import { async } from '@firebase/util';
import { Alert } from 'react-native';
import pbar from '../assets/zas.gif';
import useAuth from "../hooks/useAuth";
import { Foundation, Ionicons, AntDesign } from "@expo/vector-icons";
import { db } from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
    collection,
    doc,
    DocumentSnapshot,
    Firestore,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    where,
} from "@firebase/firestore";
import { useFonts } from 'expo-font';

const Photo = () => {

    const navigation = useNavigation();

    const tw = useTailwind();
    const [Age, setAge] = React.useState("");
    const route = useRoute();
    const [image, setImage] = useState(null);
    const [active, setActive] = React.useState("");
    const [uploading, setUploading] = useState(false);
    const [p, setp] = useState("");
    const [buttonTitle, setButtonTitle] = useState("Continue");
    const { user } = useAuth();

    const [Showed, setShowed] = useState(false)

    var city;



    if (!user.uid) {
        user.uid = user.user.uid
        console.log(user.uid)
    }
    else {
        console.log("bye")

    }





    console.log(user.uid)

    const incompleteForm = !active;

    let usernamea = route.params.Username
    let agea = route.params.Age
    let Gendera = route.params.Gender
    let Showmea = route.params.Showme
    let countrya = route.params.country
    let statea = route.params.state
    let subregiona = route.params.subregion
    let numbera = route.params.number

    console.log(numbera)
    console.log(numbera)
    console.log(numbera)
    const metadata = {
        contentType: 'image/png',
    };

    var global;
    var imageuria;

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8

        })

        const source = { uri: result.uri };
        console.log("p" + source);

        setImage(source);
        setp(result.uri);
        console.log(result.uri)
        global = result.uri
        console.log(global)

        setActive(global)

    };

    const handlesub = async () => {
        setShowed(true)

        const response = await fetch(image.uri)
        const blob = await response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);

        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
        console.log('filesss ' + image.uri);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            //   setDoc(doc(db, "images",), "userSwiped");
            //  let db = Firestore.firestore()
            //  //   db.collection("images").document().setData([filename])

        },




            (error) => {
                console.log(error.message)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    imageuria = String(downloadURL)


                    setDoc(doc(db, "users", user.uid), {
                        id: user.uid,
                        displayName: usernamea,
                        Showme: Showmea,
                        photoURL: imageuria,
                        gender: Gendera,
                        age: agea,
                        Country: countrya,
                        States: statea,
                        SubRegion: subregiona,
                        Number: numbera,
                        timestamp: serverTimestamp(),
                    })
                        .then(() => {
                            console.log("df")
                            navigation.navigate("BottomNavigation");
                        })
                        .catch((error) => {
                            alert(error.message);
                        });


                });




            }





        )




    }





    const uploadImage = async () => {

        setUploading(true);
        const response = await fetch(image.uri)
        const blob = await response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
        const ref = firebase.storage().ref().child(filename).put(blob);

        try {
            await ref;
            console.log(ref);

        }
        catch (e) {

        }

        setUploading(false);

        Alert.alert(
            'photo uploaded'

        );

        setImage(null);

    };

    const [fontsLoaded] = useFonts({
        'NexaBold': require('../assets/NexaBold.otf'),
    });



    //  let username = route.params.Username
    // let age = route.params.Age
    //  let Gender = route.params.Gender
    //  let Showme = route.params.Showme

    return (
        <View style={tw("flex-1")}>
            <View style={tw("items-center pt-1")}>

                <Image source={pr} />
                <Text style={styles.buttonText}>
                    Add a Photo of You{"\n"}

                </Text>

            </View>

            <View style={tw("flex items-center justify-center h-1/2 w-full")}>
                <TouchableOpacity
                    //  onPress={() => navigation.goBack()}
                    style={[tw("p-7"),
                    styles.shadow]}
                >
                    <AntDesign name="pluscircle" size={50} color="black" onPress={pickImage} />
                </TouchableOpacity>

                <View style={styles.imageContainer}>
                    {image && <Image source={{ uri: image.uri }} style={{ width: 250, height: 350 }} />}

                    <TouchableOpacity style={tw("items-center justify-center p-4 ")} >

                        <Text > Please show your own Face </Text>
                    </TouchableOpacity>


                </View>

            </View>
            <View style={tw("flex-1 items-center  pt-1 mb-10")}>
                <TouchableOpacity
                    disabled={incompleteForm}
                    style={[
                        tw("w-64 p-3 rounded-xl  absolute bottom-1 bg-red-400"),
                        incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
                        styles.shadow
                    ]}

                    onPress={handlesub}

                >

                    <Text style={tw("text-center text-white text-xl")}>
                        {buttonTitle}
                    </Text>

                </TouchableOpacity>
                {Showed ?
                    <Image source={pbar} /> : null
                }
            </View>

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
        shadowRadius: 9.65,

        elevation: 5,
    },




});

export default Photo