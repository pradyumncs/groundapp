import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { useTailwind } from "tailwind-rn";

const Onboardingitem = ({ item }) => {
    const { width } = useWindowDimensions();
    const tw = useTailwind();
    return (
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image]} />

            <View>
                <Text style={[styles.image]} >

                </Text>

            </View>

            <View style={tw("items-center ")}>
                <Text style={tw("text-center text-xl font-semibold")}>
                    {item.title}
                </Text>

            </View>

        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {


        width: 300,
        height: 100,

    },
    zas: {


        width: 300,
        height: 150,

    },

})
export default Onboardingitem