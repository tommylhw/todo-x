import React, { useState, useCallback, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, StatusBar, View, Text, Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import { useTheme, Button, TextInput, Divider, Switch } from 'react-native-paper';

import LinearGradient from 'react-native-linear-gradient';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

// components
import GoBackBtn from '../components/GoBackBtn';

// backend
import { AuthGetCurrentUser, AuthSignOut } from '../utils/auth';

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

const ProfileScreen = ({ navigation }: { navigation: any }) => {

  const theme = useTheme();
  const dispatch = useDispatch();

  const HandleSignOut = async () => {
    const action = await AuthSignOut();
    if (action == "SIGN_OUT_SUCCESS") {
      console.log("HandleSignOut: ", action);
      dispatch(setIsSignedIn(false));
      navigation.navigate('AuthNavigator');
    }
  }

  const [notificationOn, setNotificationOn] = useState(true);

  return (
    // <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
    //   <StatusBar />

    <View
      style={{
        width: '100%',
        backgroundColor: '#fff'
      }}
    >
      <LinearGradient
        colors={['rgb(0, 82, 221)', '#5D96FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: "100%",
          height: "100%",
          // paddingTop: 80,
        }}
      >
        <ScrollView>


          {/* Top Section */}
          <View
            style={{
              width: '100%',
              height: 150,
              marginTop: 80,
              paddingHorizontal: 30,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: "#fff",
              }}
            >
              Hi, Tommy Wong
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              height: "100%",
              backgroundColor: theme.colors.primaryContainer,
              borderTopLeftRadius: 40,
            }}
          >
            {/* Middle Section */}
            <View
              style={{
                width: '100%',
                height: 120,
                borderTopLeftRadius: 40,
                flexDirection: 'row',
                paddingVertical: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderRightWidth: 1,
                  borderColor: "#D1D1D1",
                }}
              >

              </View>

              <View
                style={{
                  flex: 1,
                  borderRightWidth: 1,
                  borderColor: "#D1D1D1",
                }}
              >

              </View>

              <Divider />

              <View
                style={{
                  flex: 1,
                }}
              >

              </View>
            </View>

            {/* Bottom Section */}
            <View
              style={{
                width: '100%',
                height: "100%",
                backgroundColor: "#fff",
                borderTopLeftRadius: 40,
                paddingTop: 20,
              }}
            >

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                  gap: 10,
                }}
              >
                <Feather name="user" size={20} />
                <Text
                  style={{
                    fontSize: 16,
                    flex: 1,
                  }}
                >
                  My Profile
                </Text>
                <Feather name="chevron-right" size={26} color="#D1D1D1" />
              </TouchableOpacity>

              <Divider />

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                  gap: 10,
                }}
              >

                {/* <Feather name="settings" size={20} /> */}
                <Ionicons name="settings-outline" size={20} />
                <Text
                  style={{
                    fontSize: 16,
                    flex: 1,
                  }}
                >
                  Settings
                </Text>
                <Feather name="chevron-right" size={26} color="#D1D1D1" />

              </TouchableOpacity>

              <Divider />

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                  gap: 10,
                }}
              >
                <AntDesign name="earth" size={20} />
                <Text
                  style={{
                    fontSize: 16,
                    flex: 1,
                  }}
                >
                  Language
                </Text>
                <Feather name="chevron-right" size={26} color="#D1D1D1" />
              </TouchableOpacity>

              <Divider />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                  gap: 10,
                }}
              >
                <Ionicons name="notifications-outline" size={20} />
                <Text
                  style={{
                    fontSize: 16,
                    flex: 1,
                  }}
                >
                  Notification
                </Text>
                {/* <Feather name="chevron-right" size={26} color="#D1D1D1" /> */}

                <Switch
                  value={notificationOn}
                  color={theme.colors.primary}
                  onValueChange={() => setNotificationOn(!notificationOn)}
                />
              </View>

              <Divider style={{ borderWidth: 5, borderColor: "#f2f2f2", }} />

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                  gap: 10,
                }}
              >
                <Feather name="lock" size={20} />
                <Text
                  style={{
                    fontSize: 16,
                    flex: 1,
                  }}
                >
                  Privacy
                </Text>
                <Feather name="chevron-right" size={26} color="#D1D1D1" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                  gap: 10,
                }}
              >
                <Feather name="help-circle" size={20} />
                <Text
                  style={{
                    fontSize: 16,
                    flex: 1,
                  }}
                >
                  Help
                </Text>
                <Feather name="chevron-right" size={26} color="#D1D1D1" />
              </TouchableOpacity>

              <Divider />

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                  gap: 10,
                }}
              >
                <Feather name="info" size={20} />
                <Text
                  style={{
                    fontSize: 16,
                    flex: 1,
                  }}
                >
                  About
                </Text>
                <Feather name="chevron-right" size={26} color="#D1D1D1" />
              </TouchableOpacity>

              <Divider style={{ borderWidth: 5, borderColor: "#f2f2f2", }} />

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                  gap: 10,
                }}
                onPress={() => HandleSignOut()}
              >
                <Feather name="log-out" size={20} />
                <Text
                  style={{
                    fontSize: 16,
                    flex: 1,
                  }}
                >
                  Logout
                </Text>
                <Feather name="chevron-right" size={26} color="#D1D1D1" />

              </TouchableOpacity>

              <Divider />



              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#888",
                  }}
                >
                  Version 1.0.0
                </Text>
              </View>

              <Button
                mode='contained'
                onPress={() => navigation.navigate('Testing')}
              >
                <Text>Testing</Text>
              </Button>


            </View>
          </View>

        </ScrollView>

      </LinearGradient >


    </View >
  )
}

export default ProfileScreen