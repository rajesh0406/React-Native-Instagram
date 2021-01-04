import React,{useState} from 'react'
import { View, Text } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
const Heart = ({likePost,unlikePost,id}) => {
    const [ToggleHeart,setToggleHeart]=useState(true)
    const likeHeart=()=>{
        setToggleHeart(!ToggleHeart);
        likePost(id);
    }
    const unlikeHeart=()=>{
        setToggleHeart(!ToggleHeart);
        unlikePost(id)
    }

    return (
        <View>
            {
                ToggleHeart?
                <AntDesign name="hearto" onPress={()=>likeHeart()} style={{fontSize:24,color:'#000'}}/>
                :
                <AntDesign name="heart" onPress={()=>unlikeHeart()} style={{fontSize:24,color:'#e60000'}}/>
                            }
        </View>
    )
}
export default Heart;