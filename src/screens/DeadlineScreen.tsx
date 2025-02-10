import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
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
  ScrollView,
} from 'react-native';
import {useTheme, Button, TextInput, Switch, Divider} from 'react-native-paper';
import {HeaderBackButton, HeaderBackContext} from '@react-navigation/elements';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';

// components
import GoBackBtn from '../components/GoBackBtn';
import DoneBtn from '../components/DoneBtn';
import TagsModal from '../components/TagsModal';
import TagComponent from '../components/TagComponent';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AddModal from '../components/AddModal';
import AddScreenTab from '../components/AddScreenTab';

// backend
import {DBFetchTagsByUserId, DBCreateDeadline} from '../utils/db';

// Redux Toolkit
import {useSelector, useDispatch} from 'react-redux';
import {selectCurrentUserID} from '../stores/AuthSlice';

const DeadlineScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const theme = useTheme();
  const currentUserID = useSelector(selectCurrentUserID);

  const deadline = route.params?.deadline ? route.params.deadline : null;

  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState<string>(deadline?.title);
  const [tags, setTags] = useState<any[]>(deadline?.tags);
  const [note, setNote] = useState<string>(deadline?.note);
  const [datetime, setDatetime] = useState<any>(new Date(deadline?.datetime));
  const [notificationOn, setNotificationOn] = useState<boolean>(
    deadline?.notification_on,
  );

  useEffect(() => {
    // init deadline
    if (deadline) {
      setTitle(deadline.title);
      setTags(deadline.tags);
      setNote(deadline.note);
      setNotificationOn(deadline.notification_on);

      console.log('init tags: ', deadline.tags);
      console.log('init deadline: ', deadline);
    }
  }, [deadline]);

  const [tagsList, setTagsList] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSwipe, setIsSwipe] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Deadline Details',
      headerTitleAlign: 'center',
      headerTransparent: true, // hide header border
      headerTitleStyle: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.onSurfaceVariant,
      },
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerLeft: () =>
        React.createElement(HeaderBackButton, {
          labelVisible: false,
          onPress: () => navigation.goBack(),
        }),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            console.log(editMode);
            setEditMode(editMode => !editMode);
          }}>
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: 16,
            }}>
            {editMode ? 'Done' : 'Edit'}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, editMode]);

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <StatusBar />
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          backgroundColor: '#fff',
          // paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
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
                paddingHorizontal: 20,
              }}>
              {editMode ? (
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
              ) : (
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}>
                  {title}
                </Text>
              )}
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
              {editMode ? (
                <TouchableOpacity
                  style={{
                    flex: 0.7,
                    paddingVertical: 5,
                  }}
                  onPress={() => setModalVisible(true)}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {tags?.length > 0 ? (
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
                                setTags(
                                  tags.filter((t: any) => t.id !== tag.id),
                                );
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
              ) : (
                <View
                  style={{
                    flex: 0.7,
                    // flexDirection: 'row',
                    alignItems: 'flex-end',
                  }}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                      }}>
                      {tags?.length > 0 ? (
                        tags.map((tag: any, index: number) => (
                          <TagComponent key={index} tag={tag} />
                        ))
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
                    </View>
                  </ScrollView>
                </View>
              )}
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
                {editMode ? (
                  <View>
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
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      // borderWidth: 1,
                    }}>
                    <Text
                      style={{
                        // width: '50%',
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        backgroundColor: theme.colors.surface,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 7,
                      }}>
                      {datetime.toLocaleDateString('en-US', {
                        timeZone: 'Asia/Hong_Kong',
                      })}
                    </Text>
                    <Text
                      style={{
                        // width: '50%',
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        backgroundColor: theme.colors.surface,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 7,
                      }}>
                      {datetime.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                        timeZone: 'Asia/Hong_Kong',
                      })}
                    </Text>
                  </View>
                )}
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
              {editMode ? (
                <Switch
                  style={{
                    transform: [{scaleX: 0.9}, {scaleY: 0.9}],
                  }}
                  value={notificationOn}
                  color={theme.colors.primary}
                  onValueChange={() => setNotificationOn(!notificationOn)}
                />
              ) : (
                <Text>{notificationOn ? 'On' : 'Off'}</Text>
              )}
            </View>

            {/* <Divider /> */}

            <View
              style={{
                // width: '100%',
                marginVertical: 10,
                marginHorizontal: 20,
              }}>
              {editMode ? (
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
              ) : (
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                  }}>
                  <Divider />
                  <Text>{note}</Text>
                </View>
              )}
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
              tagsInit={[]}
              tagsList={tagsList}
            />
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DeadlineScreen;
