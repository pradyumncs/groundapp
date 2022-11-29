import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import ProfileEdit from './ProfileEdit';
import ChatRow from '../components/ChatRow';
import ChatScreen from './ChatScreen';
import FirstScreen from './FirstScreen';
import Welcome from './Welcome';

const Tab = createBottomTabNavigator();

const BottomNavigation = ({ navigation }) => {
    return (
        <Tab.Navigator
            initialRouteName="ProfileEdit"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
                headerShown: false,
            }}
        >

            <Tab.Screen
                name="Welcome"
                component={Welcome}
                options={{
                    tabBarLabel: 'Welcome',
                    tabBarIcon: ({ color, size }) => (

                        <AntDesign name="star" size={size} color={color} />
                    ),

                    tabBarBadge: 1,
                }}
            />


            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileEdit}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Notifications"
                component={ChatScreen}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                    tabBarBadge: 3,
                }}
            />

        </Tab.Navigator>

    );
}

export default BottomNavigation