import React, { useRef, useState,useEffect } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View,Dimensions,Alert,ScrollView, RefreshControl,TextInput} from 'react-native';
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';
import StoryContainer from '../components/StoryContainer';
import HomePageHeader from '../components/HomePageHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Heart from '../components/Heart';
import Feather from 'react-native-vector-icons/Feather';
import Bookmark from '../components/Bookmark';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { LogBox } from 'react-native';
var Fullwidth = Dimensions.get('screen').width;
import Video from 'react-native-video';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const HomePage = ({route,navigation}) => {
    const {token}=route.params;
    const {user}=route.params;
    const [User,setUser]=useState(user)
    const [Token,setToken]=useState(token)
    const [isModelOpen, setModel] = useState(false);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [currentScrollValue, setCurrentScrollValue] = useState(0);
    const modalScroll = useRef(null);
    const [AllStories,setStory]=useState([]);
    const [Allpost,setPost]=useState([]);
    const [refreshing,setRefreshing]=useState(false);
    const [text,setText]=useState("");
    const [animatedValue,setAnimatedValue]=useState(0);
    let lastTap=null;
    let delay=300;
    useEffect(() => {
       
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        const options={
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                "Authorization":"Bearer "+token
            },
        }
        fetch('https://instagserver.herokuapp.com/status',options).then(res=>res.json()).then(data=>{
            //console.log(data)
            
             setStory(data)
        }).catch(error=>{
            Alert.alert('Error', 'Something went wrong', [
                {text: 'Ok'}
            ]);
        })
        fetch('https://instagserver.herokuapp.com/post/allpost',options).then(res=>res.json()).then(post=>{
        console.log(post[0].comment[0].text)    
        setPost(post)   
        }).catch(error=>{
            Alert.alert('Error', 'Something went wrong', [
                {text: 'Ok'}
            ]);
        }) 
    }, [])
   const ReRender=()=>{
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    const options={
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            "Authorization":"Bearer "+Token
        },
    }
    fetch('https://instagserver.herokuapp.com/status',options).then(res=>res.json(                
    )).then(data=>{
        //console.log(data)
         setStory(data)
    }).catch(error=>{
        Alert.alert('Error', 'Something went wrong', [
            {text: 'Ok'}
        ]);
    })
    fetch('https://instagserver.herokuapp.com/post/allpost',options).then(res=>res.json()).then(post=>{
    //console.log(post[0].comment[0])    
    setPost(post)   
    }).catch(error=>{
        Alert.alert('Error', 'Something went wrong', [
            {text: 'Ok'}
        ]);
    })
}
const Refreshing=()=>{
  setRefreshing(true);
  LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  const options={
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          "Authorization":"Bearer "+Token
      },
  }
  fetch('https://instagserver.herokuapp.com/status',options).then(res=>res.json(                
  )).then(data=>{
      //console.log(data)
       setStory(data)
  }).catch(error=>{
      Alert.alert('Error', 'Something went wrong', [
          {text: 'Ok'}
      ]);
  })
  fetch('https://instagserver.herokuapp.com/post/allpost',options).then(res=>res.json()).then(post=>{
  //console.log(post[0].comment[0])    
  setPost(post)   
  }).catch(error=>{
      Alert.alert('Error', 'Something went wrong', [
          {text: 'Ok'}
      ]);
  })
  setRefreshing(false);
}
    const onStorySelect = (index) => {
      setCurrentUserIndex(index);
      setModel(true);
    };
  
    const onStoryClose = () => {
      setModel(false);
    };
  
    const onStoryNext = (isScroll) => {
      const newIndex = currentUserIndex + 1;
      if (AllStories.length - 1 > currentUserIndex) {
        setCurrentUserIndex(newIndex);
        if (!isScroll) {
          modalScroll.current.scrollTo(newIndex, true);
        }
      } else {
        setModel(false);
      }
    };
  
    const onStoryPrevious = (isScroll) => {
      const newIndex = currentUserIndex - 1;
      if (currentUserIndex > 0) {
        setCurrentUserIndex(newIndex);
        if (!isScroll) {
          modalScroll.current.scrollTo(newIndex, true);
        }
      }
    };
  
    const onScrollChange = (scrollValue) => {
      if (currentScrollValue > scrollValue) {
        onStoryNext(true);
        console.log('next');
        setCurrentScrollValue(scrollValue);
      }
      if (currentScrollValue < scrollValue) {
        onStoryPrevious();
        console.log('previous');
        setCurrentScrollValue(scrollValue);
      }
    };
    const likePost=(id)=>{
           setAnimatedValue(0.9)
           setTimeout(() => {
            setAnimatedValue(0)
           },1000 );
            const data={
                postId:id
            }
        const options={
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                "Authorization":"Bearer "+Token
            },
            body:JSON.stringify(data)
        }
        fetch('https://instagserver.herokuapp.com/post/like',options).then(res=>res.json(                
        )).then(data=>{
            console.log(data)
            ReRender();
             
        }).catch(error=>{
            Alert.alert('Error', 'Something went wrong', [
                {text: 'Ok'}
            ]);
        })
      }
      
      const unlikePost=(id)=>{
        const data={
            postId:id
        }
        
        const options={
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                "Authorization":"Bearer "+Token
            },
            body:JSON.stringify(data)
        }
        fetch('https://instagserver.herokuapp.com/post/unlike',options).then(res=>res.json(                
        )).then(data=>{
            console.log(data)
            // setStory(data)
            ReRender();
        }).catch(error=>{
            Alert.alert('Error', 'Something went wrong', [
                {text: 'Ok'}
            ]);
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
      const ChangeText=(data)=>{
        setText(data)
        if(data==="")
        {
          return;
        }
      }
      const comment=(id)=>{
        
        if(text==="")return;
        const data={
          postId:id,
          text:text
      }
      setText("");
  const options={
      method:'PUT',
      headers:{
          'Content-Type':'application/json',
          "Authorization":"Bearer "+Token
      },
      body:JSON.stringify(data)
  }
  
  fetch('https://instagserver.herokuapp.com/post/comment',options).then(res=>res.json(                
  )).then(data=>{
    
      console.log(data)
      ReRender();
       
  }).catch(error=>{
      Alert.alert('Error', 'Something went wrong', [
          {text: 'Ok'}
      ]);
  })
      }
   
    return (
        <View >
            <View style={styles.header_container}>
                <View style={styles.header_icon}>
                    <Feather name="camera" style={styles.icon}/>
                    <Text style={styles.instgram_logo} >Instagram</Text>
                </View>
                <View style={styles.header_icon}>
                    <Feather name="search" style={styles.icon} />
                    <Feather name="navigation" style={styles.icon} />
                </View>
            </View>
           <ScrollView 
        
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={()=>Refreshing()}/>
        }
        >   
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('New-Story',{user:User,token:Token})} style={{alignItems:'center',flexDirection:'column',borderRadius:50,marginTop:57,marginLeft:5}}>
            <Image source={{uri:'https://ctcs.kz/wp-content/uploads/2019/12/no-avatar-8.png'}} style={{height:70,width:70,borderRadius:50}}/>
            <Ionicons name="add-circle" style={{fontSize:25,color:'#0095F6',marginTop:-25,marginLeft:50}}/>
            <Text style={styles.title}>Your Story</Text>
            </TouchableOpacity>
             <FlatList
            style={{
                marginTop:50,
                borderBottomWidth:1,
                borderBottomColor:'#CCC',
                padding:5,
                height:100
            }}
        data={AllStories}
        horizontal
        renderItem={({ item,index  }) => (
          <TouchableOpacity onPress={() => onStorySelect(index)}>
            <Image
              style={styles.circle}
              source={{ uri: item.profile.profilePic }}
              isHorizontal
            />
            <Text style={styles.title}>{item.userName}</Text>

          </TouchableOpacity>
        )}
        keyExtractor={(item)=>item._id}
      />
    </View>
<FlatList

data={Allpost}
renderItem={({ item,index  }) =>(
  <View style={{width:'100%',height:650,backgroundColor:'#fff'}}>
  <View style={{width:'100%',height:48,borderBottomWidth:1,borderBottomColor:'#ccc',flexDirection:'row',padding:5,justifyContent:'space-between',alignItems:'center'}}>
      <Image source={{uri:item.profilePic}} style={{width:30,height:30,borderRadius:15}}/>
<Text style={{fontFamily:'Roboto-Regular',fontSize:12,fontWeight:'700',flex:0.9}} onPress={
    ()=>(item.postedBy._id===User._id)?navigation.navigate('profile',{user:User,token:Token}
    ):
    navigation.navigate('other-profile',{user:User,token:Token,Id:item.postedBy._id})
    
    }>{item.name}</Text>
      <Entypo name="dots-three-vertical" style={{fontSize:15}}/>
  </View>
  
  <View >
  {mediatype(item.photo[0])==='image'?
  
  <Image source={{uri:item.photo[0]}} style={{width:'100%',height:400}} />
  :
  <Video source={{uri:item.photo[0]}} repeat={true} resizeMode="cover" style={{width:'100%',height:400}}/>
  }
  <Image
      source={require('../images/heart.png')}
      style={{ opacity: animatedValue,position: 'absolute',alignItems: 'center',justifyContent: 'center',
      left: 120,right: 0,top: 150,bottom: 0,tintColor:'#fff',height:100,width:100}}
    />
</View>
  <View style={{width:'100%',height:48,flexDirection:'row',padding:5,justifyContent:'space-between',alignItems:'center'}}>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginLeft:5}}>
      <Heart style={{padding:10}} likePost={likePost} unlikePost={unlikePost} Token={Token} id={item._id}/>
      <Ionicons name="chatbubble-outline" style={{fontSize:24,padding:12}}/>
      <Feather name="navigation" style={{fontSize:24,padding:0}}/>
      </View>
      <Bookmark/>
  </View>
  <View style={{flexDirection:'column',marginLeft:5}}>
      <Text style={{fontSize:14,fontWeight:'700',fontFamily:'Roboto-Regular',paddingLeft:5}}>{item.like.length} likes</Text>
      <View style={{flexDirection:'row'}}>
<Text style={{fontSize:13,fontWeight:'700',fontFamily:'Roboto-Regular',padding:5}}>{item.name}</Text>
<Text style={{fontSize:13,fontFamily:'Roboto-Regular',padding:5,paddingLeft:1}}>{item.message}</Text>
      </View>
<Text style={{fontSize:14,fontFamily:'Roboto-Regular',fontWeight:'600',color:'#ccc',paddingLeft:5,paddingTop:2}} onPress={()=>navigation.navigate('Comments',{user:item})}>View {item.comment.length>1?`all ${item.comment.length} comments`:"comment"}</Text>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:13,fontWeight:'700',fontFamily:'Roboto-Regular',padding:5}}>{}</Text>
<Text style={{fontSize:13,fontFamily:'Roboto-Regular',padding:5,paddingLeft:1}}>{(item.comment.toString()).text}</Text>
      </View>
      <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginLeft:5}}>
            <Image source={{uri:'https://ctcs.kz/wp-content/uploads/2019/12/no-avatar-8.png'}} style={{width:25,height:25,borderRadius:15}}/>
            <TextInput placeholder="Add a comment..."  style={{width:"100%",flex:0.9}} value={text} onChangeText={(data)=>ChangeText(data)}/>
            <Text style={{color:'#BDDFFC',paddingHorizontal:9}}  onPress={()=>comment(item._id)}>POST</Text>
        </TouchableOpacity>
  </View>
</View>
)}
keyExtractor={(item)=>item._id}
/>
</ScrollView>
     
       <Modal
        animationType="slide"
        transparent={false}
        visible={isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            modalScroll.current.scrollTo(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}
      >
       
        <CubeNavigationHorizontal callBackAfterSwipe={g => onScrollChange(g)} ref={modalScroll} style={styles.container}>
          {AllStories.map((item, index) =>
             (
                <StoryContainer
                onClose={onStoryClose}
                onStoryNext={onStoryNext}
                onStoryPrevious={onStoryPrevious}
                user={item}
                isNewStory={index !== currentUserIndex}
              />
            
          )
           
          )}
        </CubeNavigationHorizontal>
      </Modal>
      <View style={{bottom:0,left:0,right:0,position:'absolute',elevation:4,justifyContent:'space-evenly',alignItems:'center',width:'100%',height:45,flexDirection:'row',backgroundColor:'#fff',borderTopColor:'#ccc',borderTopWidth:1}}>
          <Entypo name="home" style={{fontSize:25}} onPress={()=>navigation.navigate('home',{user:User,token:Token})}/>
          <FontAwesome5 name="photo-video" style={{fontSize:20}} onPress={()=>navigation.navigate('Grid',{token:Token})}/>
          <Octicons name="diff-added" style={{fontSize:25}} onPress={()=>navigation.navigate('New-Post',{user:User,token:Token})}/>
          <Feather name="heart" style={{fontSize:25}} onPress={()=>navigation.navigate('New Request',{user:User,token:Token})}/>
          <FontAwesome name="user-circle-o" style={{fontSize:25}} onPress={()=>navigation.navigate('profile',{user:User,token:Token})}/>
      </View>
  
        </View>
    )
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingVertical: 50,
        backgroundColor: 'rgba(255,255,255,255)',
      },
      circle: {
        width: 66,
        margin: 4,
        height: 66,
        borderRadius: 33,
        borderWidth: 2,
        borderColor: '#72bec5',
      },
      modal: {
        flex: 1,
      },
      title: {
        fontSize: 12, textAlign: 'center',
      },
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
export default HomePage
 /* const [isModelOpen, setModel] = useState(false);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [currentScrollValue, setCurrentScrollValue] = useState(0);
    const modalScroll = useRef(null);
  
    const onStorySelect = (index) => {
      setCurrentUserIndex(index);
      setModel(true);
    };
  
    const onStoryClose = () => {
      setModel(false);
    };
  
    const onStoryNext = (isScroll) => {
      const newIndex = currentUserIndex + 1;
      if (AllStories.length - 1 > currentUserIndex) {
        setCurrentUserIndex(newIndex);
        if (!isScroll) {
          modalScroll.current.scrollTo(newIndex, true);
        }
      } else {
        setModel(false);
      }
    };
  
    const onStoryPrevious = (isScroll) => {
      const newIndex = currentUserIndex - 1;
      if (currentUserIndex > 0) {
        setCurrentUserIndex(newIndex);
        if (!isScroll) {
          modalScroll.current.scrollTo(newIndex, true);
        }
      }
    };
  
    const onScrollChange = (scrollValue) => {
      if (currentScrollValue > scrollValue) {
        onStoryNext(true);
        console.log('next');
        setCurrentScrollValue(scrollValue);
      }
      if (currentScrollValue < scrollValue) {
        onStoryPrevious();
        console.log('previous');
        setCurrentScrollValue(scrollValue);
      }
    };*/
/*<FlatList
            style={{
                marginTop:50,
                borderBottomWidth:1,
                borderBottomColor:'#CCC',
                padding:5
            }}
        data={AllStories}
        horizontal
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => onStorySelect(index)}>
            <Image
              style={styles.circle}
              source={{ uri: item.profile }}
              isHorizontal
            />
            <Text style={styles.title}>{item.title}</Text>

          </TouchableOpacity>
        )}
      />
       
       <Modal
        animationType="slide"
        transparent={false}
        visible={isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            modalScroll.current.scrollTo(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}
      >
       
        <CubeNavigationHorizontal callBackAfterSwipe={g => onScrollChange(g)} ref={modalScroll} style={styles.container}>
          {AllStories.map((item, index) => (
            <StoryContainer
              onClose={onStoryClose}
              onStoryNext={onStoryNext}
              onStoryPrevious={onStoryPrevious}
              user={item}
              isNewStory={index !== currentUserIndex}
            />
          ))}
        </CubeNavigationHorizontal>
      </Modal> */
      /*container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingVertical: 50,
        backgroundColor: 'rgba(255,255,255,255)',
      },
      circle: {
        width: 66,
        margin: 4,
        height: 66,
        borderRadius: 33,
        borderWidth: 2,
        borderColor: '#72bec5',
      },
      modal: {
        flex: 1,
      },
      title: {
        fontSize: 9, textAlign: 'center',
      },*/
      /*
       <ScrollView  contentContainerStyle={{flexGrow:1,marginTop:45}}>
                <View style={{width:'100%',height:800,backgroundColor:'#fff'}}>
                    <View style={{width:'100%',height:48,borderBottomWidth:1,borderBottomColor:'#ccc',flexDirection:'row',padding:5,justifyContent:'space-between',alignItems:'center'}}>
                        <Image source={{uri:'https://avatars0.githubusercontent.com/u/16208872?s=460&v=4'}} style={{width:30,height:30,borderRadius:15}}/>
                        <Text style={{fontFamily:'Roboto-Regular',fontSize:12,fontWeight:'700',flex:0.9}}>Name</Text>
                        <Entypo name="dots-three-vertical" style={{fontSize:15}}/>
                    </View>
                    <View>
                        <Image source={{uri:'https://avatars0.githubusercontent.com/u/16208872?s=460&v=4'}} style={{width:'100%',height:400}}/>
                    </View>
                    <View style={{width:'100%',height:48,flexDirection:'row',padding:5,justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Heart style={{padding:10}}/>
                        <Ionicons name="chatbubble-outline" style={{fontSize:25,padding:11}}/>
                        <Feather name="navigation" style={{fontSize:25,padding:1}}/>
                        </View>
                        <Bookmark/>

                    </View>

                </View>

            </ScrollView>*/
            /*<View style={{width:'100%',height:800,backgroundColor:'#fff'}}>
                    <View style={{width:'100%',height:48,borderBottomWidth:1,borderBottomColor:'#ccc',flexDirection:'row',padding:5,justifyContent:'space-between',alignItems:'center'}}>
                        <Image source={{uri:'https://ctcs.kz/wp-content/uploads/2019/12/no-avatar-8.png'||img}} style={{width:30,height:30,borderRadius:15}}/>
                        <Text style={{fontFamily:'Roboto-Regular',fontSize:12,fontWeight:'700',flex:0.9}}>Name</Text>
                        <Entypo name="dots-three-vertical" style={{fontSize:15}}/>
                    </View>
                    <View>
                        <Image source={{uri:'https://avatars0.githubusercontent.com/u/16208872?s=460&v=4'}} style={{width:'100%',height:400}}/>
                    </View>
                    <View style={{width:'100%',height:48,flexDirection:'row',padding:5,justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginLeft:5}}>
                        <Heart style={{padding:10}}/>
                        <Ionicons name="chatbubble-outline" style={{fontSize:24,padding:12}}/>
                        <Feather name="navigation" style={{fontSize:24,padding:0}}/>
                        </View>
                        <Bookmark/>
                    </View>
                    <View style={{flexDirection:'column',marginLeft:5}}>
                        <Text style={{fontSize:14,fontWeight:'700',fontFamily:'Roboto-Regular',paddingLeft:5}}>1000 likes</Text>
                        <Text style={{fontSize:14,fontFamily:'Roboto-Regular',fontWeight:'600',color:'#ccc',paddingLeft:5,paddingTop:2}} onPress={()=>ReRender()}>View all comments</Text>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:13,fontWeight:'700',fontFamily:'Roboto-Regular',padding:5}}>Rajesh</Text>
                        <Text style={{fontSize:13,fontFamily:'Roboto-Regular',padding:5}}>My comment</Text>
                        </View>
                      
                    </View>
                </View>*/
                /* <Image source={{uri:item.photo[0]}} style={{width:'100%',height:400}}/>*/
                /* <FlatList

      data={Allpost}
      renderItem={({ item,index  }) =>(
        <View style={{width:'100%',height:650,backgroundColor:'#fff'}}>
        <View style={{width:'100%',height:48,borderBottomWidth:1,borderBottomColor:'#ccc',flexDirection:'row',padding:5,justifyContent:'space-between',alignItems:'center'}}>
            <Image source={{uri:item.profilePic}} style={{width:30,height:30,borderRadius:15}}/>
      <Text style={{fontFamily:'Roboto-Regular',fontSize:12,fontWeight:'700',flex:0.9}}>{item.name}</Text>
            <Entypo name="dots-three-vertical" style={{fontSize:15}}/>
        </View>
        <View>
       
      </View>
    
        <View style={{width:'100%',height:48,flexDirection:'row',padding:5,justifyContent:'space-between',alignItems:'center'}}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginLeft:5}}>
            <Heart style={{padding:10}} likePost={likePost} unlikePost={unlikePost} Token={Token} id={item._id}/>
            <Ionicons name="chatbubble-outline" style={{fontSize:24,padding:12}}/>
            <Feather name="navigation" style={{fontSize:24,padding:0}}/>
            </View>
            <Bookmark/>
        </View>
        <View style={{flexDirection:'column',marginLeft:5}}>
            <Text style={{fontSize:14,fontWeight:'700',fontFamily:'Roboto-Regular',paddingLeft:5}}>{item.like.length} likes</Text>
            <View style={{flexDirection:'row'}}>
      <Text style={{fontSize:13,fontWeight:'700',fontFamily:'Roboto-Regular',padding:5}}>{item.name}</Text>
      <Text style={{fontSize:13,fontFamily:'Roboto-Regular',padding:5,paddingLeft:1}}>{item.message}</Text>
            </View>
      <Text style={{fontSize:14,fontFamily:'Roboto-Regular',fontWeight:'600',color:'#ccc',paddingLeft:5,paddingTop:2}} onPress={()=>navigation.navigate('Comments',{user:item})}>View {item.comment.length>1?`all ${item.comment.length} comments`:"comment"}</Text>
      <View style={{flexDirection:'row'}}>
      <Text style={{fontSize:13,fontWeight:'700',fontFamily:'Roboto-Regular',padding:5}}>{}</Text>
      <Text style={{fontSize:13,fontFamily:'Roboto-Regular',padding:5,paddingLeft:1}}>{(item.comment.toString()).text}</Text>
            </View>
           
        </View>
    </View>
      )}
      keyExtractor={(item)=>item._id}
      />*/