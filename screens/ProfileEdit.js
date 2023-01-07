import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, ImageBackground, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import { NavigationRouteContext, useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import { useTailwind } from 'tailwind-rn/dist';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNavigation from "./BottomNavigation";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from '../components/Header'
import bacg from '../assets/design2.png';
import { useFonts } from 'expo-font';
import Rectangle from '../assets/Rectangle.png'
import {
    collection,
    isGreaterThanOrEqualTo,
    doc,
    DocumentSnapshot,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    orderBy,
    setDoc,
    where,
    limit,
} from "@firebase/firestore";
import { db } from "../firebase";
import like from '../assets/like.png';
import Purchases from 'react-native-purchases';



const ProfileEdit = () => {
    const { user, signOut } = useAuth();
    const navigation = useNavigation();
    const tw = useTailwind();
    let imagea = ''
    const [UserInfo, setUserInfo] = useState(null);
    var z;
    var cc;
    let tt = ''
    var bb
    var aa
    const [location, setLocation] = useState(null);
    const [profiles, setProfiles] = useState([]);

    if (!user.uid) {
        user.uid = user.user.uid
        console.log(user.uid)
    }
    else {
        console.log("bye")

    }


    const [fontsLoaded] = useFonts({
        'SFBold': require('../assets/SF-Pro-Text-Semibold.otf'),
    });
    useEffect(() => {
        const magic = async () => {
            Purchases.setDebugLogsEnabled(true);


            const CustomerInfo = await Purchases.getCustomerInfo();
            if (typeof CustomerInfo.entitlements.active['pro'] !== "undefined") {
                console.log("user is pro")
            }
            else {
                console.log("user is not pro")
            }
        }
        magic();
    }, []);



    useEffect(() => {

        console.log("heyy")

        const docRefe = doc(db, "users", user.uid);

        onSnapshot(docRefe, (doc) => {
            setProfiles(

                doc.data()

            );
        })





        console.log(profiles)


    }, []);






    let text = JSON.stringify(profiles.photoURL);
    let age = JSON.stringify(profiles.age);
    console.log(text)
    console.log("hi")

    const likesT = () => {
        Toast.show({
            type: 'success',
            text1: 'Swipe right as many people as you want',
            text2: ' Unlimited likes👋'
        });
    }
    const BeelineT = () => {
        Toast.show({
            type: 'success',
            text1: 'See who already likes you',
            text2: ' Beeline 👧🧍👋'
        });
    }
    const FilterT = () => {
        Toast.show({
            type: 'success',
            text1: ' Apply as many filters as you want',
            text2: ' Advance Filter 🔍'
        });
    }
    const TravelT = () => {
        Toast.show({
            type: 'success',
            text1: 'Change your location to any country or place',
            text2: ' Travel Mode 🗺️'
        });
    }
    const AdsT = () => {
        Toast.show({
            type: 'success',
            text1: 'Premium users see No ads',
            text2: ' No ads 👋'
        });
    }
    const MatchT = () => {
        Toast.show({
            type: 'success',
            text1: 'Get Unlimited Matches all year',
            text2: ' Unlimited Matches 💖'
        });
    }
    const IncogonitoT = () => {
        Toast.show({
            type: 'success',
            text1: 'Only show people who swiped right on',
            text2: ' Icognito Mode 🕵️'
        });
    }
    const SuperSwipeT = () => {
        Toast.show({
            type: 'success',
            text1: 'Get 500 Instant SuperSwipes to get instant approval',
            text2: ' SuperSwipes ✨'
        });
    }

    return (

        <View style={tw("flex-1")}>
            <ScrollView>

                <ImageBackground resizeMode="stretch"
                    style={styles.img}>

                    <View style={tw("items-center pt-1")}>

                        <View style={tw("p-2")}></View>
                        <TouchableOpacity style={tw("items-center pt-1")}>
                            <Image
                                style={styles.setBorderRadius}
                                source={{ uri: profiles.photoURL }}
                            />

                        </TouchableOpacity>
                        <View style={tw("p-2")}></View>

                        <Text style={styles.buttonTextname}>
                            {profiles.displayName},

                        </Text>
                        <Text style={styles.buttonTextname}>
                            {profiles.age}
                        </Text>



                    </View>



                    <View style={tw("p-4")}></View>

                    <View style={tw("items-center ")}>

                        <ImageBackground style={styles.image} source={require("../assets/Rectangle.png")} >


                            <View style={tw("p-1")}></View>

                            <View style={tw("flex-col items-center justify-center p-1 ")}>
                                <TouchableOpacity


                                >
                                    <Text style={styles.buttonTextBold}>Premium</Text>
                                </TouchableOpacity>
                                <Text
                                    style={[
                                        tw("text-center"),

                                        styles.buttonText,
                                    ]}
                                >Unlock all of our features to be in complete control of your experience</Text>
                                <View style={tw("p-2")}></View>
                                <TouchableOpacity
                                    style={[tw("rounded-2xl w-32 p-2  bg-white"),
                                    styles.shadow]}
                                    onPress={() => navigation.navigate("Profile")}

                                >
                                    <Text style={tw("text-center text-black text-lg")}>
                                        Upgrade Now
                                    </Text>
                                </TouchableOpacity>
                            </View>



                        </ImageBackground>

                    </View>

                    <View style={tw("p-3")}></View>
                    <View style={tw("flex flex-row ")}>
                        <Text style={tw("text-center text-black text-lg font-semibold")}>What you get:</Text>
                        <View style={tw("pr-20 pb-4 pt-8")}></View>
                        <Text style={tw("text-center text-black text-lg font-semibold")}>Premium</Text>


                    </View>
                    <View style={tw("flex flex-row ")}>
                        <Text style={tw("text-center text-black text-lg font-semibold pr-2")}>Unlimited likes</Text>
                        <TouchableOpacity>
                            <Ionicons name="information-circle-outline" size={24} color="#a7a7a7" onPress={likesT} />
                        </TouchableOpacity>
                        <View style={tw("pr-20 pb-8")}></View>
                        <FontAwesome5 name="check" size={24} color="#FFA500" />



                    </View>
                    <View><Text style={styles.dashcolor}> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        - - - - - - - - - - - </Text></View>
                    <View style={tw("flex flex-row ")}>
                        <Text style={tw("text-center text-black text-lg font-semibold pr-16 ")}>Beeline</Text>
                        <TouchableOpacity>
                            <Ionicons name="information-circle-outline" size={24} color="#a7a7a7" onPress={BeelineT} />
                        </TouchableOpacity>
                        <View style={tw("pr-20 pb-8")}></View>
                        <FontAwesome5 name="check" size={24} color="#FFA500" />



                    </View>
                    <View><Text style={styles.dashcolor}> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        - - - - - - - - - - - </Text></View>
                    <View style={tw("flex flex-row ")}>

                        <Text style={tw("text-center text-black text-lg font-semibold pr-2")}>Advance Filter</Text>
                        <TouchableOpacity>
                            <Ionicons name="information-circle-outline" size={24} color="#a7a7a7" onPress={FilterT} />
                        </TouchableOpacity>
                        <View style={tw("pr-20 pb-8")}></View>
                        <FontAwesome5 name="check" size={24} color="#FFA500" />



                    </View>
                    <View><Text style={styles.dashcolor}> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        - - - - - - - - - - - </Text></View>
                    <View style={tw("flex flex-row ")}>
                        <Text style={tw("text-center text-black text-lg font-semibold pr-8")}>Incogonito</Text>
                        <TouchableOpacity>
                            <Ionicons name="information-circle-outline" size={24} color="#a7a7a7" onPress={IncogonitoT} />
                        </TouchableOpacity>
                        <View style={tw("pr-20 pb-8")}></View>
                        <FontAwesome5 name="check" size={24} color="#FFA500" />



                    </View>
                    <View><Text style={styles.dashcolor}> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        - - - - - - - - - - - </Text></View>
                    <View style={tw("flex flex-row ")}>
                        <Text style={tw("text-center text-black text-lg font-semibold pr-5")}>Travel Mode</Text>
                        <TouchableOpacity>
                            <Ionicons name="information-circle-outline" size={24} color="#a7a7a7" onPress={TravelT} />
                        </TouchableOpacity>
                        <View style={tw("pr-20 pb-8")}></View>
                        <FontAwesome5 name="check" size={24} color="#FFA500" />



                    </View>
                    <View><Text style={styles.dashcolor} > - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        - - - - - - - - - - - </Text></View>
                    <View style={tw("flex flex-row ")}>
                        <Text style={tw("text-center text-black text-lg font-semibold pr-2")}>Less / No Ads</Text>
                        <TouchableOpacity>
                            <Ionicons name="information-circle-outline" size={24} color="#a7a7a7" onPress={AdsT} />
                        </TouchableOpacity>
                        <View style={tw("pr-20 pb-8")}></View>
                        <FontAwesome5 name="check" size={24} color="#FFA500" />



                    </View>
                    <View><Text style={styles.dashcolor}> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        - - - - - - - - - - - </Text></View>
                    <View style={tw("flex flex-row ")}>
                        <Text style={tw("text-center text-black text-lg font-semibold pr-0")}>Unlimited match</Text>
                        <TouchableOpacity>
                            <Ionicons name="information-circle-outline" size={24} color="#a7a7a7" onPress={MatchT} />
                        </TouchableOpacity>
                        <View style={tw("pr-20 pb-8")}></View>
                        <FontAwesome5 name="check" size={24} color="#FFA500" />



                    </View>
                    <View><Text style={styles.dashcolor}> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        - - - - - - - - - - - </Text></View>
                    <View style={tw("flex flex-row ")}>
                        <Text style={tw("text-center text-black text-lg font-semibold pr-0")}>500 Instant Matches</Text>
                        <TouchableOpacity>
                            <Ionicons name="information-circle-outline" size={24} color="#a7a7a7" onPress={SuperSwipeT} />
                        </TouchableOpacity>
                        <View style={tw("pr-9 pb-8")}></View>
                        <FontAwesome5 name="check" size={24} color="#FFA500" />



                    </View>
                    <View><Text style={styles.dashcolor}> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        - - - - - - - - - - - </Text></View>
                    <Toast
                        position='bottom'
                        bottomOffset={30}
                        visibilityTime={3000}
                    />
                </ImageBackground>
            </ScrollView>
        </View >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    setFontSize: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    setBorder:
    {
        width: 170,  // Setting up image width. 
        height: 170,  // Setting up image height.  
        borderWidth: 3,  // Set border width.  
        borderColor: '#F44336',  // Set border Hex Color code here.   
    },
    setBorderRadius:
    {
        width: 170,  // Setting up image width. 
        height: 170,  // Setting up image height.  
        borderWidth: 4,  // Set border width.  
        borderColor: '#EEE5D1',  // Set border Hex Color code here. 
        borderRadius: 99,


        // Set border Radius.   
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
    rectangle: {
        height: 128,
        width: 128,
        backgroundColor: 'salmon',

    },
    image: {
        height: 163,
        width: 384,
    },
    buttonText: {
        color: "#000000",
        fontSize: 15,

    },
    buttonTextname: {
        color: "#000000",
        fontSize: 25,
        fontWeight: 'bold'
    },
    buttonTextBold: {
        color: "#000000",
        fontSize: 20,
        fontFamily: 'SFBold',
        fontWeight: 'bold'

    },
    img: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFFFF",
    },
    dashcolor: {
        color: "#808080",
    }


});


export default ProfileEdit