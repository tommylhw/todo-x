import React, {useState, useCallback, useLayoutEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {useTheme, Button, TextInput, Switch, Divider} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {transparent} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const AddDeadline = () => {
  const theme = useTheme();

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const [tag, setTag] = useState([]);

  const [notificationOn, setNotificationOn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [isSwipe, setIsSwipe] = useState(false);

  return (
    <ScrollView
      style={{
        width: '100%',
      }}>
      <View
        style={{
          // flex: 1,
          width: '100%',
          // height: '100%',
          // alignItems: 'center',
          // paddingHorizontal: 10,
          paddingVertical: 10,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: '100%',
            marginBottom: 10,
            paddingHorizontal: 10,
          }}>
          {/* <Text>Title</Text> */}

          <TextInput
            mode="outlined"
            placeholder="Title"
            // keyboardType='email-address'
            value={title}
            onChangeText={text => setTitle(text)}
            style={{
              width: '100%',
              backgroundColor: '#fff',
              // marginVertical: 5,
              // height: 50,
            }}
            outlineStyle={
              {
                // borderRadius: 7,
              }
            }
            contentStyle={{
              fontSize: 24,
            }}
            placeholderTextColor={theme.colors.outline}
            activeOutlineColor="rgba(0,0,0,0)"
            outlineColor="rgba(150, 43, 43, 0)"
          />
        </View>

        <View
          style={{
            width: '100%',
            marginVertical: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
            // paddingVertical: 10,
            // backgroundColor: theme.colors.surface,
          }}>
          <Text
            style={{
              fontSize: 16,
            }}>
            Tags
          </Text>
          <TouchableOpacity
            style={{
              flex: 0.7,
            }}
            onPress={() => setModalVisible(true)}>
            <Text
              style={{
                fontSize: 16,
                fontStyle: 'italic',
                color: theme.colors.outline,
              }}>
              Empty
            </Text>
          </TouchableOpacity>
        </View>

        {/* <Divider /> */}

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
            marginVertical: 10,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
            }}>
            Due Date
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}>
            <TouchableOpacity
              style={{
                // width: '50%',
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: theme.colors.surface,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 7,
              }}
              onPress={() => setDateOpen(true)}>
              <Text>{date.toDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                // width: '50%',
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: theme.colors.surface,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 7,
              }}
              onPress={() => setDateOpen(true)}>
              <Text>
                {date
                  .toLocaleTimeString()
                  .localeCompare(new Date().toLocaleTimeString()) === 0
                  ? 'Now'
                  : date.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false,
                    })}
              </Text>
            </TouchableOpacity>

            <DatePicker
              modal
              mode="datetime"
              open={dateOpen}
              date={date}
              onConfirm={date => {
                setDate(date);
                setDateOpen(false);
                console.log('date: ', date);
              }}
              onCancel={() => setDateOpen(false)}
            />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
            }}>
            Notificaton
          </Text>
          <Switch
            style={{
              transform: [{scaleX: 0.9}, {scaleY: 0.9}],
            }}
            value={notificationOn}
            color={theme.colors.primary}
            onValueChange={() => setNotificationOn(!notificationOn)}
          />
        </View>

        {/* <Divider /> */}

        <View
          style={{
            // width: '100%',
            marginVertical: 10,
            marginHorizontal: 20,
          }}>
          {/* <Text>Note</Text> */}

          <TextInput
            mode="outlined"
            placeholder="Add your note here"
            multiline
            value={note}
            onChangeText={text => setNote(text)}
            style={{
              width: '100%',
              backgroundColor: theme.colors.surface,
              marginVertical: 5,
              height: 200,
            }}
            outlineStyle={{
              borderRadius: 7,
            }}
            contentStyle={{
              fontSize: 16,
            }}
            activeOutlineColor="rgba(0,0,0,0)"
            outlineColor="rgba(0,0,0,0)"
          />
        </View>
      </View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={{margin: 0}}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        swipeDirection="down"
        onSwipeStart={() => setIsSwipe(true)}
        onSwipeMove={(persentageShown: any) => {
          // console.log("persentageShown: ", persentageShown);
        }}
        onSwipeComplete={() => setModalVisible(false)}
        onSwipeCancel={() => setIsSwipe(false)}>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '50%',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 20,
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          {/* Swipe Indicator */}
          <View
            style={{
              width: '20%',
              height: 5,
              backgroundColor: isSwipe ? '#000' : '#ccc',
              borderRadius: 100,
              marginBottom: 20,
            }}></View>
          {/* Header */}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                // color: theme.colors.primary,
                color: '#000',
              }}>
              New Event
            </Text>
            <TouchableOpacity>
              <AntDesign
                name="close"
                size={24}
                color="#000"
                onPress={() => setModalVisible(false)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <TouchableOpacity
        style={{
          width: '100%',
          height: 50,
          backgroundColor: theme.colors.primary,
          opacity: !title ? 0.5 : 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
          borderRadius: 7,
          bottom: 0,
        }}
        disabled={!title} // set the button to disabled if the input-box is empty
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#fff',
            }}>
            Add
          </Text>
        )}
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default AddDeadline;
