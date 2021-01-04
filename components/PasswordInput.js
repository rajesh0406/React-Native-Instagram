import React,{useState} from 'react'
import { View, Text,TouchableOpacity,StyleSheet,TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
const PasswordInput = ({ChangeText}) => {
    const [visible,setVisible]=useState(true);
    const [icon,setIcon]=useState('eye-with-line');
    
    const changeVisibility=()=>{
        setVisible(!visible)
        setIcon(icon==='eye'?'eye-with-line':'eye')
    }

    return (
        <TouchableOpacity style={styles.TogglePasswordInput}>
            <TextInput placeholder="Password" secureTextEntry={visible} style={styles.text} onChangeText={(data)=>ChangeText(data)}/>
            <Icon name={icon} onPress={changeVisibility} style={icon==='eye'?styles.eye_icon:styles.eye_line_icon}/>
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    TogglePasswordInput:{
        backgroundColor:'#fafafa',
        borderColor:'#cccccc',
        borderWidth:2,
        borderRadius:4,
        flexDirection:'row',
        margin:4,
        padding:3,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'

    },
    text:{
        flex:0.8,
        backgroundColor:'#fafafa',
        padding:4,

    },
   eye_line_icon:{
       flex:0.1,
       padding:5,
       color:'#000',
       fontSize:18
   },
   eye_icon:{
    flex:0.1,
    padding:5,
    color:'#0095F6',
    fontSize:18
   }


})
export default PasswordInput;
