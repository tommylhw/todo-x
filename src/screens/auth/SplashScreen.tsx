import { SafeAreaView, StatusBar, View, Text, Dimensions, Image } from 'react-native'
import React from 'react'

const SplashScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar />

      <View
        style={{
          width: '100%',
          // height: Dimensions.get('window').height,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../assets/app_icon.png')}
            style={{
              width: 120,
              height: 120,
            }}
            resizeMode='contain'
          />
          <Image
            source={require('../../assets/text_logo.png')}
            style={{
              width: 150,
              // height: 120,
            }}
            resizeMode='contain'
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: '#000',
            }}
          >
             Empower Your Productivity, Every Day!
          </Text>
        </View>



      </View>

    </SafeAreaView>
  )
}

export default SplashScreen