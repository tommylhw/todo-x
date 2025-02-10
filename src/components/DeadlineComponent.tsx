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
import {useNavigation} from '@react-navigation/native';

// components
import TagComponent from '../components/TagComponent';

// icons
import Octicons from 'react-native-vector-icons/Octicons';

// backend
import {DBDeleteDeadline, DBFetchDeadline, DBFetchTagsByIds} from '../utils/db';

const DeadlineComponent = ({
  deadline,
  refresh,
}: {
  deadline: any;
  refresh: () => void;
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [tags, setTags] = useState<any>([]);

  const HandleDeleteDeadline = async () => {
    console.log('Delete: ', deadline.id);
    await DBDeleteDeadline(deadline.id);
    refresh();
  };

  const HandleFetchTagsByIds = async () => {
    const tags = await DBFetchTagsByIds(deadline?.tag_ids);
    setTags(tags);
  };

  const [deadlineParams, setDeadlineParams] = useState<any>({});
  const HandleDeadlineScreenParams = async () => {
    const deadlineParams = {
      ...deadline,
      tags: tags,
    };
    setDeadlineParams(deadlineParams);
  };

  useEffect(() => {
    HandleFetchTagsByIds();
    HandleDeadlineScreenParams();
  }, [deadline]);

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={(progress, dragAnimatedValue) => (
          <RenderRightActions
            progress={progress}
            dragAnimatedValue={dragAnimatedValue}
            action={() => HandleDeleteDeadline()}
          />
        )}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 5,
            gap: 10,
            backgroundColor: '#fff',
          }}
          onPress={() =>
            navigation.navigate('HomeDeadline', {deadline: deadlineParams})
          }>
          {tags?.length > 0 && <TagComponent tag={tags[0]} />}

          <View style={{flex: 1}}>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {deadline?.title}
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
              {deadline?.diffDays} days
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
  action,
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

  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => action()}>
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity,
        }}>
        <Octicons name="trash" size={22} color={theme.colors.error} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default DeadlineComponent;
