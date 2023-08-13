import {
  View,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import CloseIcon from '../Assets/CloseIcon.svg';

const SearchModal = ({
  open,
  onClose,
  children,
  onChange,
  text,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  onChange?: (text: string) => void;
  text?: string;
}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [searchText, setSearchText] = useState('');
  return (
    <>
      {open && (
        <>
          <View
            style={{width: screenWidth, height: screenHeight}}
            className={`absolute items-center justify-center z-10`}>
            <Pressable
              onPress={onClose}
              style={{width: screenWidth, height: screenHeight}}
              className={`bg-[#595757] absolute z-12 opacity-80 items-center justify-center`}></Pressable>
            <View className="w-[85%] h-[70%] bg-white rounded-md z-16 p-5">
              <View className="flex-row-reverse mb-3 ">
                <Pressable onPress={onClose}>
                  <CloseIcon />
                </Pressable>
              </View>

              <TextInput
                onChangeText={e => onChange && onChange(e)}
                value={text}
                placeholder="Search ..."
                className=" bg-[#e8e4e4] h-10 rounded-md px-3 mb-3"
              />
              <ScrollView>{children}</ScrollView>
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default SearchModal;
