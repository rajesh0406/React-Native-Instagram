import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
const GridViewHeader = () => {
   // const navigation = useNavigation();
  
    return (
        <View style={styles.header_container}>
            <Icon name="arrowleft" style={styles.arrow_icon} />
            <Icon name="scan1" style={styles.scan_icon}/>
        </View>
    )
}
const styles=StyleSheet.create({
  header_container:{
    position:"absolute",
    top:0,
    left:0,
    right:0,
    height:45,
    flexDirection:"row",
    justifyContent:"space-between",
    elevation:4,
    backgroundColor:'#fff'
  },
  arrow_icon:{
      fontSize:45,
      margin:5,
      color:'#000'
  },
  scan_icon:{
    fontSize:45,
    margin:5,
    color:'#000'
  },
  
});
export default GridViewHeader