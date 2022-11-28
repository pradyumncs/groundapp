import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { db, firebase } from "../firebase";
import { useNavigation, useRoute } from '@react-navigation/native';

const AuthContext = createContext({

});






export const AuthProvider = ({ children }) => {


    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();
    var usersd
    var useraa


    GoogleSignin.configure({
        webClientId: '511816435178-jo7s1cvm33hi1h6m9iuha90buc3kqth1.apps.googleusercontent.com',
    });

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);







    const onGoogleButtonPress = async () => {

        setLoading(true);
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const user_sign_in = auth().signInWithCredential(googleCredential);
        user_sign_in.then((user) => {
            console.log(user);
        })
            .catch((error) => {
                console.log(error);

            })
            .finally(() => setLoading(false));

    }

    const signOut = async () => {
        setLoading(true);

        try {
            await GoogleSignin.revokeAccess();
            await auth().signOut();
            setUser(null);
        }
        catch (error) {
            console.error(error);
            setError(error);
        }
        finally {
            setLoading(false);
        }


    }

    const loginUser = async (username, password) => {

        setLoading(true);

        (firebase.auth().signInWithEmailAndPassword(username, password).then((usersd) => {
            console.log(usersd);

            setUser(usersd)


        })


            .catch((error) => {
                console.log(error);
                alert("Incorrect Password Please Try Again");

            })

            .finally(() => {
                console.log("sasasa")
                setLoading(false);

            })
        )

        //    console.log(user)
        //     setUser(users)




    }



    const memoedValue = useMemo(
        () => ({
            user,
            loading,
            error,
            loginUser,
            onGoogleButtonPress,
            signOut,

        }),
        [user, loading, error]
    );


    if (initializing) return null;







    return (
        <AuthContext.Provider
            value={memoedValue}>


            {!initializing && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);

}
