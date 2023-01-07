import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import useAuth from './hooks/useAuth';
import ModalScreen
    from './screens/ModalScreen';
import MatchScreen from './screens/MatchScreen';
import MessageScreen from './screens/MessageScreen';

import Age from './signup/Age';
import Gender from './signup/Gender';
import Names from './signup/Names';
import Showme from './signup/Showme';
import Photo from './signup/Photo';
import MyTabs from './screens/BottomNavigation';
import FirstScreen from './screens/FirstScreen';
import Upload from './signup/Upload';
import Learn from './components/Learn';
import ProfileEdit from './screens/ProfileEdit';
import Test from './screens/Test';
import SignInEmail from './screens/SigninEmail';
import BottomNavigation from './screens/BottomNavigation';
import Premium from './screens/Premium';
import Premiumoffer from './Premium/Premiumoffer';
import Number from './signup/Number';
const Stack = createNativeStackNavigator();


const StackNavigator = () => {
    //initialRouteName="Tabs"

    const { user } = useAuth();



    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <>
                    <Stack.Group>
                        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
                        <Stack.Screen name="First" component={FirstScreen} />
                        <Stack.Screen name="Profileedit" component={ProfileEdit} />
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Chat" component={ChatScreen} />
                        <Stack.Screen name="Message" component={MessageScreen} />

                    </Stack.Group>
                    <Stack.Group>
                        <Stack.Screen name="Upload" component={Upload} />
                        <Stack.Screen name="Test" component={Test} />
                        <Stack.Screen name="Learn" component={Learn} />
                        <Stack.Screen name="Premium" component={Premium} />
                        <Stack.Screen name="Premiumoffer" component={Premiumoffer} />
                    </Stack.Group>








                    <Stack.Group>
                        <Stack.Screen name="Name" component={Names} />
                        <Stack.Screen name="Age" component={Age} />
                        <Stack.Screen name="Gender" component={Gender} />
                        <Stack.Screen name="Showme" component={Showme} />
                        <Stack.Screen name="Photo" component={Photo} />
                        <Stack.Screen name="Number" component={Number} />


                    </Stack.Group>











                    <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
                        <Stack.Screen name="Match" component={MatchScreen} />
                    </Stack.Group>
                    <Stack.Group screenOptions={{ presentation: "modal" }}>
                        <Stack.Screen name="Modal" component={ModalScreen} />
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