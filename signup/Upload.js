import { View, Text, Image, StyleSheet } from 'react-native';
import { Input } from "react-native-elements";
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
import * as Location from 'expo-location';
import { useFonts } from 'expo-font';

const Upload = () => {
    const tw = useTailwind();
    const [Username, setUsername] = React.useState("");
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const navigation = useNavigation();

    const incompleteForm = !image;
    const [Age, setAge] = React.useState("");
    const route = useRoute();
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [p, setp] = useState("");
    const [buttonTitle, setButtonTitle] = useState("Continue");
    const { user } = useAuth();
    const [done, setDone] = useState(null);
    const [Showed, setShowed] = useState(false)

    if (!user.uid) {
        user.uid = user.user.uid
        console.log(user.uid)
    }
    else {
        console.log("bye")

    }




    var city;
    var imageuria;
    var z;
    var numz;
    const [fontsLoaded] = useFonts({
        'NexaBold': require('../assets/NexaBold.otf'),
    });


    var items = Array(21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33);
    var a = items[Math.floor(Math.random() * items.length)];
    var age = String(a);
    console.log(age)

    var itemsnames = Array("Aadhavi", "Aanya", "Aarya", "Aashvi", "Alani", "Amara", "Amulya", "Aniya", "Anushka", "Aria", "Ayla", "Devina", "Divya", "Eesha", "Farida", "Imara", "Jasmine", "Jaya", "Jhansi", "Jivika", "Jiyana", "Kareena", "Kavya", "Khushi", "Kimaya", "Kiyana", "Lakshmi", "Lavanya", "Liya", "Mahi", "Maya", "Meera", "Mila", "Mirza", "Misha", "Myra", "Navi", "Navya", "Nevaeh", "Nidhi", "Nihira", "Nila", "Nirvi", "Nisha", "Nyra", "Prisha", "Pritha", "Priya", "Rahi", "Ranchi", "Ria", "Roja", "Ruhi", "Saanvi", "Sahara", "Saiya", "Sajani", "Samara", "Sana", "Sarika", "Satya", "Saumya", "Shaniya", "Shaurya", "Shivani", "Shivaya", "Shyla", "Sita", "Siya", "Sonia", "Suhasini", "Suri", "Surya", "Tashi", "Uma", "Veena", "Vera", "Zara", "Ziya", "Zoha", "Zoya", "Zunaira", "Namitha", "Shivani", "Isha", "Shyani Devi", "Divya", "Mansi", "Mazida", "Pooja", "Kajal", "Meena", "Sonam", "Buity", "Hina", "Shakshi", "Pooja", "Anita", "Neetu", "Anshu", "Kanika Kathuria", "Manju", "Shakshi", "Anita", "Reena", "Neha", "Khushboo", "Aasmin", "Jyoti", "Riya Masi", "Rekha", "Leelawati", "Isha", "Gulshan", "Priya Jain", "Pooja", "Rakhi", "Versha", "Sunita", "Nitu Kumari", "Vandana", "Roshni", "Parveen", "Versa", "Kavita", "Pooja", "Sarojani", "Nagina", "Tapas Das", "Priyanka", "Santna", "Khushbu", "Pooja", "Bobby", "Deeya Kumari", "Anjaliyo", "Anjali", "Champa Karketta", "Anshu", "Monika", "Rimmi ", "Aanamika ", "Chahat", "Manju", "Nagma Khatoon", "Pooja", "Sonam", "Koshal", "Laxmi", "Sandhya", "Poonam", "Sna", "Nikita Senger", "Layba Noor", "Iqra", "Salima", "Naziya Siddiqui", "Priti", "Kamni", "Sandhya", "Renu", "Priya", "Pooja", "Minakchi", "Ruby", "Farhana", "Sheetal", "Kalyani", "Anjali", "Priyanka", "Palak", "Babita", "Gurdeep", "Dhanwanti", "jhnah", "Vandana", "Gyatri", "Shehnaz", "Kajal", "Pooja", "Ranju", "Vidhi", "Pooja", "Jyoti");
    var na = itemsnames[Math.floor(Math.random() * itemsnames.length)];
    var displayName = String(na);
    console.log(displayName)


    var itemsnamesS = Array("Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahbubnagar", "Mancherial", "Medak", "Medchal", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal", "Hanamkonda", "Yadadri Bhuvanagiri");
    var di = itemsnamesS[Math.floor(Math.random() * itemsnamesS.length)];
    var SubRegion = String(di);
    console.log(SubRegion)

    var States = "Tamil Nadu"

    var Showme = "Men"

    var Country = "India"

    var gender = "Female"

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function numberid(length) {
        var result = '';
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


    const metadata = {
        contentType: 'image/png',
    };

    console.log();

    z = '00' + makeid(27)
    console.log(z)
    numz = '9' + numberid(9)

    console.log("hi")
    console.log(numz)
    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [7, 10],
            quality: 0.9

        })

        const source = { uri: result.uri };
        console.log(source);

        setImage(source);
        setp(result.uri);
        console.log(result.uri)
        global = result.uri
        console.log(global)
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


                    setDoc(doc(db, "users", z), {
                        id: z,
                        displayName: displayName,
                        Showme: Showme,
                        photoURL: imageuria,
                        gender: gender,
                        age: age,
                        Country: Country,
                        States: States,
                        SubRegion: SubRegion,
                        Number: numz,
                        timestamp: serverTimestamp(),
                    })
                        .then(() => {
                            console.log("done")
                            setDone("done");

                            navigation.navigate("Upload");
                        })
                        .catch((error) => {
                            alert(error.message);


                        });


                });




            }





        )







    }


    let text = 'Waiting..';
    if (done) {
        text = "done";


    } else if (location) {
        text = "waiting";
    }

    return (
        <View style={tw("flex-1 ")}>

            <View style={tw("items-center pt-1")}>

                <Image source={pr} />
                <Text >{text}</Text>
                <Text style={styles.buttonText}>
                    Add a Photo of You{"\n"}

                </Text>

            </View>

            <View style={tw("flex items-center justify-center h-1/2 w-full")}>
                <TouchableOpacity
                    //  onPress={() => navigation.goBack()}
                    style={tw("p-7")}
                >
                    <AntDesign name="pluscircle" size={50} color="black" onPress={pickImage} />
                </TouchableOpacity>

                <View style={styles.imageContainer}>
                    {image && <Image source={{ uri: image.uri }} style={{ width: 300, height: 400 }} />}

                    <TouchableOpacity style={styles.buttonTextsm} >

                        <Text> Please show your own Face </Text>
                    </TouchableOpacity>


                </View>

            </View>
            <View style={tw("flex-1 items-center  pt-1 mb-10")}>
                <TouchableOpacity

                    style={[
                        tw("w-64 p-3 rounded-xl  absolute bottom-1 bg-red-400"),
                        incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
                    ]}

                    onPress={handlesub}

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





});



export default Upload