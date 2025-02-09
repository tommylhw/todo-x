import React, {useState, useCallback, useLayoutEffect, useEffect} from 'react';
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
  RefreshControl,
} from 'react-native';
import {useTheme, Button, TextInput, Divider} from 'react-native-paper';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

// components
import GoBackBtn from '../components/GoBackBtn';
import AddBtn from '../components/AddBtn';

// backend
import {AuthGetCurrentUser} from '../utils/auth';
import {
  DBFetchAsms,
  DBFetchCourses,
  DBFetchUserData,
  DBFetchTasks,
  DBFetchDeadline,
} from '../utils/db';

// import Carousel from 'react-native-reanimated-carousel';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

// Redux Toolkit
import {useSelector, useDispatch} from 'react-redux';
import {
  selectIsSignedIn,
  selectCurrentUserName,
  setCurrentUserID,
  selectCurrentUserID,
} from '../stores/AuthSlice';
import {setCourses, selectCourses} from '../stores/CoursesSlice';
import AsmComponent from '../components/AsmComponent';
import TaskComponent from '../components/TaskComponent';

const dummyReminders = [
  {
    title: 'Meeting with Prof 1',
    date: '2022-10-10',
    time: '10:00',
  },
  {
    title: 'Meeting with Prof 2',
    date: '2022-10-10',
    time: '10:00',
  },
  {
    title: 'Meeting with Prof 3',
    date: '2022-10-10',
    time: '10:00',
  },
];

const WIDTH = Dimensions.get('window').width;

const HomeScreen = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const curreutUserID = useSelector(selectCurrentUserID);

  const [asmData, setAsmData] = useState<any>();
  const [tasksData, setTasksData] = useState<any>();
  const [deadlineData, setDeadlineData] = useState<any>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTitle: 'HomeScreen',
      headerTitleAlign: 'center',
      headerTransparent: true, // hide header border
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerLeft: () => <GoBackBtn navigation={navigation} />,
    });
  }, []);

  const HandleAuthGetCurrentUser = async () => {
    const res: any = await AuthGetCurrentUser();
    console.log('AuthGetCurrentUser: ', res.data);
    const userDataFromDB: any = await DBFetchUserData(
      res?.data?.session?.user.id,
    );
    console.log('userIdFromDB: ', JSON.parse(userDataFromDB)[0].id);
    dispatch(setCurrentUserID(JSON.parse(userDataFromDB)[0].id));
  };

  const HandleFetchAsms = async () => {
    // console.log("curreutUserID: ", curreutUserID)
    const res: any = await DBFetchAsms(curreutUserID);

    const upComingAsm = res
      .map((asm: any) => {
        const dueDate = new Date(asm.due_date);
        const today = new Date();

        dueDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const options = {timeZone: 'Asia/Hong_Kong'};

        const dueDateHKG = dueDate.toLocaleDateString('en-US', options);
        const todayHKG = today.toLocaleDateString('en-US', options);

        const timeDiff = dueDate.getTime() - today.getTime(); // Difference in milliseconds
        const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

        // console.log("TODAY:", today, "DUE:", dueDate, "Diff:", diffDays); // Output: 4
        asm.diffDays = diffDays;

        return asm;
      })
      .sort((a: any, b: any) => a.diffDays - b.diffDays)
      .filter((asm: any) => asm.diffDays > 0);

    console.log('upComingAsm: ', upComingAsm);

    setAsmData(upComingAsm);
  };

  const HandleFetchDeadline = async () => {
    const res: any = await DBFetchDeadline(curreutUserID);

    const upComingDeadline = res
      .map((deadline: any) => {
        const dueDate = new Date(deadline.due_datetime);
        const today = new Date();

        dueDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const options = {timeZone: 'Asia/Hong_Kong'};

        const dueDateHKG = dueDate.toLocaleDateString('en-US', options);
        const todayHKG = today.toLocaleDateString('en-US', options);

        const timeDiff = dueDate.getTime() - today.getTime(); // Difference in milliseconds
        const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

        // console.log("TODAY:", today, "DUE:", dueDate, "Diff:", diffDays); // Output: 4
        deadline.diffDays = diffDays;

        return deadline;
      })
      .sort((a: any, b: any) => a.diffDays - b.diffDays)
      .filter((deadline: any) => deadline.diffDays > 0);

    console.log('upComingDeadline: ', upComingDeadline);
    setDeadlineData(upComingDeadline);
  };

  const HandleFetchTasks = async () => {
    const res: any = await DBFetchTasks(curreutUserID);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7); // Calculate the date 7 days from now
    nextWeek.setHours(0, 0, 0, 0); // Set time to midnight

    const upComingWeekTasks = res.filter((task: any) => {
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0); // Set time to midnight

      return taskDate >= today && taskDate < nextWeek;
    });

    console.log('up coming tasks: ', upComingWeekTasks);
    setTasksData(upComingWeekTasks);
  };

  // Fetch Data for the app
  const FetchCourseData = async () => {
    try {
      const res: any = await DBFetchCourses();

      console.log('FetchCourseData: ', JSON.parse(res));
      dispatch(setCourses(res));
    } catch (error) {
      console.log('FetchCourseData error: ', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      console.log('HomeScreen is focused');
      HandleAuthGetCurrentUser();
      HandleFetchAsms();
      HandleFetchTasks();
      HandleFetchDeadline();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('HomeScreen is unfocused');
      };
    }, []),
  );

  useEffect(() => {
    FetchCourseData();
    HandleAuthGetCurrentUser();
    HandleFetchAsms();
    HandleFetchTasks();
    HandleFetchDeadline();
  }, []);

  // Refresh Control
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    FetchCourseData();
    HandleFetchAsms();
    HandleFetchDeadline();
    HandleFetchTasks();
    HandleAuthGetCurrentUser();

    setTimeout(() => {
      setRefreshing(false);
      console.log('Refreshed');
    }, 2000);
  }, []);

  return (
    // <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
    //   <StatusBar />

    <LinearGradient
      colors={['rgb(0, 82, 221)', '#5D96FA']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{
        width: '100%',
        height: '100%',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            width: '100%',
            height: 150,
            marginTop: 80,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: '#fff',
                marginLeft: 20,
              }}>
              Good Morning
            </Text>

            <TouchableOpacity
              style={{
                paddingRight: 30,
                backgroundColor: 'rgba(13, 175, 226, 0.6)',
                paddingVertical: 5,
                paddingLeft: 15,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}>
              <Ionicons name="notifications" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 30,
            // backgroundColor: 'rgba(255, 255, 255, 0.8)',
            // backgroundColor: '#fff',
            backgroundColor: '#EEEFF5',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <View
            style={{
              width: '100%',
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Reminders
              </Text>
              {/* <TouchableOpacity
                style={{
                  marginRight: 10,
                }}
                onPress={() => console.log("Add new assignment")}
              >
                <AntDesign name="pluscircle" size={20} color={theme.colors.primary} />
              </TouchableOpacity> */}
              <AddBtn refresh={() => onRefresh()} />
            </View>

            <View style={{width: '100%'}}>
              {/* <Carousel
              data={dummyReminders}
              loop
              autoPlay={false}
              width={WIDTH}
              height={100}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => console.log('current index:', index)}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    width: '80%',
                    height: 100,
                    backgroundColor: theme.colors.surface,
                    borderRadius: 7,
                    padding: 10,
                    margin: 10,
                  }}
                >
                  <Text>{item.title}</Text>
                  <Text>{item.date}</Text>
                  <Text>{item.time}</Text>
                </View>
              )}
            /> */}

              <Carousel
                data={dummyReminders}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      width: '80%',
                      // height: 100,
                      borderRadius: 7,
                      padding: 15,
                      margin: 10,
                      backgroundColor: '#fff',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.2,
                    }}>
                    <Text>{item.title}</Text>
                    <Text>{item.date}</Text>
                    <Text>{item.time}</Text>
                  </View>
                )}
                sliderWidth={WIDTH}
                itemWidth={WIDTH}
                loop
                autoplay
                enableMomentum={false}
                lockScrollWhileSnapping
                layout="stack"
              />
            </View>
          </View>

          <View
            style={{
              width: '100%',
              marginTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Upcoming deadlines
              </Text>
              <AddBtn refresh={() => onRefresh()} />
            </View>

            <View
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.2,
              }}>
              <ScrollView
                // showsVerticalScrollIndicator
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 7,
                  marginTop: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  backgroundColor: '#fff',
                }}>
                {asmData?.map((asm: any, index: number) => (
                  <AsmComponent
                    key={index}
                    asm={asm}
                    refresh={() => onRefresh()}
                  />
                ))}
              </ScrollView>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              marginTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Next Tasks
              </Text>
              <AddBtn refresh={() => onRefresh()} />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 5,
              }}>
              {tasksData?.map((task: any, index: number) => (
                <TaskComponent
                  key={index}
                  task={task}
                  refresh={() => onRefresh()}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>

    // </SafeAreaView>
  );
};

export default HomeScreen;
