import React, { useState, useCallback, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, StatusBar, View, Text, Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity, useWindowDimensions } from 'react-native'
import { useTheme, Button, TextInput } from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

// components
import AddReminder from './AddReminder';
import AddAsm from './AddAsm';
import AddTask from './AddTask';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// backend
import { DBFetchCourses } from '../utils/db';

const FourthRoute = () => (
  <View style={{ flex: 1 }}>
    <Text>4</Text>
  </View>
);

/* const renderScene: any = SceneMap({
  reminder: AddReminder,
  asm: AddAsm,
  task: ThirdRoute,
  project: FourthRoute,
}); */

const AddModal = ({ isSwipe, closeModal }: { isSwipe: any, closeModal: () => void }) => {

  // const theme = useTheme();

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'reminder', title: 'Reminder' },
    { key: 'asm', title: 'Asm' },
    { key: 'task', title: 'Task' },
    { key: 'schedule', title: 'Schedule' },
  ]);

  const renderScene: any = useCallback(({ route }: { route: any }) => {
    switch (route.key) {
      case 'reminder':
        return <AddReminder />;
      case 'asm':
        return <AddAsm closeModal={closeModal} />;
      case 'task':
        return <AddTask closeModal={closeModal} />;
      case 'schedule':
        return <FourthRoute />;
      default:
        return null;
    }
  }, [closeModal]);

  return (
    <View
      style={{
        width: '100%',
        height: '90%',
      }}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={(props) => (
          <View
            style={{
              paddingHorizontal: 10,
              width: '100%',
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#EEEEEF',
              borderRadius: 7,
            }}
          >
            <TabBar
              {...props}
              indicatorStyle={{
                backgroundColor: '#fff',
                height: '100%',
                borderRadius: 5,
              }}
              indicatorContainerStyle={{
                height: 30,
              }}
              style={{
                backgroundColor: '#EEEEEF',
                borderRadius: 10,
                height: 30,
                width: Dimensions.get('window').width - 46,
              }}
              contentContainerStyle={{
                alignItems: 'center',
              }}
              labelStyle={{
                color: '#000',
                fontSize: 12,
                fontWeight: 'bold',
              }}
            />
          </View>

        )}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </View>
  )
}

export default AddModal;