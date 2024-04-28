import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Backend
import { AuthGetCurrentUser } from '../utils/auth';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
} from '../stores/AuthSlice';

// Screens
import SplashScreen from '../screens/auth/SplashScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import AccountConfirmationScreen from '../screens/auth/AccountConfirmationScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProjectScreen from '../screens/ProjectScreen';
import TestingScreen from '../screens/TestingScreen';
import AddScreen from '../screens/AddScreen';

import AddBtn from '../components/AddNavigatorBtn';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: '#949699',
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          height: 90,
          borderTopWidth: 1,
        },
        tabBarItemStyle: {
          borderColor: "red",
          padding: 10,
          alignItems: "center",
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreenNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen name="Schedule" component={ScheduleScreen}
        options={{
          tabBarLabel: 'Schedule',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          )
        }}
      />
  
      {/* <Tab.Screen name="Add" component={AddScreen}
        options={{
          tabBarButton: (props) => (
            <AddBtn {...props} />
          )
          // tabBarIcon: ({ color, size }) => (
          //   <AddBtn />
          // )
        }}
      /> */}

      <Tab.Screen name="Project" component={ProjectScreen}
        options={{
          tabBarLabel: 'Project',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="briefcase" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreenNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeMain"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Testing" component={TestingScreen} />
    </Stack.Navigator>
  )

}

const ProfileScreenNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileMain"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
    </Stack.Navigator>
  )
}

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="AccountConfirmation" component={AccountConfirmationScreen} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  )
}

const SplashNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
    </Stack.Navigator>
  )
}


const RootNavigator = () => {
  const dispatch = useDispatch();
  // const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const isSignedIn = useSelector(selectIsSignedIn);

  const HandleCheckAuthStatus = async () => {
    // Check if the user is already logged in
    // If yes, navigate to HomeScreen
    // If no, navigate to AuthNavigator

    setIsLoading(true);

    const res: any = await AuthGetCurrentUser();
    // console.log("######", JSON.stringify(res))

    if (res.data.session !== null) {
      // setIsSignedIn(true);
      dispatch(setIsSignedIn(true));
      // console.log("@@@@@@@@@@@@@@@@: ", res.userId);
      dispatch(setCurrentUserID(res.userId));
    } else {
      // setIsSignedIn(false);
      dispatch(setIsSignedIn(false));
    }

    setIsLoading(false);
  }

  useEffect(() => {
    HandleCheckAuthStatus();
  }, []);

  return (
    <NavigationContainer>
      {
        isLoading ?
          <SplashNavigator /> :
          isSignedIn ?
            <BottomTabNavigator /> :
            <AuthNavigator />
      }
    </NavigationContainer>
  )
}

export default RootNavigator;