import React from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';

const Counter = ({ count, setCount }) => {
  return (
    <View style={{flexDirection:'row', marginRight:8}}>
      <TouchableOpacity onPress={() => setCount(count - 1)}>
      <Image 
       source={require('../../assets/ImagensCounter/minus-btn.png')}
       style={{ width:25, height:25 }}
        />
      </TouchableOpacity>
      
      <Text style={{ fontSize: 18, marginHorizontal: 10, color:'#5A4429' }}>{count}</Text>
      
      <TouchableOpacity onPress={() => setCount(count + 1)}>
       <Image 
       source={require('../../assets/ImagensCounter/plus-btn.png')}
       style={{ width:25, height:25 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;
