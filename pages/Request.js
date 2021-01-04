import React,{useEffect,useState} from 'react'
import { View, Text,FlatList,TouchableOpacity,ActivityIndicator,Image ,Alert} from 'react-native'

const Request = ({navigation,route}) => {
    const {token}=route.params;
    const {user}=route.params;
    let u=JSON.parse(user)
    const [User,setUser]=useState(u);
    const [Token,setToken]=useState(token);
    const [data,setData]=useState([]); 
 const [loading,setloading]=useState(false);
 useEffect(() => {
    setloading(true);
    const options={
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            "Authorization":"Bearer "+Token
        },
    }
    fetch('https://instagserver.herokuapp.com/request/view_request',options)
    .then(res=>res.json())
    .then(d=>{
        console.log(d.request)
        setloading(false)
        setData(d.request)
       

    }).catch(err=>{
        Alert.alert('Error', 'Something went wrong', [
            {text: 'Ok'}
        ]); 
    })
  }, [])
  const render=()=>{
    const options={
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            "Authorization":"Bearer "+Token
        },
    }
    fetch('https://instagserver.herokuapp.com/request/view_request',options)
    .then(res=>res.json())
    .then(d=>{
        setData(d.request)
    }).catch(err=>{
        Alert.alert('Error', 'Something went wrong', [
            {text: 'Ok'}
        ]); 
    })
}
const acceptRequest=(id)=>{
    const d={
        followerId:id
    }
    const options={
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            "Authorization":"Bearer "+Token
        },
        body:JSON.stringify(d)
    }
    fetch('https://instagserver.herokuapp.com/request/accept_request',options)
    .then(res=>res.json())
    .then(d=>{
        console.log(d)
        render();
    }).catch(err=>{
       console.log(err)
    })
  }
  const denyRequest=(id)=>{
    const d={
        followerId:id
    }
    const options={
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            "Authorization":"Bearer "+Token
        },
        body:JSON.stringify(d)
    }
    fetch('https://instagserver.herokuapp.com/request/deny',options)
    .then(res=>res.json())
    .then(d=>{
        console.log(d);
        render();
    }).catch(err=>{
      console.log(err)
    })
  }
    return (
        <View>
        {
            (loading)?
            <ActivityIndicator  size="large"  color="#0000ff" style={{marginTop:200}}/>
            :
             <View  style={{backgroundColor:'#fff',flex:1}}>
                 {
                     (data.length===0)
                     ?
                     <Text style={{fontSize:12,fontFamily:'Roboto-Regular',justifyContent:'center',alignItems:'center',margin:'35%'}}>No Follow Request</Text>
                     :
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
    }        
</View>
}
</View>
)
}

export default Request

/*<View>
            {
                (loading)?
                <ActivityIndicator  size="large"  color="#0000ff" style={{marginTop:200}}/>
                :
                 <View  style={{backgroundColor:'#fff',flex:1}}>
            <FlatList 
            data={data}
            renderItem={({item,index})=>(
                <View style={{flexDirection:'row',margin:5,backgroundColor:'#fff',justifyContent:'center',alignItems:'center',height:50}} >
                <View style={{flexDirection:'row',flex:0.9}} >
                <Image source={{uri:item.profile.profilePic}} style={{width:50,height:50,borderRadius:25,borderColor:'#ccc',borderWidth:1,marginLeft:5}}/>
                <View style={{flexDirection:'column',padding:5,justifyContent:'center',marginLeft:6}}>
                <Text style={{fontFamily:'Roboto-Regular',fontSize:12,fontWeight:'700',marginBottom:3}} onPress={()=>navigation.navigate('other-profile',{user:User,token:Token,Id:item._id})}>{item._id}</Text>
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
</View>
               
            }
        </View>*/