
import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import IntroPage from './pages/IntroPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GridPage from './pages/GridPage';
import HomePage from './pages/HomePage';
import CommentsPage from './pages/CommentsPage';
import MyProfile from './pages/MyProfile';
import Profile from './pages/Profile';
import NewPost from './pages/NewPost';
import Request from './pages/Request';
import NewStory from './pages/NewStory';
import Follow from './pages/Follow';
import PushNotification from "react-native-push-notification";
//import { Provider } from "react-redux";
//import {createStore} from 'redux';
//import reducer from './redux/reducer';
//const store =createStore(reducer);

const Stack = createStackNavigator();
const config={
  screens:{
    signin:'signin',
    signup:'signup',
    home:'home',
    Grid:'grid',
    profile:'profile'
  }
}
const linking = {
  prefixes: ['insta://app'],
  config,
};
const App = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      alert(notification.message)
    },
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
    },
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
  useEffect(() => {
    checkPermission()
    
  }, [])
  
  async function checkPermission()
  {
    console.log("Checking permission")
    const enabled=await messaging().hasPermission()
    console.log("Check permission",enabled)
    if(enabled)
    {
      getToken();
    }
    else
    {
      requestPermission();
    }
  }
  async function getToken(){
    console.log("Getting Token")
    await messaging().getToken().then(fcmtoken=>{
      console.log("fcm token",fcmtoken)
    });
  }
  async function requestPermission(){
    console.log("Requesting permission")
    try{
      await messaging().requestPermission()
      getToken()
    }
    catch(error)
    {
      console.log(error)
    }

  }
  return (
  
  <NavigationContainer linking={linking}>
    
    <Stack.Navigator initialRouteName="intro">
      <Stack.Screen name="signin" component={SignIn}  options={{ headerShown: false }}  />
      <Stack.Screen name="intro" component={IntroPage} options={{ headerShown: false }}/>
      <Stack.Screen name="signup" component={SignUp} options={{ headerShown: false }}/>
      <Stack.Screen name="home" component={HomePage} options={{ headerShown: false }}/>
      <Stack.Screen name="Grid" component={GridPage} options={{ headerShown: false }} />
      <Stack.Screen name="profile" component={MyProfile} options={{ headerShown: false }} />
      <Stack.Screen name="other-profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Comments" component={CommentsPage}/>
      <Stack.Screen name="New-Post" component={NewPost}/>
      <Stack.Screen name="New Request" component={Request}/>
      <Stack.Screen name="New-Story" component={NewStory}/>
      <Stack.Screen name="Follow" component={Follow}/>
      </Stack.Navigator>
  </NavigationContainer>

  );
};

export default App;
