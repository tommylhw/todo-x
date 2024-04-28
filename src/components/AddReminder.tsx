import React, { useState, useCallback, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, SafeAreaView, StatusBar, View, Text, Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from 'react-native'
import { useTheme, Button, TextInput, Switch, Divider } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'


// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddReminder = () => {

  const theme = useTheme();

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date())
  const [dateOpen, setDateOpen] = useState(false)

  const [notificationOn, setNotificationOn] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        // alignItems: 'center',
        // paddingHorizontal: 10,
        paddingVertical: 20,
        justifyContent: 'space-between',
      }}
    >
      <View>
        <View
          style={{
            width: '100%',
            marginBottom: 10,
          }}
        >
          <Text>Title</Text>

          <TextInput
            mode='outlined'
            placeholder='Enter the title'
            // keyboardType='email-address'
            value={title}
            onChangeText={text => setTitle(text)}
            style={{
              width: '100%',
              backgroundColor: '#F6F6F6',
              marginVertical: 5,
              height: 50,
            }}
            outlineStyle={{
              borderRadius: 7,
            }}
            contentStyle={{
              fontSize: 16,
            }}
            // activeOutlineColor='rgba(0,0,0,0)'
            outlineColor='rgba(0,0,0,0)'
          />
        </View>

        <Divider />

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            gap: 10,
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: '50%',
              paddingVertical: 10,
              backgroundColor: '#F6F6F6',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
            }}
            onPress={() => setDateOpen(true)}
          >
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '50%',
              paddingVertical: 10,
              backgroundColor: '#F6F6F6',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
            }}
            onPress={() => setDateOpen(true)}
          >
            <Text>
              {date.toLocaleTimeString().localeCompare(
                new Date().toLocaleTimeString()
              ) === 0 ? "Now" : date.toLocaleTimeString(
                'en-US',
                { hour: 'numeric', minute: 'numeric', hour12: false }
              )}
            </Text>
          </TouchableOpacity>

          <DatePicker
            modal
            mode='datetime'
            open={dateOpen}
            date={date}
            onConfirm={(date) => {
              setDate(date)
              setDateOpen(false)
              console.log("date: ", date);
            }}
            onCancel={() => setDateOpen(false)}
          />
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Notificaton
          </Text>
          <Switch
            style={{
              transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
            }}
            value={notificationOn}
            color={theme.colors.primary}
            onValueChange={() => setNotificationOn(!notificationOn)}
          />
        </View>

        <Divider />

        <View
          style={{
            width: '100%',
            marginVertical: 10,
          }}
        >
          {/* <Text>Note</Text> */}

          <TextInput
            mode='outlined'
            placeholder='Add your note here'
            multiline
            value={note}
            onChangeText={text => setNote(text)}
            style={{
              width: '100%',
              backgroundColor: '#F6F6F6',
              marginVertical: 5,
              height: 200,
            }}
            outlineStyle={{
              borderRadius: 7,
            }}
            contentStyle={{
              fontSize: 16,
            }}
            // activeOutlineColor='rgba(0,0,0,0)'
            outlineColor='rgba(0,0,0,0)'
          />
        </View>


      </View>


      <TouchableOpacity
        style={{
          width: '100%',
          height: 50,
          backgroundColor: theme.colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 7,
          bottom: 0,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          Add
        </Text>
      </TouchableOpacity>

    </View>
  )
}

export default AddReminder;