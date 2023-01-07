import { View, Text, StyleSheet, FlatList, Alert, Dimensions, TouchableOpacity, Image, useWindowDimensions, Animated, ImageBackground, Linking } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Toast from 'react-native-toast-message';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import data from '../data'
import Onboardingitem from '../Onboardingitem'
import Paginator from '../Paginator'
import { useTailwind } from "tailwind-rn";
import { Platform } from 'react-native';
import Purchases, { PurchasesOffering } from 'react-native-purchases';
import PackageItem from '../Premium/PackageItem'
import Premium from '../screens/Premium'
import { ScrollView } from 'react-native'

const { width, height } = Dimensions.get('window');

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;


const Premiumoffer = () => {
    const [packages, setPackages] = useState([]);
    const [isPurchasing, setIsPurchasing] = useState(false);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const tw = useTailwind();



    useEffect(() => {
        const getPackages = async () => {
            try {
                const offerings = await Purchases.getOfferings();
                if (offerings.current != null) {
                    console.log(offerings.current);
                    setPackages(offerings.current.availablePackages);
                    console.log(offerings.current);
                    console.log(offerings.current);
                }
            }
            catch (e) {
                console.log(e)
            }
        };
        getPackages();
    }, [])



    const header = () => <Premium />
    const footer = () => <Text>z</Text>
    return (

        <ScrollView>
            <View style={styles.container}>
                <Premium />
                <ImageBackground
                    resizeMode="cover"
                    style={tw("flex-1")}
                    source={require("../assets/try3.png")}
                >
                    <View style={tw("p-2")} />
                    <View style={tw("flex-row items-center relative")}>

                        <FlatList
                            contentContainerStyle={{
                                flex: 1,
                                justifyContent: 'center',
                                flexGrow: 1,
                                alignContent: 'center',
                            }}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={packages}
                            keyExtractor={(item) => item.identifier}
                            renderToHardwareTextureAndroid
                            snapToAlignment='start'

                            bounces={false}
                            decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                            scrollEventThrottle={16}

                            renderItem={({ item }) =>

                                <PackageItem purchasePackage={item} setIsPurchasing={setIsPurchasing}


                                />


                            }

                        />

                    </View>
                    <Text style={tw("text-center font-semibold")}>
                        This is a reccurring subscription that you can cancel {"\n"} anytime</Text>
                    <View style={tw("p-3 text-center")}></View>


                    <View style={tw(" text-center")}>
                        <Text style={[tw(" text-center"), styles.hyperli]}
                            onPress={() => { Linking.openURL('https://pages.flycricket.io/avalu-kannada-dati/privacy') }}>
                            Terms of Use and Privacy policy {"\n"} </Text>

                    </View>
                </ImageBackground>
            </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    hyperli: {
        color: "#000000",
        fontSize: 14,
        fontWeight: "bold",
        textDecorationLine: 'underline',

    },

})
export default Premiumoffer