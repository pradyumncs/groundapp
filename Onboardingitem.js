import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
import React from 'react'


const Onboardingitem = ({ item }) => {
    const { width } = useWindowDimensions();
    return (
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image]} />

            <View>
                <Text style={[styles.image]} >
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


        width: 400,
        height: 200,

    },

})
export default Onboardingitem