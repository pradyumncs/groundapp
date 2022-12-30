import { View, Text, StyleSheet, FlatList, Alert, Dimensions, Image, useWindowDimensions, Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import data from '../data'
import Onboardingitem from '../Onboardingitem'
import Paginator from '../Paginator'
import { useTailwind } from "tailwind-rn";
import { Platform } from 'react-native';
import Purchases, { PurchasesOffering } from 'react-native-purchases';
import PackageItem from '../Premium/PackageItem'
import Premium from '../screens/Premium'
import { ScrollView } from 'react-native'
const APIKeys = {
    apple: "goog_QOKCJJKzoThDlOPNGGZdfBxQPic",
    google: "goog_QOKCJJKzoThDlOPNGGZdfBxQPic",
};
const { width, height } = Dimensions.get('window');

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;


const Premiumoffer = () => {
    const [packages, setPackages] = useState([]);
    const [isPurchasing, setIsPurchasing] = useState(false);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const tw = useTailwind();
    useEffect(() => {
        Purchases.setDebugLogsEnabled(true);
        Purchases.configure({ apiKey: APIKeys.google });
    }, [])


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
    const footer = () => <Text>This is a reccurring subscription</Text>
    return (
        <ScrollView>
            <View style={styles.container}>
                <Premium />

                <FlatList
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


                <Text style={tw("text-center font-semibold")}>
                    This is a reccurring subscription that you can cancel {"\n"} anytime</Text>



            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

})
export default Premiumoffer