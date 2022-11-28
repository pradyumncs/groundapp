import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './screens/LoginScreen';
import useAuth from './hooks/useAuth';

import SignInEmail from './screens/SigninEmail';
import Madara from './Madara';

const Stack = createNativeStackNavigator();


const StackNavigator = () => {
    //initialRouteName="Tabs"

    const { user } = useAuth();



    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <>


                    <Stack.Group>
                        <Stack.Screen name="sd" component={Madara} />

                    </Stack.Group>


                </>
            ) : (
                <Stack.Group>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="SigninEmail" component={SignInEmail} />
















                </Stack.Group>

            )

            }



        </Stack.Navigator>

    )
}

export default StackNavigator