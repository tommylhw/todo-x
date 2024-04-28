import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, StatusBar, View, Text, Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native'
import { useTheme, Button, TextInput } from 'react-native-paper';

// components
import GoBackBtn from '../../components/GoBackBtn';

// backend
import { AuthConfirmAccount } from '../../utils/auth';

// Redux Toolkit
import { useSelector, useDispatch } from 'react-redux';
import {
  setIsSignedIn,
  setCurrentUserEmail,
  setCurrentUserPassword,
  setCurrentUserName,
  setCurrentUserID,
  setCurrentUserInfo,
  selectIsSignedIn,
  selectCurrentUserEmail,
  selectCurrentUserPassword,
  selectCurrentUserName,
  selectCurrentUserID,
  selectCurrentUserInfo
} from '../../stores/AuthSlice';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AccountConfirmationScreen = ({ navigation, route }: { navigation: any, route: any }) => {

  const theme = useTheme();
  const dispatch = useDispatch();
  const { email, password } = route.params;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerTitleAlign: 'center',
      headerTransparent: true, // hide header border
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerLeft: () => <GoBackBtn navigation={navigation} />
    })
  }, []);

  const inputRefs = useRef<TextInput[]>([]);
  const [confirmationCode, setConfirmationCode] = useState<string>("");

  const HandleTextChange = (text: string, index: number) => {
    if (text.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    const updatedCode =
      confirmationCode.slice(0, index) +
      text +
      confirmationCode.slice(index + 1);
    setConfirmationCode(updatedCode);
  };

  const HandleBackspacePress = (index: number) => {
    if (index > 0) {
      inputRefs.current[index - 1].clear();
      inputRefs.current[index - 1].focus();
    }

    const updatedCode =
      confirmationCode.slice(0, index - 1) + confirmationCode.slice(index);
    setConfirmationCode(updatedCode);
  };

  const HandleConfirmation = async (
    email: string,
    password: string,
    confirmationCode: string
  ) => {
    try {
      setIsLoading(true);
      console.log("HandleConfirmation: ", email, password, confirmationCode);

      const action = await AuthConfirmAccount(email, confirmationCode);

      if (action == "CONFIRM_ACCOUNT_SUCCESS") {
        console.log("Account confirmed");
        setIsLoading(false);
        dispatch(setIsSignedIn(true));
      }

      // const action = await auth.AuthConfirmSignUp(email, confirmationCode);
      // if (action === "success") {
      //   const login = await auth.AuthSignIn(email, password);
      //   if (login === "success") {
      //     console.log("sign in success after confirmation");
      //     dispatch(setIsSignedIn(true));
      //     const userIDFromDB = await auth.AuthGetUserID();
      //     dispatch(setCurrentUserID(userIDFromDB));
      //     navigation.navigate("AuthToHome");
      //   }
      // }
    } catch (error) {
      console.error("Error at HandleVerification: ", error);
      // setWarning(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (confirmationCode.length === 6) {
      console.log("Confirmation Code:", confirmationCode);
      HandleConfirmation(email, password, confirmationCode);
    }
  }, [confirmationCode]);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <StatusBar />
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          paddingHorizontal: 20,
          // paddingVertical: 30,
        }}
      >
        {/* <Text>Testing Screen</Text>

        <Text>Email: {email}</Text>
        <Text>Password: {password}</Text> */}

        <View
          style={{
            borderRadius: 100,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: "rgba(0, 82, 221, 0.2)",
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: theme.colors.primary,
            }}
          >
            Confirm Your Email
          </Text>
        </View>

        <Text
          style={{
            width: "75%",
            fontSize: 16,
            lineHeight: 25,
            textAlign: "center",
            // color: theme.colors.secondary,
          }}
        >
          Please enter the 6-digit confirmation code sent to your email address.
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 20,
            gap: 10,
          }}
        >
          {[...Array(6)].map((_, index) => (
            <TextInput
              mode='outlined'
              key={index}
              style={{
                width: 45,
                // aspectRatio: 1 / 1.1,
                fontSize: 30,
                borderRadius: 5,
                borderBottomWidth: 0,
                // textAlign: "center",
                fontWeight: "bold",
              }}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={(text) => HandleTextChange(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  HandleBackspacePress(index);
                }
              }}
              ref={(ref) => (inputRefs.current[index] = ref as TextInput)}
            />
          ))}
        </View>
        <View style={{ gap: 10, width: "100%", alignItems: "center" }}>
          {/* <TouchableOpacity>
            <Text
              style={{
                color: theme.colors.primary,
              }}
            >
              Resend Code
            </Text>
          </TouchableOpacity> */}

          {isLoading ? (
            <ActivityIndicator
              style={{
                opacity: 1.0,
              }}
              color={"black"}
            />
          ) : (
            ""
          )}
          {warning.length > 0 ? (
            <Text style={{ color: "red" }}>{warning}</Text>
          ) : (
            ""
          )}
        </View>

        <Text>Email: {email}</Text>
        <Text>Password: {password}</Text>



      </View>
    </SafeAreaView>
  )
}

export default AccountConfirmationScreen