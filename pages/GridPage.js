import React,{useEffect,useState} from 'react'
import {  Image,StyleSheet,View,ActivityIndicator,TouchableOpacity,TextInput,FlatList} from 'react-native';
import IconA from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';

const GridPage = ({navigation,route}) => {
  const {token}=route.params;
  const [Token,setToken]=useState(token);
  const [imageData,setimageData]=useState([]);
  const [loader,setloader]=useState(false);
    useEffect(()=>{
      setloader(true);
        const options={
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+Token
            },
        }
        fetch("https://instagserver.herokuapp.com/post/allpost",options).then(res=>res.json()).then(data=>{
            var array=[];
            var i;
            for (i of data)
            {
                array=array.concat(i.photo)
                //console.log(array)
                //console.log(i.photo)
               //setimageData(oldArray=>[...oldArray,i.photo])
              
            }
           //console.log(array)
           setimageData(array)
           setloader(false);

        }).catch(error=>{
            console.log(error)
        })
    },[])
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
   
      <View>
       {
         (loader)?<ActivityIndicator  size="large"  color="#0000ff" style={styles.loader}/>:
         <FlatList
         style={{
           marginTop:45
         }}
        data={imageData}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 2
            }}>
            {mediatype(item)==='image'?
          <Image
          style={styles.imageThumbnail}
          source={{uri: item}}
        />
        :  
        <Video
          style={styles.imageThumbnail}
          source={{uri: item}}
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
       }
       
        <View style={styles.header_container}>
            <IconA name="arrowleft" style={styles.arrow_icon} onPress={()=>navigation.navigate('home')}/>
            <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <IconA name="search1" style={{fontSize:25,color:'#cccccc'}}/>
                <TextInput placeholder="Search" style={{backgroundColor:'#fff',color:'#333',width:200}}/>
            </TouchableOpacity>
            <IconA name="scan1" style={styles.scan_icon}/>
        </View>
      </View>   
    )
}
const styles = StyleSheet.create({
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
  arrow_icon:{
      fontSize:25,
      margin:5,
      color:'#000',
      
  },
  scan_icon:{
    fontSize:25,
    margin:5,
    color:'#000'
  },
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 118,
      width:118,
      margin:1
     
     
    },
    loader:{
      marginTop:300,
    }
  });
export default GridPage;
