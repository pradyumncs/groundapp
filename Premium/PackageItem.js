import React from 'react';
import { View, Text, Pressable, Alert, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import {
    StatusBar,
    FlatList,
    Image,
    Dimensions,
    Animated,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Purchases from 'react-native-purchases';
const { width, height } = Dimensions.get('window');
const entitlement_id = 'pro';

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const PackageItem = ({ purchasePackage, setIsPurchasing }) => {
    const {
        product: { title, description, priceString, identifier },
    } = purchasePackage;

    const navigation = useNavigation();
    const tw = useTailwind();
    const onSelection = async () => {

        try {
            const { purchaserInfo } = await Purchases.purchasePackage(purchasePackage);


            const CustomerInfo = await Purchases.getCustomerInfo();


            if (typeof CustomerInfo.entitlements.active[entitlement_id] !== "undefined") {

                navigation.navigate("BottomNavigation")

            }

        }
        catch (e) {
            if (e.userCancelled) {
                Alert.alert(e.message)
            }
        }
    }

    const press = async () => {


        const purchaserInfo = await Purchases.getCustomerInfo();
        console.log(purchaserInfo)
        // access latest purchaserInfo

        // Error fetching purchaser info

    }

    const gettypepackage = (type) => {
        if (type == 'b_1month') return '1'
        if (type == 'a_3month') return '3'
        if (type == 'c_6month') return '6'

    }
    const gettypepackagemonth = (type) => {
        if (type == 'b_1month') return 'month'
        if (type == 'a_3month') return 'months'
        if (type == 'c_6month') return 'months'

    }

    const popular = (type) => {
        if (type == 'b_1month') return 'MOST POPULAR'
        if (type == 'a_3month') return '🔥 SAVE 29%'
        if (type == 'c_6month') return '🔥 SAVE 53%'
    }

    return (

        <Pressable onPress={onSelection} >
            <View
                style={{
                    marginHorizontal: SPACING,

                    alignItems: 'center',


                    borderRadius: 34,
                }}
            >
                <View

                    style={[styles.posterImage, styles.shadow]}
                >
                    <View
                        style={[tw("rounded-xl bg-black"),
                        styles.shadow]}

                    >

                        <Text style={tw("text-center text-black ")}>
                            {popular(identifier)}
                        </Text>
                    </View>
                    <View style={tw("items-center pt-8")}>

                        <Text style={styles.date}>{gettypepackage(identifier)}</Text>


                    </View>
                    <View style={tw("items-center")}>

                        <Text style={styles.month}>{gettypepackagemonth(identifier)}</Text>


                    </View>

                    <View style={tw("items-center pt-16")}>



                        <Text style={styles.price}>{priceString}</Text>
                    </View>

                </View>





                <View
                    style={[tw("rounded-2xl p-3 "),
                    styles.shadow]}

                >
                    <Text style={tw("text-center font-semibold text-black text-lg")}>
                        Continue
                    </Text>
                </View>
            </View>
            <View style={tw("p-3")}></View>
        </Pressable>

    );
};

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#242424',
    },
    date: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
    },
    month: {
        color: 'black',
        fontSize: 16,
        fontWeight: '470',
    },
    price: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    posterImage: {
        width: 110,
        height: 250,
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
        backgroundColor: '#fff8de',
    },
    shadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 4,
        backgroundColor: '#fff8de',
    },
})

export default PackageItem;



