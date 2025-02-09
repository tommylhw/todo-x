import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
} from 'react';
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
import {useNavigation} from '@react-navigation/native';

// components
import TagsModal from './TagsModal';
import DoneBtn from './DoneBtn';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

// backend
import {DBFetchTagsByUserId, DBCreateDeadline} from '../utils/db';

// Redux Toolkit
import {useSelector, useDispatch} from 'react-redux';
import {selectCurrentUserID} from '../stores/AuthSlice';

const AddDeadline = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const currentUserID = useSelector(selectCurrentUserID);

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [datetime, setDatetime] = useState<any>(() => {
    const defaultDueTime: any = new Date();
    defaultDueTime.setHours(23);
    defaultDueTime.setMinutes(59);
    return defaultDueTime;
  });
  const [dateOpen, setDateOpen] = useState(false);
  const [tags, setTags] = useState<any>([]);
  const [tagsList, setTagsList] = useState<any>([]);

  const [notificationOn, setNotificationOn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [isSwipe, setIsSwipe] = useState(false);

  // Use the userRef hooks to store the data for the headRight button
  const dataRef = useRef<any>();
  useEffect(() => {
    dataRef.current = {
      title: title,
      tags: tags,
      datetime: datetime,
      note: note,
      notificationOn: notificationOn,
      currentUserID: currentUserID,
    };
  }, [title, tags, datetime, note, notificationOn, currentUserID]);

  const handleDBCreateDeadline = async () => {
    // setIsLoading(true);
    const action: any = await DBCreateDeadline(
      dataRef.current.title,
      dataRef.current.tags.map((tag: any) => tag.id),
      dataRef.current.datetime,
      dataRef.current.note,
      dataRef.current.notificationOn,
      dataRef.current.currentUserID,
    );
    if (action) {
      console.log('handleDBCreateDeadline: ', action);
      // setIsLoading(false);
      navigation.goBack();
    }
  };

  useLayoutEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => <DoneBtn onPress={() => handleDBCreateDeadline()} />,
    });
  }, [navigation, handleDBCreateDeadline]);

  const getTextColor = (bgColor: string) => {
    // Convert hex color to RGB
    const rgb = parseInt(bgColor.replace('#', ''), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    // Calculate the relative luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Return white or black based on luminance
    return luminance > 128 ? 'black' : 'white';
  };

  const HandleFetchTagsByUserId = async () => {
    setIsLoading(true);
    const result: any = await DBFetchTagsByUserId(currentUserID);
    console.log('HandleFetchTagsByUserId: ', result);

    const tagsWithTextColor = result.map((tag: any) => ({
      ...tag,
      text_color: getTextColor(tag.color_code),
    }));

    setTagsList(tagsWithTextColor);
    setIsLoading(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const updateSelectedTags = (selectedTags: []) => {
    setTags(selectedTags);
    console.log('updateSelectedTags: ', selectedTags);
  };

  useEffect(() => {
    HandleFetchTagsByUserId();
    // set the default due time for the asm
    const defaultDueTime: any = new Date();
    defaultDueTime.setHours(23);
    defaultDueTime.setMinutes(59);

    setDatetime(defaultDueTime);
  }, []);

  useEffect(() => {
    console.log('tags: ', tags);
  }, [tags]);

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
            paddingHorizontal: 8,
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
            outlineStyle={{
              borderWidth: 0,
            }}
            contentStyle={{
              fontSize: 24,
            }}
            placeholderTextColor={theme.colors.outline}
            activeOutlineColor={theme.colors.primary}
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
              paddingVertical: 5,
            }}
            onPress={() => setModalVisible(true)}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {tags.length > 0 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    // flexWrap: 'wrap',
                    gap: 5,
                  }}>
                  {tags.map((tag: any, index: number) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: tag.color_code,
                        padding: 5,
                        borderRadius: 5,
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          color: tag.text_color,
                        }}>
                        # {tag.title}
                      </Text>
                      <TouchableOpacity
                        style={{
                          marginLeft: 5,
                        }}
                        onPress={() => {
                          setTags(tags.filter((t: any) => t.id !== tag.id));
                        }}>
                        <AntDesign
                          name="close"
                          size={16}
                          color={tag.text_color}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontStyle: 'italic',
                    color: theme.colors.outline,
                  }}>
                  Empty
                </Text>
              )}
            </ScrollView>
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
              <Text>{datetime.toDateString()}</Text>
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
                {datetime
                  .toLocaleTimeString()
                  .localeCompare(new Date().toLocaleTimeString()) === 0
                  ? 'Now'
                  : datetime.toLocaleTimeString('en-US', {
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
              date={datetime}
              onConfirm={datetime => {
                setDatetime(datetime);
                setDateOpen(false);
                console.log('date: ', datetime);
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
              borderWidth: 0,
            }}
            contentStyle={{
              fontSize: 16,
            }}
            activeOutlineColor={theme.colors.primary}
            outlineColor="rgba(0,0,0,0)"
          />
        </View>
      </View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => closeModal()}
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
        <TagsModal
          isSwipe={() => {}}
          updateSelectedTags={updateSelectedTags}
          closeModal={closeModal}
          tagsInit={tags}
          tagsList={tagsList}
        />
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
