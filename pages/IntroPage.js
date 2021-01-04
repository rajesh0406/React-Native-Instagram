import React from 'react'
import { View, Text,TouchableOpacity,StyleSheet} from 'react-native'

function IntroPage({navigation}) {
   
    return (
        <View style={styles.intro_container}>
         <Text style={styles.instagram_logo}>Instagram</Text>
         <TouchableOpacity style={styles.create_new_button}  onPress={() => navigation.navigate('signup')}>
             <Text style={styles.create_new_button_text
             }>Create New Account</Text>
         </TouchableOpacity>
             <TouchableOpacity style={styles.log_in_button} onPress={() => navigation.navigate('signin')}>
             <Text style={styles.log_in_button_text
             }>Log In</Text>
         </TouchableOpacity>
        </View>
    )
}
const styles=StyleSheet.create({
intro_container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:'#ffffff'
},
instagram_logo:{
    fontFamily: 'LobsterTwo-Regular',
    fontSize:40,
    padding:15,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:40
},
create_new_button:{
   
    backgroundColor:'#0095F6',
    padding:15,
    borderRadius:3,
    width:320,
    justifyContent:"center",
    alignItems:'center',
    marginBottom:2
},
create_new_button_text:{
    color:'#fff',
    fontFamily:'Roboto-Regular',
    fontSize:15,
    fontWeight:'700'
    
},
log_in_button:{
    backgroundColor:'#fff',
    padding:15,
    borderRadius:3,
    width:320,
    justifyContent:"center",
    alignItems:'center',
    marginBottom:2
},
log_in_button_text:{
    color:'#0095F6',
    fontFamily:'Roboto-Regular',
    fontSize:15,
    fontWeight:'700'
}
})
export default IntroPage;