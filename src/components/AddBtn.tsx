import React, { useState, useCallback, useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, StatusBar, View, Text, Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from 'react-native'
import { useTheme, Button, TextInput } from 'react-native-paper';
import Modal from "react-native-modal";

// components
import AddModal from './AddModal';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AddBtn = ({refresh}: {refresh: () => void}) => {

  const theme = useTheme();

  const [modalVisible, setModalVisible] = useState(false);

  const CloseModal = () => {
    setModalVisible(false);
    refresh();
  };

  const [isSwipe, setIsSwipe] = useState(false);

  return (
    <View >
      <TouchableOpacity
        style={{
          marginRight: 10,
        }}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="pluscircle" size={20} color={theme.colors.primary} />
      </TouchableOpacity>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={{ margin: 0 }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        swipeDirection="down"
        onSwipeStart={() => setIsSwipe(true)}
        onSwipeMove={(persentageShown: any) => {
          // console.log("persentageShown: ", persentageShown);
        }}
        onSwipeComplete={() => setModalVisible(false)}
        onSwipeCancel={() => setIsSwipe(false)}
      >
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '90%',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 20,
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          {/* Swipe Indicator */}
          <View
            style={{
              width: '40%',
              height: 5,
              backgroundColor: isSwipe ? "#000" : '#ccc',
              borderRadius: 100,
              marginBottom: 20,
            }}
          >
          </View>

          {/* Header */}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                // color: theme.colors.primary,
                color: '#000',
              }}
            >
              Add New
              </Text>
            <TouchableOpacity>
              <AntDesign name='close' size={24} color="#000" onPress={() => setModalVisible(false)} />
            </TouchableOpacity>

            
          </View>
          <AddModal isSwipe={isSwipe} closeModal={CloseModal} />
        </View>

      </Modal>

    </View>
  )
}

export default AddBtn;