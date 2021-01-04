import React,{useEffect,useState} from 'react'
import { View, Text,TouchableOpacity,FlatList,Image } from 'react-native'

const Follow = ({route,navigation}) => {
    const {token}=route.params;
    const {user}=route.params;
    const [Token,setToken]=useState(token);
    const [User,setUser]=useState(user);
    const [data,setData]=useState([]);    
    const [followTigger,setfollowTigger]=useState(true);
    const [followingTigger,setfollowingTigger]=useState(false);
    useEffect(() => {
        console.log(user)
        const options={
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                "Authorization":"Bearer "+Token
            },
        }
        fetch('https://instagserver.herokuapp.com/request/followers',options)
        .then(res=>res.json())
        .then(data=>{
           
            setData(data.followers)
         
          console.log(data.followers)
        })
        .catch(error=>{
           
            console.log(error);
          });
      }, []);
      const GetFollower=()=>{
         
        const options={
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                "Authorization":"Bearer "+Token
            },
        }
        fetch('https://instagserver.herokuapp.com/request/followers',options)
        .then(res=>res.json())
        .then(data=>{
            setfollowingTigger(false)
            setfollowTigger(true)
       
            setData(data.followers)
          console.log(data.followers)
        })
        .catch(error=>{
       
            console.log(error);
          });
      }
      const GetFollowing=()=>{
         
        const options={
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                "Authorization":"Bearer "+Token
            },
        }
        fetch('https://instagserver.herokuapp.com/request/following',options)
        .then(res=>res.json())
        .then(data=>{
            setfollowTigger(false)
            setfollowingTigger(true)
            setData(data.following)
            console.log(data.following)
        })
        .catch(error=>{
      
            console.log(error);
          });
      }

      const followUser=(id)=>{

        const d={
            followingId:id
        }
        const options={
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                "Authorization":"Bearer "+Token
            },
            body:JSON.stringify(d)
        }
        fetch('https://instagserver.herokuapp.com/request/follow_request',options)
        .then(res=>res.json())
        .then(data=>{
     
          console.log(data)
        })
        .catch(error=>{
         
            console.log(error);
          });    
      }
      const unfollowUser=(id)=>{
     
        const d={
            followingId:id
        }
        const options={
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                "Authorization":"Bearer "+Token
            },
            body:JSON.stringify(d)
        }
        fetch('https://instagserver.herokuapp.com/request/unfollow',options)
        .then(res=>res.json())
        .then(data=>{
            
          console.log(data)
        })
        .catch(error=>{
        
            console.log(error);
          });    
      }
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <View style={{flexDirection:'row',width:'100%',height:45,borderColor:'#ccc',borderBottomWidth:1,justifyContent:'space-around',alignItems:'center'}}>
               <Text style={{fontFamily:'Roboto-Regular',fontSize:14,justifyContent:'center',alignItems:'center'}} onPress={()=>GetFollower()}>Followers</Text>
               <Text style={{fontFamily:'Roboto-Regular',fontSize:14,justifyContent:'center',alignItems:'center'}} onPress={()=>GetFollowing()}>Following</Text>
            </View>
            <View>
                {
                    (followTigger)?
                    <FlatList 
                    data={data}
                    renderItem={({item,index})=>(
                        <View style={{flexDirection:'row',margin:5,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',height:50}} >
                        <View style={{flexDirection:'row',flex:1}} >
                        <Image source={{uri:item.profile.profilePic}} style={{width:50,height:50,borderRadius:25,borderColor:'#ccc',borderWidth:1,marginLeft:5}}/>
                        <View style={{flexDirection:'column',padding:5,justifyContent:'center',marginLeft:6}}>
                        <Text style={{fontFamily:'Roboto-Regular',fontSize:12,fontWeight:'700',marginBottom:3}} onPress={()=>navigation.navigate('other-profile',{user:User,token:Token,Id:item._id})}>{item.name}</Text>
                        <Text style={{fontFamily:'Roboto-Regular',fontSize:12,fontWeight:'600',color:'#c2c2a3'}} onPress={()=>navigation.navigate('other-profile',{user:User,token:Token,Id:item._id})}>{item.userName}</Text>
                        </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-evenly'}} >
                        <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#0095F6',height:35,width:75,borderRadius:5}} onClick={()=>followUser(item._id)} >
                        <Text style={{fontFamily:'Roboto-Regular',fontSize:15,padding:5,fontWeight:'700',color:'#fff'}} >Follow</Text>                        
                        </TouchableOpacity>
                        </View>
                    </View>
                    )}
                    />
                    :
                    <></>
                }

            </View>
            <View>
                {
                    (followingTigger)?
                    <FlatList 
                    data={data}
                    renderItem={({item,index})=>(
                        <View style={{flexDirection:'row',margin:5,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',height:50}} >
                        <View style={{flexDirection:'row',flex:1}} >
                        <Image source={{uri:item.profile.profilePic}} style={{width:50,height:50,borderRadius:25,borderColor:'#ccc',borderWidth:1,marginLeft:5}}/>
                        <View style={{flexDirection:'column',padding:5,justifyContent:'center',marginLeft:6}}>
                        <Text style={{fontFamily:'Roboto-Regular',fontSize:12,fontWeight:'700',marginBottom:3}} onPress={()=>navigation.navigate('other-profile',{user:User,token:Token,Id:item._id})}>{item.name}</Text>
                        <Text style={{fontFamily:'Roboto-Regular',fontSize:12,fontWeight:'600',color:'#c2c2a3'}} onPress={()=>navigation.navigate('other-profile',{user:User,token:Token,Id:item._id})}>{item.userName}</Text>
                        </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-evenly'}} >
                        <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#0095F6',height:35,width:75,borderRadius:5}} onClick={()=>unfollowUser(item._id)} >
                        <Text style={{fontFamily:'Roboto-Regular',fontSize:15,padding:5,fontWeight:'700',color:'#fff'}} >Unfollow</Text>                        
                        </TouchableOpacity>
                        </View>
                    </View>
                    )}
                    />
                    :
                    <></>
                }

            </View>
           
        </View>
    )
}

export default Follow;
/*<View>
                {
                    (followTigger)?
                    <FlatList 
                    data={data}
                    renderItem={({item,index})=>(
                        <View style={{flexDirection:'row',margin:5,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',height:50}} >
                        <View style={{flexDirection:'row',flex:0.9}} >
                        <Image source={{uri:item.profile.profilePic}} style={{width:50,height:50,borderRadius:25,borderColor:'#ccc',borderWidth:1,marginLeft:5}}/>
                        <View style={{flexDirection:'column',padding:5,justifyContent:'center',marginLeft:6}}>
                        <Text style={{fontFamily:'Roboto-Regular',fontSize:12,fontWeight:'700',marginBottom:3}} onPress={()=>navigation.navigate('other-profile',{user:User,token:Token,Id:item._id})}>{item.name}</Text>
                        <Text style={{fontFamily:'Roboto-Regular',fontSize:12,fontWeight:'600',color:'#c2c2a3'}} onPress={()=>navigation.navigate('other-profile',{user:User,token:Token,Id:item._id})}>{item.userName}</Text>
                        </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-evenly',flex:1}} >
                        <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#0095F6',height:35,width:75,borderRadius:5}} onPress={()=>acceptRequest(item._id)}>
                        <Text style={{fontFamily:'Roboto-Regular',fontSize:15,padding:5,fontWeight:'700',color:'#fff'}} >Confirm</Text>                        
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#fff',borderColor:'#ccc',borderWidth:1,height:35,width:75,borderRadius:5}} onPress={()=>denyRequest(item._id)}>
                        <Text style={{fontFamily:'Roboto-Regular',fontSize:15,padding:5,fontWeight:'700',color:'#000'}} >Delete</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    )}
                    />
                    :
                    <></>
                }

            </View>*/