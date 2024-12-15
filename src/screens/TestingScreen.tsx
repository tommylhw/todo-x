import React, {useState, useCallback, useLayoutEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {useTheme, Button, TextInput} from 'react-native-paper';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {supabase} from '../lib/supabase';

import {executeSQL} from '../utils/api';

const TestingScreen = () => {
  const theme = useTheme();

  const HandleCreateUserData = async () => {
    try {
      const {data, error} = await supabase
        .from('User')
        .insert([
          {
            username: 'Tommy',
            email: 'testing@gmail.com',
            password: '123123',
            auth_id: '111',
          },
        ])
        .select();

      console.log('HandleCreateUserData: ', data);
    } catch (error) {
      console.log('HandleCreateUserData error: ', error);
    }
  };

  const HandleReadUserData = async () => {
    try {
      let {data, error}: any = await supabase.from('User').select('*');

      console.log('HandleReadUserData: ', data);
    } catch (error) {
      console.log('HandleReadUserData error: ', error);
    }
  };

  const HandleSQL = async (sql: string) => {
    await executeSQL('SELECT * FROM sys_user')
      .then(data => {
        console.log(JSON.stringify(data));
      })
      .catch(error => {
        console.error("HandleSQL error: ", error);
      });
  };

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.background}}>
      <StatusBar />
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}>
        <Text>Testing Screen</Text>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            gap: 10,
            marginTop: 20,
            flexWrap: 'wrap',
          }}>
          <Button mode="contained" onPress={() => HandleCreateUserData()}>
            <Text>Create User Data</Text>
          </Button>

          <Button mode="contained" onPress={() => HandleReadUserData()}>
            <Text>Read User Data</Text>
          </Button>

          <Button mode="contained" onPress={() => HandleSQL("")}>
            <Text>Custom SQL Query</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TestingScreen;
