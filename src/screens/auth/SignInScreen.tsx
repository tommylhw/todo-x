import React, { useState, useCallback, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, StatusBar, View, Text, Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from 'react-native'
import { useTheme, Button, TextInput } from 'react-native-paper';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// components
import GoBackBtn from '../../components/GoBackBtn';

// Backend
import { AuthSignInWithEmail } from '../../utils/auth';

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

const SignInScreen = ({ navigation }: { navigation: any }) => {

  const theme = useTheme();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const HandleSignInWithEmail = async () => {
    const res: any = await AuthSignInWithEmail(email, password);
    console.log("HandleSignInWithEmail: ", JSON.parse(res).session);

    if (JSON.parse(res).session !== null) {
      dispatch(setIsSignedIn(true));
      navigation.navigate('BottomTabNavigator');
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Sign In',
      headerTitleAlign: 'center',
      headerTransparent: true, // hide header border
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerLeft: () => <GoBackBtn navigation={navigation} />
    })
  }, []
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }} >
      <StatusBar />

      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}
      >
        <View
          style={{
            width: '100%',
            marginBottom: 10,
          }}
        >
          <Text>E-mail</Text>

          <TextInput
            mode='outlined'
            placeholder='Enter your email'
            keyboardType='email-address'
            value={email}
            onChangeText={text => setEmail(text)}
            style={{
              width: '100%',
              backgroundColor: '#F6F6F6',
              marginVertical: 5,
            }}
            outlineStyle={{
              borderRadius: 10,
            }}
            contentStyle={{
              fontSize: 17,
            }}
            // activeOutlineColor='rgba(0,0,0,0)'
            outlineColor='rgba(0,0,0,0)'
          />

        </View>

        <View
          style={{ width: '100%' }}
        >
          <Text>Password</Text>

          <TextInput
            mode='outlined'
            placeholder='Enter your password'
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={secureTextEntry}
            right={
              <TextInput.Icon
                icon={props => (
                  <TouchableOpacity
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                  >
                    <MaterialCommunityIcons name={secureTextEntry ? 'eye' : 'eye-off'} size={25} color={theme.colors.primary} />
                  </TouchableOpacity>
                )}
              />
            }
            style={{
              width: '100%',
              borderRadius: 5,
              backgroundColor: '#F6F6F6',
              marginVertical: 5,
            }}
            outlineStyle={{
              borderRadius: 10,
            }}
            // label="Password"
            // activeOutlineColor='rgba(0,0,0,0)'
            outlineColor='rgba(0,0,0,0)'
          />

          <TouchableOpacity
            onPress={() => console.log('Forgot Password')}
            style={{
              alignSelf: 'flex-end',
              marginTop: 5,
            }}
          >
            <Text style={{ color: theme.colors.primary }} >Forgot Password?</Text>
          </TouchableOpacity>


        </View>

        <Button
          mode='contained'
          style={{
            width: '100%',
            marginVertical: 20,
            borderRadius: 5,
          }}
          contentStyle={{
            paddingVertical: 5,
          }}
          onPress={() => HandleSignInWithEmail()}
        >
          <Text style={{ fontSize: 17, fontWeight: 'bold' }} >Sign In Now</Text>
        </Button>

        <Text
          style={{
            alignSelf: 'center',
            marginVertical: 50,
            fontWeight: 'bold',
          }}
        >
          Or with
        </Text>

        <View style={{ width: '100%', gap: 10 }} >
          <TouchableOpacity
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: theme.colors.primary,
              borderRadius: 10,
              paddingVertical: 7,
            }}
          >
            <Image
              source={require('../../assets/external_icons/icons8-google-144.png')}
              style={{
                // borderWidth: 1,
                width: 35,
                height: 35,
                marginRight: 10,
              }}
              resizeMode='contain'
            />
            <Text style={{ fontSize: 17, color: theme.colors.surface, fontWeight: 'bold' }}>Login with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: theme.colors.primary,
              borderRadius: 10,
              paddingVertical: 7,
            }}
          >
            <Image
              source={require('../../assets/external_icons/icons8-meta-144.png')}
              style={{
                width: 35,
                height: 35,
                marginRight: 10,
              }}
              resizeMode='contain'
            />
            <Text style={{ fontSize: 17, color: theme.colors.primary, fontWeight: 'bold' }}>Login with Meta</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={{
            alignSelf: 'center',
            marginTop: 50,
            position: 'absolute',
            bottom: 20,
          }}
        >
          <Text style={{ color: theme.colors.surface, fontWeight: 'bold' }} >Don't have an account? {' '}
            <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }} >SignUp</Text>
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  )
}

export default SignInScreen;
