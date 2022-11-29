import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist';

const ReceiverMessage = ({ message }) => {

  const tw = useTailwind();


  return (
    <View
      style={[
        tw('bg-white px-5 py-2 mx-2 ml-18 my-1'),
        { alignSelf: 'flex-start' },
        styles.setBorderRadius,
      ]}
    >
      <View style={[
        tw('flex flex-row'),

      ]}
      >
        <Image
          style={tw("h-9 w-9 rounded-full  top-0 ")}
          source={{ uri: message.photoURL }}
        />

        <Text
          style={tw(" text-black-500  font-bold p-2")}

        >
          {message.displayName}


        </Text>

      </View>


      <Text
        style={tw("text-black ")}

      >
        {message.message}


      </Text>
      <View><Image

      /></View>
    </View>


  )
}


const styles = StyleSheet.create({

  setBorderRadius:
  {
    // Setting up image height.  
    // Set border width.  
    // Set border Hex Color code here. 
    borderRadius: 30,


    // Set border Radius.   
  },



});


export default ReceiverMessage