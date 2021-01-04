import React from 'react';
import {Image} from 'react-native';

const DoubleTap=({animatedValue})=>{
    return (
      <Image
      source={require('../images/heart.png')}
      style={{ opacity: animatedValue,position: 'absolute',alignItems: 'center',justifyContent: 'center',
      left: 0,right: 0,top: 0,bottom: 0,}}
    />
    );
}
export default DoubleTap;