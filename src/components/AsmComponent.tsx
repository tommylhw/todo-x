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
  Animated,
} from 'react-native';
import {useTheme, Button, TextInput, Switch, Divider} from 'react-native-paper';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

// icons
import Octicons from 'react-native-vector-icons/Octicons';

// backend
import { DBDeleteAsm } from '../utils/db';

const AsmComponent = ({asm, refresh}: {asm: any, refresh: () => void}) => {

  const HandleDeleteAsm = async () => {
    console.log("Delete: ", asm.id);
    await DBDeleteAsm(asm.id);
    refresh();
  }
  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={(progress, dragAnimatedValue) => (
          <RenderRightActions
            progress={progress}
            dragAnimatedValue={dragAnimatedValue}
            action={() => HandleDeleteAsm()}
          />
        )}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 10,
            gap: 10,
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: '#6E42C1',
              borderRadius: 5,
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>{asm.course_title}</Text>
          </View>

          <View style={{flex: 1}}>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {asm.title}
            </Text>
          </View>

          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 5,
              borderWidth: 1,
              borderColor: '#F8C510',
              borderRadius: 5,
            }}>
            <Text style={{color: '#F8C510', fontWeight: 'bold'}}>
              {asm.diffDays} days
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
      <Divider />
    </GestureHandlerRootView>
  );
};

const RenderRightActions = ({
  progress,
  dragAnimatedValue,
  action
}: {
  progress: Animated.AnimatedInterpolation<number>;
  dragAnimatedValue: Animated.AnimatedInterpolation<number>;
  action: () => void;
}) => {
  if (!dragAnimatedValue) {
    return null; // Return null if dragAnimatedValue is undefined
  }

  const opacity = dragAnimatedValue.interpolate({
    inputRange: [-60, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
      <TouchableOpacity
        style={{
          width: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => action()}
        >
        <Animated.View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity
          }}>
          {/* <Text style={{color: '#AF1311'}}>Delete</Text> */}
          <Octicons name="trash" size={22} color="#AF1311" />
        </Animated.View>
      </TouchableOpacity>
  );
};

export default AsmComponent;
