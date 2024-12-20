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
import DropDownPicker from 'react-native-dropdown-picker';

// Redux toolkit
import {useSelector} from 'react-redux';
import {selectCurrentUserID} from '../stores/AuthSlice';

// backend
import {DBCreateTask} from '../utils/db';

const AddTask = ({closeModal}: {closeModal: () => void}) => {
  const theme = useTheme();
  const currentUserID = useSelector(selectCurrentUserID);

  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);

  const [tagDropDownOpen, setTagDropDownOpen] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState(0);
  const [tagItems, setTagItems] = useState([
    {label: 'Personal', value: 0},
    {label: 'Work', value: 1},
    {label: 'Study', value: 2},
  ]);

  // shift dropdown picker
  const [shiftDropDownOpen, setShiftDropDownOpen] = useState(false);
  const [selectedShiftIds, setSelectedShiftIds] = useState<string[]>([]);
  const [shiftItems, setShiftItems] = useState([
    {label: 'Morning', value: '0', icon: () => <Text>☀️</Text>},
    {label: 'Afternoon', value: '1', icon: () => <Text>🌄</Text>},
    {label: 'Evening', value: '2', icon: () => <Text>🌃</Text>},
  ]);

  // status dropdown picker
  const [statusDropDownOpen, setStatusDropDownOpen] = useState(false);
  const [selectedStatusId, setSelectedStatusId] = useState(0);
  const [statusItems, setStatusItems] = useState([
    {label: 'Not Started', value: 0},
    {label: 'In Progress', value: 1},
    {label: 'Completed', value: 2},
  ]);

  const HandleCreateTask = async () => {
    setIsLoading(true);
    console.log('selectedShiftId: ', selectedShiftIds);
    const action: any = await DBCreateTask(
      title,
      date,
      selectedShiftIds,
      selectedStatusId,
      note,
      currentUserID,
    );

    if (action) {
      setTitle('');
      setDate(new Date());
      setNote('');
      setSelectedShiftIds([]);
      setSelectedStatusId(0);

      console.log('HandleCreateTask: ', action);
      setIsLoading(false);
      closeModal();
    }
  };

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
      }}>
      <View>
        <View
          style={{
            width: '100%',
            marginBottom: 10,
            gap: 5,
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

        <View
          style={{
            width: '100%',
            gap: 5,
            marginVertical: 10,
            zIndex: 11,
          }}>
          <Text>Tag</Text>
          <DropDownPicker
            items={tagItems}
            open={tagDropDownOpen}
            setOpen={setTagDropDownOpen}
            value={selectedTagId}
            setValue={setSelectedTagId}
            placeholder=""
            closeAfterSelecting={true}
            containerStyle={{
              width: '100%',
              borderWidth: 0,
              borderRadius: 7,
              shadowColor: '#000',
              backgroundColor: '#F6F6F6',
            }}
            listMode="FLATLIST"
            dropDownContainerStyle={{
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

        <Divider />

        {/* <View
          style={{
            width: '100%',
            flexDirection: 'row',
            gap: 10,
            marginVertical: 10,
            zIndex: 10,
          }}
        > */}
        <View
          style={{
            width: '100%',
            gap: 5,
            marginVertical: 10,
          }}>
          <Text>Date</Text>
          <TouchableOpacity
            style={{
              width: '100%',
              paddingVertical: 10,
              backgroundColor: '#F6F6F6',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
            }}
            onPress={() => setDateOpen(true)}>
            <Text>{date.toDateString()}</Text>
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

        <View
          style={{
            width: '100%',
            gap: 5,
            marginVertical: 10,
            zIndex: 10,
          }}>
          <Text>Shift</Text>
          <DropDownPicker
            multiple={true}
            min={1}
            max={3}
            mode="BADGE"
            items={shiftItems}
            open={shiftDropDownOpen}
            setOpen={setShiftDropDownOpen}
            value={selectedShiftIds}
            setValue={setSelectedShiftIds}
            placeholder="When to do this task?"
            containerStyle={{
              width: '100%',
              borderWidth: 0,
              borderRadius: 7,
              shadowColor: '#000',
              backgroundColor: '#F6F6F6',
            }}
            listMode="FLATLIST"
            dropDownContainerStyle={{
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
        {/* </View> */}
        

        <View
          style={{
            width: '100%',
            gap: 5,
            marginVertical: 10,
            zIndex: 9,
          }}>
          <Text>Status</Text>
          <DropDownPicker
            items={statusItems}
            open={statusDropDownOpen}
            setOpen={setStatusDropDownOpen}
            value={selectedStatusId}
            setValue={setSelectedStatusId}
            placeholder="How's the progress?"
            closeAfterSelecting={true}
            containerStyle={{
              width: '100%',
              borderWidth: 0,
              borderRadius: 7,
              shadowColor: '#000',
              backgroundColor: '#F6F6F6',
            }}
            listMode="FLATLIST"
            dropDownContainerStyle={{
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

        <Divider />

        <View
          style={{
            width: '100%',
            marginVertical: 10,
            zIndex: 8,
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
              // height: 200,

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
          opacity: !title || !selectedShiftIds || !selectedStatusId ? 0.5 : 1,
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 7,
          bottom: 0,
        }}
        disabled={!title || !selectedShiftIds || !selectedStatusId}
        onPress={() => HandleCreateTask()}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
          }}>
          Add
        </Text>
        {isLoading && <ActivityIndicator size="small" color="#fff" />}
      </TouchableOpacity>
    </View>
  );
};

export default AddTask;
