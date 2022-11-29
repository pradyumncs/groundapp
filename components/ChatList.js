import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import { useNavigation } from "@react-navigation/core";
import ChatRow from './ChatRow';

const ChatList = () => {
    const tw = useTailwind();
    const [matches, setMatches] = useState([])
    const { user } = useAuth();

    const navigation = useNavigation();

    if (!user.uid) {
        user.uid = user.user.uid
        console.log(user.uid)
    }
    else {
        console.log("bye")

    }



    useEffect(() => {
        onSnapshot(query(collection(db, 'matches'),
            where('usersMatched', 'array-contains', user.uid)),
            (snapshot) =>
                setMatches(snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                )
        )
    }, [user])
    return matches.length > 0 ? (
        <FlatList
            style={tw('h-full')}
            data={matches}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatRow matchDetails={item} />}
        />
    ) : (
        <View style={tw("p-6")}>
            <View style={tw("items-center pt-1")}>
                <Image style={styles.titleimage} source={require("../assets/chatimage.png")} />
                <View style={tw("p-3")}></View>
                <View style={tw("p-3")}></View>
                <Text style={styles.TextC}>Say Hello</Text>
                <View style={tw("p-3")}></View>
                <Text style={tw("text-center text-lg")}>No matches at the moment
                </Text>
                <Text style={tw("text-center text-lg")}>
                    Continue Swiping to Find Your One</Text>
                <View style={tw("p-3")}></View>
                <TouchableOpacity
                    style={[tw("rounded-3xl p-3 bg-yellow-400"),
                    styles.shadow]}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Text style={tw("text-center text-black text-lg")}>
                        Get Premium
                    </Text>
                </TouchableOpacity>
                <View style={tw("p-3")}></View>
                <TouchableOpacity
                    style={[tw("rounded-3xl p-3 bg-black"),
                    styles.shadow]}

                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={tw("text-center text-white text-lg")}>
                        Start Swiping
                    </Text>
                </TouchableOpacity>

            </View>
        </View>



    )
}

export default ChatList
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

    },
    TextC: {
        fontSize: 35,

    },



});