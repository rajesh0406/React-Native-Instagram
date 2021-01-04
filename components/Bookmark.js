import React,{useState} from 'react'
import { View, Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Bookmark = () => {
    const [ToggleBookmark,setBookmark]=useState(true);
    const bookmark=()=>{
        setBookmark(!ToggleBookmark);
    }
    const unbookmark=()=>{
        setBookmark(!ToggleBookmark);
    }
    return (
        <View>
            {
                ToggleBookmark?
                <FontAwesome name="bookmark-o" onPress={()=>bookmark()} style={{fontSize:24}}/>
                :
                <FontAwesome name="bookmark" onPress={()=>unbookmark()} style={{fontSize:24}}/>
            }
        </View>
    )
}

export default Bookmark
