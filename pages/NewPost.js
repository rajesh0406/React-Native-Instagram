import React,{useState} from 'react'
import { View, Text,Alert,TouchableOpacity,Image,TextInput,FlatList,ActivityIndicator} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Video from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';
const NewPost = ({route,navigation}) => {
    const {token}=route.params;
    const {user}=route.params;
    const [User,setUser]=useState(user)
    const [Token,setToken]=useState(token)
    const [ImgData,setImgData]=useState([]);
    const [text,setText]=useState("");
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
          if(ImgData===[] && text==="")
          {
            Alert.alert('Error', 'No Post selected', [
                {text: 'Ok'}
            ]);
            return;
          }
          if(ImgData===[])return;
          if(text==="")
          {
            Alert.alert('Error', 'Add a Text', [
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
             }).then(r=>{
                 console.log(Url)
                sendData();
             }).catch((e) => console.log('uploading image error => ', e));
         })
        console.log(Url)
    }
    const sendData=()=>{ 
        if(text==="" || Url.length===0)return;
        const data={
            title:'Title',
            message:text,
            photo:Url
        }
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "Authorization":"Bearer "+Token
            },
            body:JSON.stringify(data)
        }
        setText("")
        fetch('https://instagserver.herokuapp.com/post/new',options).then(res=>res.json()).then(data=>{
      console.log(data)

      setloader(false)
      navigation.navigate('home',{user:User,token:Token})
  }).catch(error=>{
    setloader(false)
      Alert.alert('Error', 'Something went wrong', [
          {text: 'Ok'}
      ]);
  })
        setloader(false)

    }
      const getImages=(image)=>{
         storage()
        .ref('images')
        .child(`${image.name}`)
        .getDownloadURL()
        .then((url) => {
            //console.log(url)
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
             <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginLeft:25,bottom:0,
                position:"absolute",}}>
            <Image source={{uri:'https://ctcs.kz/wp-content/uploads/2019/12/no-avatar-8.png'}} style={{width:25,height:25,borderRadius:15}}/>
            <TextInput placeholder="Add a comment..."  style={{width:"100%",flex:0.9}} value={text} onChangeText={(data)=>setText(data)} />
            <Text style={{color:'#BDDFFC',paddingHorizontal:9}}  onPress={()=>post()}>POST</Text>
        </TouchableOpacity>
        </View>
    )
}

export default NewPost;
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