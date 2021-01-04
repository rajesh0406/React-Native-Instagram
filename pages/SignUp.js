import React,{useState} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,TextInput,Dimensions,ScrollView,Alert } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons';
import PasswordInput from '../components/PasswordInput';
import * as Animatable from 'react-native-animatable';
var Fullheight = Dimensions.get('window').height;
var Fullwidth = Dimensions.get('window').width;
const Signup = ({navigation}) => {
    const [name,setName]=useState("");
    const [phoneNumber,setPhone]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [userName,setUserName]=useState("");
    const [validnumber,setvalidnumber]=useState(true);
    const [validemail,setvalidEmail]=useState(true);
    const [validpassword,setvalidpassword]=useState(true);
    const [validname,setvalidname]=useState(true);
    const [validUsername,setvalidUsername]=useState(true);

    const ChangeText=(data)=>{
        setvalidnumber(true)
        setvalidEmail(true)
        setvalidUsername(true)
        setvalidname(true)
        setvalidpassword(true)
        setPassword(data)
        if(password.length<=5)
        {
            setvalidpassword(false)
        }
        return;
    }
    const ChangeName=(data)=>{
        setvalidnumber(true)
        setvalidEmail(true)
        setvalidUsername(true)
        setvalidname(true)
        setvalidpassword(true)
        setName(data)
        if(name.length<=5)
        {
            setvalidname(false)
        }
        return;
    }
    const ChangeUserName=(data)=>{
        setvalidnumber(true)
        setvalidEmail(true)
        setvalidUsername(true)
        setvalidname(true)
        setvalidpassword(true)
        setUserName(data)
        if(userName.length<=5)
        {
            setvalidUsername(false)
        }
        return;
    }
    const ChangeNumber=(data)=>{
        setvalidnumber(true)
        setvalidEmail(true)
        setvalidUsername(true)
        setvalidname(true)
        setvalidpassword(true)
        setPhone(data)
        if(phoneNumber.length+1<10 || phoneNumber.length+1>10)
        {
            setvalidnumber(false)
        }
        return;
    }
    const ChangeEmail=(data)=>{
        setvalidnumber(true)
        setvalidEmail(true)
        setvalidUsername(true)
        setvalidname(true)
        setvalidpassword(true)
        setEmail(data);
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            setvalidEmail(false);
        }
        return;

    }
    const handlesignup=()=>{
        if ( email.length == 0 || password.length == 0 || phoneNumber.length===0 || name.length===0) {
            setvalidnumber(true)
            setvalidEmail(true)
            setvalidUsername(true)
            setvalidname(true)
            setvalidpassword(true)
            Alert.alert('Wrong Input!', 'Input fields cannot be empty.', [
                {text: 'Ok'}
            ]);
            return;
        }
        else if(validpassword===true || validnumber===true || validname===true|| validemail===true|| validUsername===true)
        {
            const data={
                name:name,
                emailId:email,
                phnNo:phoneNumber,
                userName:userName,
                password:password
            }
            const options={
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            }
            fetch('https://instagserver.herokuapp.com/signup',options).then(res=>res.json(                
            )).then(data=>{
                
              
        if(data==="exist")
        {
            Alert.alert('Error', 'User Id already exist', [
                {text: 'Ok'}
            ]);
        }
        else if(data){
        navigation.navigate('signin')
        }
                  }).catch(error=>{
                Alert.alert('Error', 'Something went wrong', [
                    {text: 'Ok'}
                ]);
            })
        }
        return;
    }
    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={styles.signup_container}>
            <Icon name='user' style={styles.profile_icon}/>
            <TextInput placeholder="Full name" style={styles.input_field} onChangeText={(data)=>ChangeName(data)}/>
            { validname ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Name should have atleast 6 characters</Text>
            </Animatable.View>
            }
            <TextInput placeholder="Phone number" style={styles.input_field} onChangeText={(data)=>ChangeNumber(data)}/>
            { validnumber ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Phone number should have 10 digits</Text>
            </Animatable.View>
            }
            <TextInput placeholder="Email" style={styles.input_field} onChangeText={(data)=>ChangeEmail(data)}/>
            { validemail ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Invalid Email-Id format</Text>
            </Animatable.View>
            }
            <TextInput placeholder="User name" style={styles.input_field} onChangeText={(data)=>ChangeUserName(data)}/>
            { validUsername ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>User Name should have atleast 6 characters</Text>
            </Animatable.View>
            }
            <PasswordInput ChangeText={ChangeText}/>
            { validpassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>password should have atleast 6 characters</Text>
            </Animatable.View>
            }
            <TouchableOpacity style={styles.sign_up_button} onPress={()=>handlesignup()} >
             <Text style={styles.sign_up_button_text
             }>Sign up</Text>
            </TouchableOpacity>       
            <View style={styles.already_have_account}>
                <Text style={styles.already_have_account_grey}>Already have an account?<Text style={styles.already_have_account_black} onPress={() => navigation.navigate('signin')}> Log in.</Text></Text>
            </View>     
        </View>
        </ScrollView>
    )
}
const styles=StyleSheet.create({
    signup_container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff'
    },
    input_field:{
        margin:6,
        backgroundColor:'#fafafa',
        padding:5,
        borderColor:'#cccccc',
        borderWidth:2,
        borderRadius:4,
        width:(Fullwidth/100)*90
    },
    profile_icon:{
        fontSize:150,
        marginBottom:5
    },
    sign_up_button:{
    marginTop:10,
    backgroundColor:'#0095F6',
    padding:15,
    borderRadius:3,
    width:320,
    justifyContent:"center",
    alignItems:'center',
    marginBottom:2
    },
    sign_up_button_text:{
     color:'#fff',
    fontFamily:'Roboto-Regular',
    fontSize:15,
    fontWeight:'700'
    },
    already_have_account:{
        width:Fullwidth,
        borderTopWidth:1,
        borderTopColor:'#cccccc',
        marginTop:(Fullheight/100)*22, 
        padding:15,
        justifyContent:'center',
        alignItems:'center',
       },
       already_have_account_grey:{
        fontSize:13,
        fontFamily:'Roboto-Regular',
        color:'#808080',
        fontWeight:'600', 
       },
       already_have_account_black:{
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
export default Signup
