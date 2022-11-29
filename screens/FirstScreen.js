import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, ImageBackground, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationRouteContext, useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import { useTailwind } from 'tailwind-rn/dist';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { Platform } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import bacg from '../assets/design2.png';
import item from '../assets/inactive.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import star from '../assets/star.png';
import BottomNavigation from "./BottomNavigation";
import {
    collection,
    doc,
    DocumentSnapshot,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    where,
} from "@firebase/firestore";
import { db } from "../firebase";
import generateId from "../lib/generateid";




const FirstScreen = () => {
    const navigation = useNavigation();
    const { user, signOut } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const [prome, setProme] = useState([]);
    const swipeRef = useRef(null);
    const [cd, setcd] = useState([]);
    const tw = useTailwind();


    var left
    var ShowmeWhoo
    var Showmemes
    var UserImage



    if (!user.uid) {
        user.uid = user.user.uid
        console.log(user.uid)
    }
    else {
        console.log("bye")

    }



    useLayoutEffect(
        () =>
            onSnapshot(doc(db, "users", user.uid), (snapshot) => {
                if (!snapshot.exists()) {
                    navigation.navigate("Name");
                }
            }),
        []
    );


    useLayoutEffect(
        () =>
            onSnapshot(doc(db, "users", user.uid), (snapshot) => {
                if (snapshot.exists()) {
                    navigation.navigate("BottomNavigation");
                }
            }),
        []
    );







    useEffect(() => {
        let unsub;



        const fetchCards = async () => {

        };



        console.log(profiles);





        //  profiles = profiles.filter(element => element.Showme == ShowmeWhoo)
        //  console.log(profiles)





        fetchCards();
        return unsub;

    }, []);






    const swipeLeft = (cardIndex) => {
        if (!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        console.log(`You swiped PASS on ${userSwiped.displayName}`);

        setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
    };

    const swipeRight = async (cardIndex) => {
        if (!profiles[cardIndex]) return;

        const userSwiped = profiles[cardIndex];
        const loggedInProfile = await (
            await getDoc(doc(db, "users", user.uid))
        ).data();

        //Check if the user swiped on you...
        getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
            (documentSnapshot) => {
                if (documentSnapshot.exists()) {
                    //user has matched with you before you matched with them...
                    //Create a MATCH!
                    console.log(`Hooray, you matched with ${userSwiped.displayName}`);
                    setDoc(
                        doc(db, "users", user.uid, "swipes", userSwiped.id),
                        userSwiped
                    );
                    //CREATE A MATCH!
                    setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
                        users: {
                            [user.uid]: loggedInProfile,
                            [userSwiped.id]: userSwiped,
                        },
                        usersMatched: [user.uid, userSwiped.id],
                        timestamp: serverTimestamp(),
                    });

                    navigation.navigate("Match", {
                        loggedInProfile,
                        userSwiped,
                    });
                } else {
                    //User has swiped as first interaction between the two or didn't get swiped on...
                    console.log(
                        `You swiped on ${userSwiped.displayName} (${userSwiped.job})`
                    );
                    setDoc(
                        doc(db, "users", user.uid, "swipes", userSwiped.id),
                        userSwiped
                    );
                }
            }
        );

        //User has swiped as first interaction between the two...
        console.log(`You swiped on ${userSwiped.displayName} (${userSwiped.job})`);
        setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
    };



    return (
        <SafeAreaView style={tw("flex-1")}>



            {/* Header */}
            <View style={tw("items-center")}>






                <TouchableOpacity >
                    <Image style={styles.titleimage} source={require("../appassets/title.png")} />


                </TouchableOpacity>

            </View>

            {/* End of Header */}
            {/* Cards */}
            <View style={tw("flex-1 -mt-9")}>
                <Swiper
                    ref={swipeRef}
                    containerStyle={{ backgroundColor: "transparent" }}
                    cards={profiles}
                    stackSize={5}
                    cardIndex={0}
                    stackSeparation={14}
                    verticalSwipe={true}
                    animateCardOpacity
                    onSwipedLeft={(cardIndex) => {
                        console.log("Swipe PASS");
                        swipeLeft(cardIndex);
                    }}
                    onSwipedRight={(cardIndex) => {
                        console.log("Swipe MATCH");
                        swipeRight(cardIndex);
                    }}
                    overlayLabels={{
                        left: {
                            title: "❌",
                            style: {
                                label: {
                                    textAlign: "right",
                                    //   color: "red",
                                    fontSize: 35,
                                },


                            },
                        },
                        right: {

                            title: "🧡",
                            style: {
                                label: {
                                    //color: "#4DED30",
                                    fontSize: 45,
                                },
                            },
                        },
                    }}
                    backgroundColor={"#4FD0E9"}
                    useViewOverflow={Platform.OS === "ios"}
                    renderCard={(card) =>
                        card ? (
                            <View
                                key={card.id}
                                style={tw("relative bg-white h-5/6 rounded-xl")}
                            >
                                <Text>{card.firstName}</Text>
                                <Image
                                    style={tw("absolute top-0 h-full w-full rounded-xl")}
                                    source={{ uri: card.photoURL }}
                                />
                                <View
                                    style={[
                                        tw(
                                            "absolute bottom-0 justify-between flex-row bg-white w-full h-20 px-6 py-2 rounded-b-xl items-center"
                                        ),
                                        styles.cardShadow,
                                    ]}
                                >
                                    <View>
                                        <Text style={tw("text-xl font-bold")}>
                                            {card.displayName}
                                        </Text>
                                        <Text>{card.job}</Text>
                                    </View>
                                    <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                                </View>
                            </View>



                        ) : (
                            <View
                                style={[
                                    tw(
                                        "relative bg-white h-5/6 rounded-xl justify-center items-center"
                                    ),
                                    styles.cardShadow,
                                ]}
                            >
                                <Text style={tw("font-bold pb-5")}>Searching...</Text>
                                <Image
                                    style={tw("w-32 h-32 rounded-full")}
                                    source={require("../assets/search.gif")}
                                />
                            </View>
                        )
                    }
                />
            </View>
            <View
                style={tw("p-3")} />


            <View style={tw("flex flex-row  px-8")}>





            </View>







            <ImageBackground source={bacg} style={styles.image}>

                <View style={tw("flex-row items-center relative bottom-0 justify-between px-6")}>
                    <TouchableOpacity >
                        <MaterialCommunityIcons name="account" color="black" size={45} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Entypo name="home" size={35} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                        <Ionicons name="chatbubbles-sharp" size={35} color="#FF5864" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>


        </SafeAreaView >


    );
};

export default FirstScreen;

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    image: {

        resizeMode: 'cover',
        justifyContent: 'center',
    },
    titleimage: {

        resizeMode: 'cover',
        justifyContent: 'center',
        width: 99,
        height: 45,
    },



});