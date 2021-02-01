import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import {Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : colors.primaryColor}
    />
  );
};

export default CustomHeaderButton;
