import { useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';

import {
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingViewBase,
  PlatformColor,
  Platform,
  TouchableWithoutFeedbackBase,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Button,
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useTailwind } from 'tailwind-rn/dist'
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import tw from "tailwind-rn";
import Receiver from "../components/Receiver";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../firebase";
import bacg from '../assets/design.png';



const MessageScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const tw = useTailwind();
  const [lastMessage, setLastMessage] = useState("");

  const { matchDetails } = params;


  if (!user.uid) {
    user.uid = user.user.uid
    console.log(user.uid)
  }
  else {
    console.log("bye")

  }



  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
  }, [matchDetails, db]);

  const sendMessage = () => {
    if (input != "") {
      addDoc(collection(db, "matches", matchDetails.id, "messages"), {
        timestamp: serverTimestamp(),
        userId: user.uid,
        displayName: matchDetails.users[user.uid].displayName,
        photoURL: matchDetails.users[user.uid].photoURL,
        message: input,
      });

      setInput("");
    }
  };

  //Button title="Send" color="#FF5864" 




  return (
    <View style={tw("flex-1")}>
      <ImageBackground source={bacg} style={styles.image}>

        <Header
          title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
          callEnabled
        />



        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tw("flex-1")}
          keyboardVerticalOffset={10}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList
              data={messages}
              inverted={-1}
              style={tw("pl-4")}
              keyExtractor={(item) => item.id}
              renderItem={({ item: message }) =>
                message.userId === user.uid ? (
                  <SenderMessage key={messages.id} message={message} />
                ) : (
                  <ReceiverMessage key={message.id} message={message} />
                )
              }
            />
          </TouchableWithoutFeedback>
          <View
            style={tw(
              "flex-row justify-between items-center border-t border-gray-200 px-5 py-2"
            )}
          >
            <TextInput
              multiline={true}
              style={tw("flex-1 h-10 text-lg")}
              placeholder="Send a message"
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              value={input}
            />
            <Ionicons name="send" size={30} color="black" onPress={sendMessage} />

          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },


});

export default MessageScreen;