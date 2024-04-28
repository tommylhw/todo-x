import React, { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, SafeAreaView, StatusBar, View, Text, Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, RefreshControl } from 'react-native'
import { useTheme, Button, TextInput, Divider } from 'react-native-paper';


// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

// components
import GoBackBtn from '../components/GoBackBtn';
import AddBtn from '../components/AddBtn';

// backend
import { AuthGetCurrentUser } from '../utils/auth';
import { DBFetchAsm, DBFetchCourses, DBFetchUserData } from '../utils/db';

// import Carousel from 'react-native-reanimated-carousel';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

// Redux Toolkit
import { useSelector, useDispatch } from 'react-redux';
import { selectIsSignedIn, selectCurrentUserName, setCurrentUserID, selectCurrentUserID } from '../stores/AuthSlice';
import { setCourses, selectCourses } from '../stores/CoursesSlice';

const dummyAsm = [
  {
    courseCode: "COMP1942",
    assignmentName: "Assignment 1",
    status: "In Progress",
  },
  {
    courseCode: "COMP1942",
    assignmentName: "Assignment 2",
    status: "In Progress",
  },
  {
    courseCode: "COMP1942",
    assignmentName: "Assignment 3",
    status: "In Progress",
  },
  {
    courseCode: "COMP1942",
    assignmentName: "Assignment 4",
    status: "In Progress",
  },
  {
    courseCode: "COMP1942",
    assignmentName: "Assignment 5",
    status: "In Progress",
  },
  {
    courseCode: "COMP1942",
    assignmentName: "Assignment 6",
    status: "In Progress",
  },
  {
    courseCode: "COMP1942",
    assignmentName: "Assignment 7",
    status: "In Progress",
  },
  {
    courseCode: "COMP1942",
    assignmentName: "Assignment 8",
    status: "In Progress",
  },
  {
    courseCode: "COMP1942",
    assignmentName: "Assignment 9",
    status: "In Progress",
  },
  {
    courseCode: "COMP1942",
    assignmentName: "Assignment 10",
    status: "In Progress",
  },
]

const dummyReminders = [
  {
    title: "Meeting with Prof 1",
    date: "2022-10-10",
    time: "10:00",
  },
  {
    title: "Meeting with Prof 2",
    date: "2022-10-10",
    time: "10:00",
  },
  {
    title: "Meeting with Prof 3",
    date: "2022-10-10",
    time: "10:00",
  }
]

const dummyTasks = [
  {
    title: "Task 1",
    date: "2022-10-10",
    time: "10:00",
  },
  {
    title: "Task 2",
    date: "2022-10-10",
    time: "10:00",
  },
  {
    title: "Task 3",
    date: "2022-10-10",
    time: "10:00",
  }
]

const WIDTH = Dimensions.get('window').width;

const HomeScreen = ({ navigation }: { navigation: any }) => {

  const theme = useTheme();
  const dispatch = useDispatch();

  const curreutUserID = useSelector(selectCurrentUserID);

  const [asmData, setAsmData] = useState<any>();

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
      headerLeft: () => <GoBackBtn navigation={navigation} />
    })
  }, []
  );

  const HandleAuthGetCurrentUser = async () => {
    const res: any = await AuthGetCurrentUser();
    console.log("AuthGetCurrentUser: ", res.data);
    const userDataFromDB: any = await DBFetchUserData(res?.data?.session?.user.id);
    console.log("userIdFromDB: ", JSON.parse(userDataFromDB)[0].id);
    dispatch(setCurrentUserID(JSON.parse(userDataFromDB)[0].id));
  }

  const HandleFetchAsm = async () => {
    console.log("curreutUserID: ", curreutUserID)
    const res: any = await DBFetchAsm(curreutUserID);
    console.log("HandleFetchAsm: ", res);

    const upComingAsm = res.filter((asm: any) => {
      const dueDate = new Date(asm.due_date);
      const today = new Date();
      const diffDays = dueDate.getDate() - today.getDate();

      console.log("dueDate: ", dueDate.toLocaleDateString());
      console.log("today: ", today);
      console.log("diffDays: ", diffDays);


      return diffDays > 0;
    });

    setAsmData(upComingAsm);
  }

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      console.log("HomeScreen is focused");
      HandleAuthGetCurrentUser();
      HandleFetchAsm();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log("HomeScreen is unfocused");
      };
    }, [])
  );

  // Fetch Data for the app
  const FetchCourseData = async () => {
    try {
      const res: any = await DBFetchCourses();

      console.log("FetchCourseData: ", JSON.parse(res));
      dispatch(setCourses(res));

    } catch (error) {
      console.log("FetchCourseData error: ", error);
    }
  }

  useEffect(() => {
    FetchCourseData();
    HandleAuthGetCurrentUser();
    HandleFetchAsm();
  }, []);

  // Refresh Control
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    FetchCourseData();
    HandleFetchAsm();
    HandleAuthGetCurrentUser();

    setTimeout(() => {
      setRefreshing(false);
      console.log("Refreshed");
    }, 2000);
  }, []);

  return (
    // <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
    //   <StatusBar />

    <LinearGradient
      colors={['rgb(0, 82, 221)', '#5D96FA']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View
          style={{
            width: '100%',
            height: 150,
            marginTop: 80,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: "#fff",
                marginLeft: 20,
              }}
            >
              Good Morning
            </Text>

            <TouchableOpacity
              style={{
                paddingRight: 30,
                backgroundColor: "rgba(13, 175, 226, 0.6)",
                paddingVertical: 5,
                paddingLeft: 15,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}
            >
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
          }}
        >

          <View
            style={{
              width: '100%',
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
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
              <AddBtn />
            </View>

            <View style={{ width: '100%' }} >
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
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      width: '80%',
                      // height: 100,
                      borderRadius: 7,
                      padding: 15,
                      margin: 10,
                      backgroundColor: "#fff",
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.2,
                    }}
                  >
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
                layout='stack'
              />

            </View>

          </View>

          <View
            style={{
              width: '100%',
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                Upcoming Assignments
              </Text>
              <AddBtn />
            </View>

            <View
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.2,
              }}
            >
              <ScrollView
                // showsVerticalScrollIndicator
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 7,
                  marginTop: 10,
                  paddingHorizontal: 10,
                  backgroundColor: "#fff",
                }}
              >
                {/* {
                  dummyAsm.map((asm, index) => (
                    <>
                      <TouchableOpacity
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 10,
                          gap: 10,
                        }}
                      >
                        <View
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            backgroundColor: "#6E42C1",
                            borderRadius: 5,
                          }}
                        >
                          <Text style={{ color: '#fff' }}>
                            COMP1942
                          </Text>
                        </View>

                        <View style={{ flex: 1, }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode='tail'
                          >
                            Assignment 1 #################################
                          </Text>
                        </View>

                        <View
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: "#F8C510",
                            borderRadius: 5,
                          }}
                        >
                          <Text style={{ color: '#F8C510', fontWeight: 'bold' }} >
                            4 days
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <Divider />
                    </>

                  ))
                } */}

                {
                  asmData?.map((asm: any, index: number) => (
                    <View key={index}>
                      <TouchableOpacity

                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 10,
                          gap: 10,
                        }}
                      >
                        <View
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            backgroundColor: "#6E42C1",
                            borderRadius: 5,
                          }}
                        >
                          <Text style={{ color: '#fff' }}>
                            {asm.course}
                          </Text>
                        </View>

                        <View style={{ flex: 1, }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode='tail'
                          >
                            {asm.title}
                          </Text>
                        </View>

                        <View
                          style={{
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: "#F8C510",
                            borderRadius: 5,
                          }}
                        >
                          <Text style={{ color: '#F8C510', fontWeight: 'bold' }} >
                            {/* {diffDays} days */}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <Divider />
                    </View>
                  ))
                }

              </ScrollView>
            </View>


          </View>

          <View
            style={{
              width: '100%',
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                Next Tasks
              </Text>
              <AddBtn />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 5,
              }}
            >
              {
                dummyTasks.map((task, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: 200,
                      height: 125,
                      borderRadius: 7,
                      marginRight: 10,
                      padding: 10,
                      backgroundColor: "#fff",
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.2,
                    }}
                  >
                    <Text>{task.title}</Text>
                    <Text>{task.date}</Text>
                    <Text>{task.time}</Text>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>

          </View>

        </View>
      </ScrollView>
    </LinearGradient>

    // </SafeAreaView>
  )
}

export default HomeScreen;
