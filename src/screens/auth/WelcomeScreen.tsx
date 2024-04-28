import React, { useState, useCallback, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, StatusBar, View, Text, Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from 'react-native'
import { useTheme, Button, TextInput } from 'react-native-paper';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const WelcomeScreen = ({ navigation }: { navigation: any }) => {

  const theme = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.primary, flex: 1 }} >
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
        <View style={{ width: '100%', alignItems: 'center', marginTop: 100 }} >
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: '#fff',
              textAlign: 'center',
              marginBottom: 30,
            }}
          >
            Welcome to TodoX
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: '#fff',
              textAlign: 'center',
            }}
          >
            Empower Your Productivity, {"\n"} <Text style={{ fontWeight: 'bold' }} >Every Day!</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={{
            width: '100%',
            paddingVertical: 18,
            backgroundColor: '#fff',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 50,
          }}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: theme.colors.primary,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>


      </View>

    </SafeAreaView>
  )
}

export default WelcomeScreen;
