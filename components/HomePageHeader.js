import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
const HomePageHeader = (props) => {
    const {navigation}=props;

    return (
        <View style={styles.header_container}>
                <View style={styles.header_icon}>
                    <Feather name="camera" style={styles.icon}/>
                    <Text style={styles.instgram_logo}>Instagram</Text>
                </View>
                <View style={styles.header_icon}>
                    <Feather name="search" style={styles.icon} onPress={()=>
                        navigation.navigate('imagegrid')}/>
                    <Feather name="navigation" style={styles.icon} />
                </View>
            </View>
    )
}
const styles=StyleSheet.create({
    instgram_logo:{
        fontFamily: 'LobsterTwo-Regular',
        fontSize:25,
        fontWeight:'600',
        justifyContent:"center",
        alignItems:"center",

    },
    icon:{
        fontSize:25,
        color:'#000',
        padding:12,
    },
    home_container:
    {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    header_container:{
        height:45,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
        backgroundColor:'#fff',
        elevation:4,
        position:'absolute',
        top:0,
        left:0,
        right:0,
        
    },
    header_icon:{
        
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
      
    },
    header_text:{
        fontFamily: 'LobsterTwo-Regular',
        fontSize:40,
        padding:15,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:5
    },
})

export default HomePageHeader
