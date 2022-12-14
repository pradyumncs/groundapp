import { View, Text, StyleSheet, FlatList, Image, useWindowDimensions, Animated } from 'react-native'
import React, { useState, useRef } from 'react'
import data from '../data'
import Onboardingitem from '../Onboardingitem'
import Paginator from '../Paginator'
import { useTailwind } from "tailwind-rn";

const Premium = () => {

    const slideRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentindex] = useState(0)
    const { width: screenWidth } = useWindowDimensions();
    const tw = useTailwind();
    const viewableitemsChanged = useRef(({ viewableItems }) => {
        setCurrentindex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <View style={styles.container}>
            <View style={tw("items-center pt-4")}>
                <Text style={tw("text-center text-lg font-semibold")}>
                    Get Premium
                </Text>

            </View>
            <View style={tw("p-4")} />
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
            <View style={tw("absolute inset-x-0 bottom-0 h-64 items-center justify-center")}>
                <Paginator data={data} scrollX={scrollX} />
            </View>
            <View>
                <Text>.</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFCB37",
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Premium