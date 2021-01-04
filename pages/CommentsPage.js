import React from 'react'
import { View, Text,FlatList,Image,ScrollView} from 'react-native'
const CommentsPage = ({route}) => {
    const {user}=route.params
    const comment=user.comment;
    
    return (
        <View style={{flex:1}}>
            <ScrollView>          
                  <View style={{flexDirection:'row',padding:10,alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ccc'}}>
            <Image source={{uri:user.profilePic}} style={{width:30,height:30,borderRadius:15}}/>
        <Text style={{fontSize:15,fontWeight:'700',fontFamily:'Roboto-Regular',padding:7}}>{user.name}</Text>
        <Text style={{fontSize:15,fontFamily:'Roboto-Regular',padding:7,paddingLeft:1}}>{user.message}</Text>
        </View>
            <FlatList
        data={comment}
        renderItem={({ item,index  }) => (
            <View style={{flexDirection:'row',padding:7,alignItems:'center'}}>
            <Image source={{uri:item.profilePic}} style={{width:30,height:30,borderRadius:15}}/>
        <Text style={{fontSize:15,fontWeight:'700',fontFamily:'Roboto-Regular',padding:7}}>{item.name}</Text>
        <Text style={{fontSize:15,fontFamily:'Roboto-Regular',padding:7,paddingLeft:1}}>{item.text}</Text>
        </View>
        )}
        keyExtractor={(item)=>item._id}
      />
        </ScrollView>
       </View>
     

    )
}

export default CommentsPage;
/*<View style={{flexDirection:'row'}}>
                <Image source={{uri:item.profilePic}} style={{width:25,height:25,borderRadius:15}}/>
            <Text style={{fontSize:13,fontWeight:'700',fontFamily:'Roboto-Regular',padding:5}}>{item.name}</Text>
            <Text style={{fontSize:13,fontFamily:'Roboto-Regular',padding:5,paddingLeft:1}}>{item.text}</Text>
            </View> */