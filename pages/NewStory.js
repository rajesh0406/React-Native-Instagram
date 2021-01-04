import React,{useState} from 'react'
import { View, Text,Alert,TouchableOpacity,Image,TextInput,FlatList,ActivityIndicator} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Video from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';
const NewPost = ({route,navigation}) => {
    const {token}=route.params;
    const {user}=route.params;
    let u=JSON.parse(user)
    const [User,setUser]=useState(u)
    const [Token,setToken]=useState(token)
    const [ImgData,setImgData]=useState([]);
    const [Url,setUrl]=useState([]);
    const [loader,setloader]=useState(false);
    const pickSingleWithCamera=()=>{
        ImagePicker.openCamera({
          width: 500,
          height: 500,
          includeExif: true,
          mediaType:'any',
        })
          .then((image) => {
            let path=image.path;
            const imageName=path.match(/[\w-]+\.(jpg|png|txt)/g);
            const obj={
                name:imageName[0],
                uri:path
            }
            setImgData([...ImgData,obj])
            console.log('received image', image);
           
          })
          .catch((e) => alert(e));
      }
   const pickMultiple=()=>{
        ImagePicker.openPicker({
          multiple: true,
          waitAnimationEnd: false,
          includeExif: true,
          mediaType:'any'
        })
          .then((images) => {

            images.forEach(file=>{
                let path=file.path;
                const imageName=path.match(/[\w-]+\.(jpg|png|txt)/g);
                const obj={
                    name:imageName[0],
                    uri:path
                }
                setImgData([...ImgData,obj])
                }) 
                 })
          .catch((e) => alert(e));
      }
      const post=()=>{
          if(ImgData===[])
          {
            Alert.alert('Error', 'No Post selected', [
                {text: 'Ok'}
            ]);
            return;
          }
          setloader(true);
          console.log(ImgData)
         ImgData.forEach(image=>{
            storage()
            .ref(`images/${image.name}`)
            .putFile(image.uri)
            .then((snapshot) => {
             console.log(`${image.name} has been successfully uploaded.`);
             getImages(image)
             }).then(d=>{
               console.log(Url)
               sendData();
               console.log("Data send");
             })
            .catch((e) => console.log('uploading image error => ', e));
         })
         
    }
    const sendData=()=>{
        if(Url.length===0)return; 
        const data={
            photo:Url
        }
        const options={
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                "Authorization":"Bearer "+Token
            },
            body:JSON.stringify(data)
        }
        fetch('https://instagserver.herokuapp.com/status',options).then(res=>res.json()).then(data=>{
      console.log(data)
      setloader(false)
      sendNotification();
      navigation.navigate('home',{user:User,token:Token})
  }).catch(error=>{
    setloader(false)
      Alert.alert('Error', 'Something went wrong', [
          {text: 'Ok'}
      ]);
  })

    }
      const getImages=(image)=>{
         storage()
        .ref('images')
        .child(`${image.name}`)
        .getDownloadURL()
        .then((url) => {
            console.log(url)
            setUrl([...Url,url])
        })
        .catch((e) => console.log('getting downloadURL of image error => ', e));   
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
      const sendNotification=()=>{
        const data={
          "registration_ids": [" fwcM6xsBRUC6vk5g8I9Znl:APA91bH95f2jZxsABHW9MjnBgwGvmv95wan1HSwWQ5EVXZ0FHP55pb1sS9wQdPZeoigRy2UEoHGIlLmplwWsaDT4dvv5o6Ue95L9p7OIgF2fxkh_jtFzm3LHSIJi0mbexWhqpq2xyZwX"],
          "content_avaliable": true,
          "priority": "high",
          "notification": {
              "title": "Instagram",
              "body": "Stories added successfully",
              "color": "#96c93e"
          }
        }
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':"key=AAAAxe8Vo5Q:APA91bG-2IQvRvwY7DOGIKv_Y8zrrzc7XS5bPes1Srp9ArvMl9uKZq8lt6bmS5zKsx9jD19iAC3T2-5G1NRkc0Mga6nKIF107FxWBHAcb5L_1rEIt6dkHxqutBzdESTjqM4LLBKUhBft"
            },
            body:JSON.stringify(data)
        }
        fetch('https://fcm.googleapis.com/fcm/send',options).then((res)=>res.json()).then(data=>{
            console.log(data)

        })

    }
    return (
        <View style={{flex:1}}>
               {
            loader?<ActivityIndicator size="large" color="#0095F6" style={{marginTop:200}}/>:<></>
        }
               {
                    ImgData?
            <FlatList
         style={{
           marginTop:45
         }}
        data={ImgData}
        renderItem={({item,index}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 2
            }}>
            {mediatype(item.uri)==='image'?
          <Image
          style={{justifyContent: 'center',
          alignItems: 'center',
          height: 150,
        width:100}}
          source={{uri:item.uri}}
        />
        :  
        <Video
          style={{justifyContent: 'center',
          alignItems: 'center',
          height: 100,}}
          source={{uri: item.uri}}
          repeat={true}
          resizeMode="cover"
          paused={true}
        />
          }
          </View>
        )}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
      :
      <></>
        }
     
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',padding:5,position:'absolute',bottom:56,left:0,right:0}}>
            <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',backgroundColor:'#0095F6',height:35,width:150,borderRadius:5}}>
                <Entypo name="camera" style={{fontSize:20,color:'#fff'}}/>
               <Text style={{fontFamily:'Roboto-Regular',fontSize:15,padding:5,fontWeight:'700',color:'#fff'}} onPress={()=>pickSingleWithCamera()}>Camera</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',backgroundColor:'#0095F6',height:35,width:150,borderRadius:5}}>
           <Entypo name="images" style={{fontSize:20,color:'#fff'}}/>
               <Text style={{fontFamily:'Roboto-Regular',fontSize:15,padding:5,fontWeight:'700',color:'#fff'}} onPress={()=>pickMultiple()}>Gallery</Text>
           </TouchableOpacity>
            </View>
            <TouchableOpacity style={{
                 backgroundColor:'#fff',
                 padding:10,
                 borderRadius:3,
                 width:'90%',
                 justifyContent:"center",
                 alignItems:'center',
                 marginTop:25,
                 marginLeft:20,
                 marginBottom:5,
                 borderWidth:1,
                 borderColor:'#0095F6'
            }} onPress={()=>post()}>
             <Text style={{
                  color:'#0095F6',
                  fontFamily:'Roboto-Regular',
                  fontSize:15,
                  fontWeight:'700'

             }
             }>Add Story</Text>
         </TouchableOpacity>
        </View>
    )
}

export default NewPost
   /*  {
                    ImgData?
            <FlatList
         style={{
           marginTop:45
         }}
        data={ImgData}
        renderItem={({item,index}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 2
            }}>
            {mediatype(item.uri)==='image'?
          <Image
          style={{justifyContent: 'center',
          alignItems: 'center',
          height: 150,
        width:100}}
          source={{uri:"file:///data/user/0/com.instagram/cache/react-native-image-crop-picker/Screenshot_20201125-115923.jpg"}}
        />
        :  
        <Video
          style={{justifyContent: 'center',
          alignItems: 'center',
          height: 100,}}
          source={{uri: item.uri}}
          repeat={true}
          resizeMode="cover"
          paused={true}
        />
          }
          </View>
        )}
        //Setting the number of column
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
      :
      <></>
        }*/