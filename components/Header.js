import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = ({ title, callEnabled }) => {
  const tw = useTailwind();

  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View >
        <View style={tw("flex flex-row items-center")}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw("p-0")}
          >
            <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
          </TouchableOpacity>
          <Text style={tw("text-2xl font-bold pl-2")}>{title}</Text>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Header;
