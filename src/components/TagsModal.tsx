import React, {useState, useCallback, useLayoutEffect, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {useTheme, Button, TextInput, Checkbox} from 'react-native-paper';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Modal from 'react-native-modal';

// components
import AddReminder from './AddReminder';
import AddAsm from './AddAsm';
import AddTask from './AddTask';
import AddDeadline from './AddDeadline';
import EditTagModal from './EditTagModal';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// backend
import {DBDeleteTag, DBFetchTagsByUserId} from '../utils/db';

// Redux Toolkit
import {useSelector, useDispatch} from 'react-redux';
import {selectCurrentUserID} from '../stores/AuthSlice';

const TagsModal = ({
  isSwipe,
  updateSelectedTags,
  closeModal,
  tagsInit,
  tagsList,
}: {
  isSwipe: any;
  updateSelectedTags: (selectedTags: []) => void;
  closeModal: () => void;
  tagsInit: [];
  tagsList: [];
}) => {
  const theme = useTheme();
  const currentUserID = useSelector(selectCurrentUserID);

  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState(tagsList);
  const [selectedTags, setSelectedTags] = useState<any>(tagsInit);

  const [tagToEdit, setTagToEdit] = useState<any>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

  const closeEditModal = async () => {
    await handleFetchTagsList();
    setEditModalVisible(false);
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const toggleEditMode = async () => {
    if (editMode) {
      await handleFetchTagsList();
    }
    setEditMode(!editMode);
  };

  const handleFetchTagsList = async () => {
    setIsLoading(true);
    const response: any = await DBFetchTagsByUserId(currentUserID);
    if (response) {
      const tagsWithTextColor = response.map((response: any) => ({
        ...response,
        text_color: getTextColor(response.color_code),
      }));
      console.log('response: ', tagsWithTextColor);
      setTags(tagsWithTextColor);
    }

    selectedTags.forEach((selectedTag: any, index: number) => {
      const matchingTag = tags.find((tag: any) => tag.id === selectedTag.id);
      if (matchingTag) {
        selectedTags[index] = matchingTag;
      }
    });
    updateSelectedTags(selectedTags);
    setIsLoading(false);
  };

  const handleDeleteTag = async (tagId: number) => {
    setIsLoading(true);
    const action: any = await DBDeleteTag(tagId);
    if (action) {
      handleFetchTagsList();
    }
    setIsLoading(false);
  };

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

  useEffect(() => {
    // setTags(tagsList);
    handleFetchTagsList();
    // console.log('tagsList: ', tagsList);
    console.log('selectedTags: ', selectedTags);
    updateSelectedTags(selectedTags);
  }, [selectedTags]);

  return (
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
          width: '15%',
          height: 5,
          backgroundColor: theme.colors.outline,
          borderRadius: 100,
          marginBottom: 20,
        }}></View>

      {/* Modal header */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: 10,
        }}>
        <TouchableOpacity onPress={toggleEditMode}>
          {editMode ? (
            <Text
              style={{
                color: theme.colors.primary,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Done
            </Text>
          ) : (
            <Text
              style={{
                color: theme.colors.primary,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Edit
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Modal body */}
      <ScrollView
        style={{
          width: '100%',
        }}>
        <View
          style={{
            width: '100%',
            gap: 20,
          }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 10,
              }}>
              Courses
            </Text>
            <View
              style={{
                gap: 10,
              }}>
              {tags
                .filter((tag: any) => tag.tag_type == 'course')
                .map((tag: any, index: number) =>
                  editMode ? (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 15,
                        }}>
                        <TouchableOpacity
                          onPress={() => handleDeleteTag(tag.id)}>
                          <Octicons
                            name="no-entry"
                            size={16}
                            color={theme.colors.error}
                          />
                        </TouchableOpacity>

                        <View
                          style={{
                            backgroundColor: tag.color_code,
                            padding: 5,
                            borderRadius: 5,
                          }}>
                          <Text
                            style={{
                              color: tag.text_color,
                            }}>
                            # {tag.title}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 15,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setTagToEdit(tag);
                            setEditModalVisible(true);
                          }}>
                          <MaterialIcons
                            name="edit"
                            size={20}
                            color={theme.colors.dark.level5}
                          />
                        </TouchableOpacity>

                        <MaterialIcons
                          name="menu"
                          size={20}
                          color={theme.colors.dark.level4}
                        />
                      </View>
                      <Modal
                        isVisible={editModalVisible}
                        onBackdropPress={() => closeEditModal()}
                        style={{
                          margin: 0,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        // animationIn="slideInUp"
                        // animationOut="slideOutDown"
                        // swipeDirection="down"
                      >
                        <EditTagModal
                          closeEditModal={closeEditModal}
                          tagToEdit={tagToEdit}
                          tagType=""
                          userId={currentUserID}
                        />
                      </Modal>
                    </View>
                  ) : (
                    <TouchableOpacity
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        padding: 10,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: selectedTags.find(
                          (selectedTag: any) => selectedTag.id == tag.id,
                        )
                          ? theme.colors.primaryContainer
                          : '#fff',
                      }}
                      onPress={() => {
                        if (
                          selectedTags.find(
                            (selectedTag: any) => selectedTag.id == tag.id,
                          )
                        ) {
                          setSelectedTags(
                            selectedTags.filter(
                              (selectedTag: any) => selectedTag.id != tag.id,
                            ),
                          );
                        } else {
                          setSelectedTags([...selectedTags, tag]);
                        }
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            backgroundColor: tag.color_code,
                            padding: 5,
                            borderRadius: 5,
                          }}>
                          <Text
                            style={{
                              color: tag.text_color,
                            }}>
                            # {tag.title}
                          </Text>
                        </View>
                      </View>

                      <AntDesign
                        name="check"
                        size={22}
                        color={
                          selectedTags.find(
                            (selectedTag: any) => selectedTag.id === tag.id,
                          )
                            ? theme.colors.primary
                            : theme.colors.outline
                        }
                      />
                    </TouchableOpacity>
                  ),
                )}
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 10,
              }}>
              Courses
            </Text>
            <View
              style={{
                gap: 10,
              }}>
              {tags
                .filter((tag: any) => tag.tag_type == 'category')
                .map((tag: any, index: number) =>
                  editMode ? (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 15,
                        }}>
                        <TouchableOpacity
                          onPress={() => handleDeleteTag(tag.id)}>
                          <Octicons
                            name="no-entry"
                            size={16}
                            color={theme.colors.error}
                          />
                        </TouchableOpacity>

                        <View
                          style={{
                            backgroundColor: tag.color_code,
                            padding: 5,
                            borderRadius: 5,
                          }}>
                          <Text
                            style={{
                              color: tag.text_color,
                            }}>
                            # {tag.title}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 15,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setTagToEdit(tag);
                            setEditModalVisible(true);
                          }}>
                          <MaterialIcons
                            name="edit"
                            size={20}
                            color={theme.colors.dark.level5}
                          />
                        </TouchableOpacity>

                        <MaterialIcons
                          name="menu"
                          size={20}
                          color={theme.colors.dark.level4}
                        />
                      </View>
                      <Modal
                        isVisible={editModalVisible}
                        onBackdropPress={() => closeEditModal()}
                        style={{
                          margin: 0,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        // animationIn="slideInUp"
                        // animationOut="slideOutDown"
                        // swipeDirection="down"
                      >
                        <EditTagModal
                          closeEditModal={closeEditModal}
                          tagToEdit={tagToEdit}
                          tagType=""
                          userId={currentUserID}
                        />
                      </Modal>
                    </View>
                  ) : (
                    <TouchableOpacity
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        padding: 10,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: selectedTags.find(
                          (selectedTag: any) => selectedTag.id == tag.id,
                        )
                          ? theme.colors.primaryContainer
                          : '#fff',
                      }}
                      onPress={() => {
                        if (
                          selectedTags.find(
                            (selectedTag: any) => selectedTag.id == tag.id,
                          )
                        ) {
                          setSelectedTags(
                            selectedTags.filter(
                              (selectedTag: any) => selectedTag.id != tag.id,
                            ),
                          );
                        } else {
                          setSelectedTags([...selectedTags, tag]);
                        }
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            backgroundColor: tag.color_code,
                            padding: 5,
                            borderRadius: 5,
                          }}>
                          <Text
                            style={{
                              color: tag.text_color,
                            }}>
                            # {tag.title}
                          </Text>
                        </View>
                      </View>

                      <AntDesign
                        name="check"
                        size={22}
                        color={
                          selectedTags.find(
                            (selectedTag: any) => selectedTag.id === tag.id,
                          )
                            ? theme.colors.primary
                            : theme.colors.outline
                        }
                      />
                    </TouchableOpacity>
                  ),
                )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal footer */}
      <View></View>
    </View>
  );
};

export default TagsModal;
