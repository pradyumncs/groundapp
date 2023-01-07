import { View, Text, StyleSheet, FlatList, Alert, Image, useWindowDimensions, Animated, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import data from '../data'
import Onboardingitem from '../Onboardingitem'
import Paginator from '../Paginator'
import { useTailwind } from "tailwind-rn";
import { Platform } from 'react-native';
import Purchases, { PurchasesOffering } from 'react-native-purchases';
import PackageItem from '../Premium/PackageItem'
import { ScrollView } from 'react-native'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
const entitlement_id = 'pro';
const Premium = () => {

    const navigation = useNavigation();
    const slideRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentindex] = useState(0)
    const { width: screenWidth } = useWindowDimensions();
    const tw = useTailwind();
    const viewableitemsChanged = useRef(({ viewableItems }) => {
        setCurrentindex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const [packages, setPackages] = useState([]);

    // - State for displaying an overlay view
    const [isPurchasing, setIsPurchasing] = useState(false);
    const [offer, setOffer] = useState(null);



    useEffect(() => {
        const fetchOfferings = async () => {
            try {
                const offerings = await Purchases.getOfferings();
                if (offerings.current != null) {
                    setOffer(offerings.current);

                    // setPackages(offerings.current.availablePackages);
                }
            }
            catch (e) {
                console.log(e)
            }
        };

        fetchOfferings();
    }, [])



    const buyPackage = async pack => {
        try {
            const { purchaserInfo } = await Purchases.purchasePackage(pack);
            console.log('hi')

        }
        catch (e) {

        }
    }

    const press = async (pack) => {


        const purchaserInfo = await Purchases.purchasePackage(pack);
        console.log(purchaserInfo)
        // access latest purchaserInfo

        // Error fetching purchaser info

    }


    return (


        <ImageBackground
            resizeMode="cover"
            style={tw("flex-1")}
            source={require("../assets/try2.png")}
        >
            <View style={tw("p-1")} />
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}
                    style={tw("absolute left-0 top-0 h-16 w-16 pt-2 pl-3")}>

                    <Entypo name="cross" size={32} color="black" />

                </TouchableOpacity>
                <View style={tw("items-center pt-2")}>
                    <Text style={tw("text-center text-2xl font-semibold text-black")}>
                        Get Premium
                    </Text>

                </View>
                <View style={tw("p-2")} />
                <View style={tw("p-2")} />
                <FlatList data={data} renderItem={({ item }) => <Onboardingitem item={item} />}

                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {


                        useNativeDriver: false,
                    }



                    )}
                    scrollEventThrottle={8}
                    viewabilityConfig={viewConfig}
                    onViewableItemsChanged={viewableitemsChanged}
                    ref={slideRef}
                />
                <View style={tw("p-1")} />

                <View style={tw(" items-center justify-center")}>
                    <Paginator data={data} scrollX={scrollX} />
                </View>


            </View>
            <View style={tw("p-2")} />
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center'

    },
})

export default Premium