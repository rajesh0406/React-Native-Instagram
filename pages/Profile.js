import React,{useEffect,useState} from 'react'
import { View, Text,StyleSheet,Alert,Image,TouchableOpacity,ScrollView,ActivityIndicator,FlatList ,VirtualizedList} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
const MyProfile = ({route,navigation}) => {
    const {token}=route.params;
    const {user}=route.params;
    const {Id}=route.params
    let u=JSON.parse(user)
    const [User,setUser]=useState(u);
    const [Token,setToken]=useState(token);
    const [date,setDate]=useState("");
    const [month,setMonth]=useState("");
    const [year,setYear]=useState("");
    const [images,setImage]=useState([]);
    const [postLength,setPost]=useState(null);
    const [loader,setloader]=useState(false);
    const [Profiledata,setProfile]=useState([]);
    const [follower,setFollower]=useState(0);
    const [following,setFollowing]=useState(0);
    const [Data,setData]=useState([]) 
    useEffect(() => {
        //console.log(Id)

        const options={
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                "Authorization":"Bearer "+Token
            },
           }

           setloader(true);
           fetch(`https://instagserver.herokuapp.com/profile/${Id}`,options)
           .then(res=>res.json()).then(data=>{
               setData(data.result)
               setProfile(data.result.profile)
               setDate(data.date)
               setMonth(data.month)
               setYear(data.year)
               setFollower(data.result.followers.length)
               setFollowing(data.result.following.length)
           }).catch(err=>{
            Alert.alert('Error', 'Something went wrong', [
                {text: 'Ok'}
            ]); 
            setloader(false)
           })
           fetch(`https://instagserver.herokuapp.com/post/mypost/${Id}`,options).then(res=>res.json()).then(data=>{
              // console.log(data)
               setPost(data.length)
               setImage(data)
               setloader(false)
              
           }).catch(err=>{
            Alert.alert('Error', 'Something went wrong', [
                {text: 'Ok'}
            ]); 
            setloader(false)
           })
        //console.log(token)
       
    }, []);
    const PostRequest=()=>{
        const options={
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                "Authorization":"Bearer "+Token
            },
           }
           setloader(true);
           fetch(`https://instagserver.herokuapp.com/post/mypost/${Id}`,options).then(res=>res.json()).then(data=>{
               //console.log(data)
               setPost(data.length)
               setImage(data)
               setloader(false)
           }).catch(err=>{
            Alert.alert('Error', 'Something went wrong', [
                {text: 'Ok'}
            ]); 
            setloader(false)
           })
    }
    const mediatype=(url)=>{
        const myRegex = /(https?:\/\/.*\.(?:png|jpg))/i;
        if(myRegex.test(url))
        {
            return 'image'
        }
        else
        {
            return 'video'
        }
    

      }
      const followRequest=()=>{
          const data={
            followingId:Id
          }
        const options={
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                "Authorization":"Bearer "+Token
            },
            body:JSON.stringify(data)
           }
           fetch('https://instagserver.herokuapp.com/request/follow_request',options)
           .then(res=>res.json())
           .then(data=>{
               console.log(data)
               Alert.alert('Success', 'Request sent successfully', [
                {text: 'Ok'}
            ]);
           }).catch(err=>{
            console.log(err)
           })

      }
    return (
        <View>
            <View style={styles.header_container}>
            <Text style={{fontSize:15,fontFamily:'Roboto-Regular',fontWeight:'700',color:'#000',padding:5}}>
                {Data.name}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" style={{fontSize:15,flex:0.8}}/>
            <FontAwesome name="bars" style={{fontSize:24}}/>
            </View>
           
            <View style={{marginTop:65}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:7}}>
                <Image source={{uri: Profiledata.profilePic}} style={{height:100,width:100,borderRadius:50,justifyContent:'center',alignItems:'center'}}/>
                <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                   <Text style={{fontSize:16,fontWeight:'700',fontFamily:'Roboto-Regular'}}>{postLength}</Text>
                    <Text  style={{fontSize:15,fontWeight:'600',fontFamily:'Roboto-Regular'}}>Posts</Text>
                </View>
                <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:16,fontWeight:'700',fontFamily:'Roboto-Regular'}}>{follower}</Text>
                    <Text  style={{fontSize:15,fontWeight:'600',fontFamily:'Roboto-Regular'}} >Followers</Text>
                </View>
                <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:16,fontWeight:'700',fontFamily:'Roboto-Regular'}}>{following}</Text>
                    <Text  style={{fontSize:15,fontWeight:'600',fontFamily:'Roboto-Regular'}}>Following</Text>
                </View>
            </View>
            <View style={{flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start',paddingLeft:20,marginTop:5}}>
    <Text  style={{fontSize:15,fontWeight:'600',fontFamily:'Roboto-Regular'}}>{Data.userName}</Text>
                <Text  style={{fontSize:15,fontWeight:'600',fontFamily:'Roboto-Regular'}}>{date}/{month}/{year}</Text>
    <Text  style={{fontSize:15,fontWeight:'600',fontFamily:'Roboto-Regular'}}>{Profiledata.workplace}</Text>
                <Text  style={{fontSize:15,fontWeight:'600',fontFamily:'Roboto-Regular'}}>{Profiledata.school_college}</Text>
    <Text  style={{fontSize:15,fontWeight:'600',fontFamily:'Roboto-Regular'}}>{Profiledata.location}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',padding:5}}>
            <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',backgroundColor:'#0095F6',height:35,width:150,borderRadius:5}}>
               {
               (User.following.includes(Id)?<Text style={{fontFamily:'Roboto-Regular',fontSize:15,padding:5,fontWeight:'700',color:'#fff'}} >Following</Text>:<Text style={{fontFamily:'Roboto-Regular',fontSize:15,padding:5,fontWeight:'700',color:'#fff'}} onPress={()=>followRequest()}>Follow</Text>)
               }
           </TouchableOpacity>
           <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',backgroundColor:'#fff',borderColor:'#ccc',borderWidth:1,height:35,width:150,borderRadius:5}}>
               <Text style={{fontFamily:'Roboto-Regular',fontSize:15,padding:5,fontWeight:'700',color:'#000'}} >Message</Text>
           </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',width:'100%',height:45,borderColor:'#ccc',borderWidth:1,justifyContent:'space-around',alignItems:'center'}}>
                <MaterialIcons name="grid-on" style={{fontSize:25}} onPress={()=>PostRequest()}/>
                <MaterialCommunityIcons name="account-box" style={{fontSize:25}}/>
            </View>
            {
         (loader)?<ActivityIndicator  size="large"  color="#0000ff" style={styles.loader}/>:
         <View>
         {images.length===0?<Text style={{fontFamily:'Roboto-Regular',fontSize:15,fontWeight:'700',margin:'42%'}}>No Post</Text>:null}
         <FlatList
        data={images}
        renderItem={({item,index}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 2
            }}>
            {mediatype(item.photo[0])==='image'?
          <Image
          style={styles.imageThumbnail}
          source={{uri: item.photo[0]}}
        />
        :  
        <Video
          style={styles.imageThumbnail}
          source={{uri: item.photo[0]}}
          repeat={true}
          resizeMode="cover"
        />
        
          }
          </View>
        )}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
      </View>
       }

            </View>
           
        </View>
    )
}
const styles = StyleSheet.create({
    header_container:{
      padding:10,
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
    container: {
        flex: 1,
      },
      imageThumbnail: {
          margin:1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 118,
        width:118
      },
      loader:{
        marginTop:100,
      }
    });
export default MyProfile
/* <View>
                <TouchableOpacity style={{margin:'5%',width:'90%',height:35,justifyContent:'center',alignItems:'center',borderRadius:3,borderWidth:1,borderColor:'#ccc'}}>
                    <Text>Edit profile</Text>
                </TouchableOpacity>
            </View>*/