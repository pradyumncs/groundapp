import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn';

const SenderMessage = ({ message }) => {

  const tw = useTailwind();

  return (
    <View
      style={[
        tw('bg-red-500 px-5 py-3 mx-3 my-1'),
        { alignSelf: 'flex-start', marginLeft: "auto" }, styles.setBorderRadius,
      ]}
    >
      <Text
        style={tw("text-white")}
      >
        {message.message}
      </Text>
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


export default SenderMessage