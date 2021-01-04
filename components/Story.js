import React,{useEffect} from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
// import Image from 'react-native-scalable-image';
import PropTypes from 'prop-types';

const ScreenWidth = Dimensions.get('window').width;

const Story = (props) => {
  const { story } = props;
  useEffect(() => {
      console.log(story)
  }, [])
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
    <View style={styles.container}>
      {/* {!props.isLoaded && (
      <View style={styles.loading}>
        <ActivityIndicator color="white" />
      </View>
      )} */}
      {mediatype(story) === 'image' ? (
        <Image
          source={{ uri: story }}
          onLoadEnd={props.onImageLoaded}
          style={styles.content}
          resizeMode="stretch"
          // width={ScreenWidth}
        />
      )
        : (
          <Video
            source={{ uri:story }}
            paused={props.pause || props.isNewStory}
            onLoad={item => props.onVideoLoaded(item)}
            style={styles.content}
          />
        )}
    </View>
  );
};

Story.propTypes = {
  story: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { width: '100%',
    height: '100%',
    flex: 1,
  },
  imageContent: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  loading: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default Story;