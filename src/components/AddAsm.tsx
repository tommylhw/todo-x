import React, {useState, useCallback, useLayoutEffect, useEffect} from 'react';
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
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {useTheme, Button, TextInput, Switch, Divider} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';

// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DBFetchCourses} from '../utils/db';

// Redux Toolkit
import {useSelector, useDispatch} from 'react-redux';
import {selectCurrentUserID} from '../stores/AuthSlice';
import {selectCourses} from '../stores/CoursesSlice';

// Backend
import {DBCreateAsm} from '../utils/db';

const AddAsm = ({closeModal}: {closeModal: () => void}) => {
  const theme = useTheme();
  const coursesData = useSelector(selectCourses);

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [notificationOn, setNotificationOn] = useState(true);
  const [date, setDate] = useState<any>(new Date());
  const [dateOpen, setDateOpen] = useState(false);

  // course dropdown picker
  const [courseDropDownOpen, setCourseDropDownOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | any>();
  const [courseItems, setCourseItems] = useState<any>([]);

  // status dropdown picker
  const [statusDropDownOpen, setStatusDropDownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('0');

  const [isLoading, setIsLoading] = useState(false);

  const currentUserID = useSelector(selectCurrentUserID);

  const HandleCreateAsm = async () => {
    try {
      setIsLoading(true);
      const action: any = await DBCreateAsm(
        title,
        selectedCourseId,
        notificationOn,
        date,
        '23:59',
        note,
        selectedStatus,
        currentUserID,
      );

      console.log('HandleCreateAsm: ', action);
      setIsLoading(false);
      closeModal();
    } catch (error) {
      console.log('HandleCreateAsm error: ', error);
    }
  };

  useEffect(() => {
    // set the default due time for the asm
    const defaultDueTime = new Date();
    defaultDueTime.setHours(23);
    defaultDueTime.setMinutes(59);

    setDate(defaultDueTime);

    // set the course items
    setCourseItems(
      JSON.parse(coursesData)?.map((item: any, index: number) => {
        return {
          label: item.title,
          value: item.id,
        };
      }),
    );
  }, []);

  // useEffect(
  //   useCallback(() => {
  //     // Do something when the screen is focused
  //     console.log('AddAsm is focused');
  //     // HandleAuthGetCurrentUser();
  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //       console.log('AddAsm is unfocused');
  //     };
  //   }, []),
  // );

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        paddingVertical: 20,
        justifyContent: 'space-between',
      }}>
      <View>
        <View
          style={{
            width: '100%',
            marginBottom: 10,
          }}>
          <Text>Title</Text>

          <TextInput
            mode="outlined"
            placeholder="Enter the title"
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
            outlineColor="rgba(0,0,0,0)"
          />
        </View>

        <Divider />

        <View
          style={{
            width: '100%',
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10,
          }}>
          <Text>Course</Text>
          <View
            style={{
              paddingHorizontal: 10,
              zIndex: 10,
            }}>
            <DropDownPicker
              items={courseItems}
              open={courseDropDownOpen}
              setOpen={setCourseDropDownOpen}
              value={selectedCourseId}
              setValue={setSelectedCourseId}
              placeholder="Select a course"
              closeAfterSelecting={true}
              containerStyle={{
                width: 200,
                borderWidth: 0,
                shadowColor: '#000',
                // shadowOffset: {
                //   width: 1,
                //   height: 1,
                // },
                // shadowOpacity: 0.1,
              }}
              listMode="FLATLIST"
              dropDownContainerStyle={{
                // backgroundColor: '#F6F6F6',
                borderTopWidth: 1,
                borderTopColor: '#ccc',
                borderWidth: 0,
              }}
              style={{
                borderWidth: 0,
                backgroundColor: '#F6F6F6',
              }}
            />
          </View>
        </View>

        <Divider />

        <View
          style={{
            width: '100%',
            marginVertical: 10,
          }}>
          <Text>Due on</Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              gap: 10,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                width: '50%',
                paddingVertical: 10,
                backgroundColor: '#F6F6F6',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 7,
              }}
              onPress={() => setDateOpen(true)}>
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
                      timeZone: 'Asia/Hong_Kong',
                    })}
              </Text>
            </TouchableOpacity>

            <DatePicker
              modal
              mode="date"
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

        {/* Notification */}
        {/* <View
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
        </View> */}

        <Divider />

        <View
          style={{
            width: '100%',
            marginVertical: 10,
            paddingHorizontal: 5,
            zIndex: 9,
          }}>
          <Text>Status</Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              gap: 10,
              marginVertical: 5,
              zIndex: 9,
            }}>
            <DropDownPicker
              items={[
                {label: 'Not Started', value: '0'},
                {label: 'In Progress', value: '1'},
                {label: 'Completed', value: '2'},
              ]}
              open={statusDropDownOpen}
              setOpen={setStatusDropDownOpen}
              value={selectedStatus}
              setValue={setSelectedStatus}
              placeholder="Select a status"
              closeAfterSelecting={true}
              containerStyle={{
                width: '100%',
                borderWidth: 0,
                shadowColor: '#000',
                // shadowOffset: {
                //   width: 1,
                //   height: 1,
                // },
                // shadowOpacity: 0.1,
              }}
              listMode="FLATLIST"
              dropDownContainerStyle={{
                // backgroundColor: '#F6F6F6',
                borderTopWidth: 1,
                borderTopColor: '#ccc',
                borderWidth: 0,
              }}
              style={{
                borderWidth: 0,
                backgroundColor: '#F6F6F6',
              }}
            />
          </View>
        </View>

        <Divider />

        <View
          style={{
            width: '100%',
            marginVertical: 10,
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
            outlineColor="rgba(0,0,0,0)"
          />
        </View>
      </View>

      <TouchableOpacity
        style={{
          width: '100%',
          height: 50,
          backgroundColor: theme.colors.primary,
          opacity: !title || !selectedCourseId || !selectedStatus ? 0.5 : 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
          borderRadius: 7,
          bottom: 0,
        }}
        disabled={!title || !selectedCourseId || !selectedStatus} // set the button to disabled if the input-box is empty
        onPress={() => HandleCreateAsm()}>
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
      </TouchableOpacity>
    </View>
  );
};

export default AddAsm;
