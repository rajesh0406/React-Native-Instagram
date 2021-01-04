import React,{useState} from 'react'
import { View, Text, StyleSheet,TextInput,TouchableOpacity,Alert,ScrollView} from 'react-native'
import PasswordInput from '../components/PasswordInput'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from "react-native";
import * as Animatable from 'react-native-animatable';

var Fullwidth = Dimensions.get('window').width;
var Fullheight=Dimensions.get('window').height;

function SignIn({navigation}) {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [validPassword,setvalidpassword]=useState(true);
    const [validEmail,setvalidEmail]=useState(true);

    
    const ChangeText=(data)=>{
        setvalidEmail(true)
        setvalidpassword(true)
        setPassword(data)
        if(password.length<=6)
        {
            setvalidpassword(false)
        }
        return;
    }
    const ChangeEmail=(data)=>{
        setvalidpassword(true)
        setvalidEmail(true)
        setEmail(data);
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            setvalidEmail(false);
        }
        return;

    }
    const handleLogin=()=>{
        setvalidEmail(true)
        setvalidpassword(true)
        if ( email.length == 0 || password.length == 0 ) {

            Alert.alert('Wrong Input!', 'Input fields cannot be empty.', [
                {text: 'Ok'}
            ]);
            return;
        }
        else if(validEmail===true || validPassword===true)
        {
            //'https://instagserver.herokuapp.com/login'
            const data={
                emailId:email,
                password:password
            }
            const options={
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            }
            fetch('https://instagserver.herokuapp.com/login',options).then((res)=>res.json())
            .then(data=>{
                //console.log(data.user)
                let u=JSON.stringify(data.user)
               navigation.navigate('home',{token:data.token,user:u})
                  }).catch(error=>{
                Alert.alert('Error', 'Invalid Login credentials', [
                    {text: 'Ok'}
                ]);
            })
           
        }
            return;
    }
    
  
    return (
        

        <ScrollView contentContainerStyle={{flexGrow:1}}>
            
           <View style={styles.sign_in_container}>
           
    <Text style={styles.instagram_logo}>Instagram </Text>
            
            <View style={styles.input_wrapper}> 
            <TextInput placeholder="Email" style={styles.input_field} onChangeText={data=>ChangeEmail(data)}/>
            </View>
            { validEmail ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Invalid Email-Id format</Text>
            </Animatable.View>
            }
            <PasswordInput ChangeText={ChangeText}/>
            { validPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be atleast 6 characters long.</Text>
            </Animatable.View>
            }
            
            <TouchableOpacity style={styles.log_in_button} onPress={()=>handleLogin()}>
             <Text style={styles.log_in_button_text
             }>Log In</Text>
            </TouchableOpacity>
            <Text style={styles.forgot_text}>Forgot your login details? <Text style={styles.get_help}>Get help logging in.</Text></Text>
            <Text style={styles.textline}> ────────────── OR ────────────── </Text>
            <Text style={styles.facebook}> <Icon name='facebook' style={styles.facebook_icon} />  Log in with Facebook</Text>
           
            <View style={styles.no_account}>
                <Text style={styles.no_account_grey}>Don't have an account?<Text style={styles.no_account_black} onPress={() => navigation.navigate('signup')}> Sign up.</Text></Text>
            </View>
        </View >
        </ScrollView>

       
    )
}
const styles=StyleSheet.create({
   
    sign_in_container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        
    },
    instagram_logo:{
        fontFamily: 'LobsterTwo-Regular',
        fontSize:40,
        padding:15,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:5
    },
    input_wrapper:{
        
        padding:5,
        flexDirection:'row',

    },
    input_field:{
        backgroundColor:'#fafafa',
        padding:5,
        borderColor:'#cccccc',
        borderWidth:2,
        borderRadius:4,
        flex:0.9,
    },
    log_in_button:{
        marginTop:8,
        backgroundColor:'#0095F6',
        padding:15,
        borderRadius:3,
        width:320,
        justifyContent:"center",
        alignItems:'center',
        marginBottom:2
    },
    log_in_button_text:{
        color:'#fff',
        fontFamily:'Roboto-Regular',
        fontSize:15,
        fontWeight:'700'
        
    },
    forgot_text:{
        fontSize:13,
        fontFamily:'Roboto-Regular',
        color:'#808080',
        fontWeight:'600',
        margin:15
    },
    get_help:{
        color:'#000000',
        fontFamily:'Roboto-Regular',
        fontWeight:'700'
    },
   textline:{
       margin:5,
       fontSize:14,
        fontFamily:'Roboto-Regular',
        color:'#808080',
        fontWeight:'600',
   },
   facebook:{
       color:'#0095F6',
       fontSize:15,
       margin:5,
       fontWeight:'700',
       justifyContent:'center',
       alignItems:'center',
       marginBottom:(Fullheight/100)*33
   },
   facebook_icon:{
    color:'#0095F6',
    fontSize:25, 
    justifyContent:'center',
       alignItems:'center'
   },
   no_account:{
    width:Fullwidth,
    borderTopWidth:1,
    borderTopColor:'#cccccc',
    padding:15,
    justifyContent:'center',
    alignItems:'center'
   },
   no_account_grey:{
    fontSize:13,
    fontFamily:'Roboto-Regular',
    color:'#808080',
    fontWeight:'600', 
   },
   no_account_black:{
    color:'#000000',
    fontFamily:'Roboto-Regular',
    fontWeight:'700'
   },
   errorMsg:{
       color:'#ff0000',
       fontFamily:'Roboto-Regular',
       fontSize:13,

   }
 


    
})
export default SignIn;