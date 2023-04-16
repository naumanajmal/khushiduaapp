
import {
    View,
    SafeAreaView,
    Text,
    Image,
    FlatList,
    Dimensions,
    Animated,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
  } from "react-native";
  import React from "react";
  import AntDesign from "@expo/vector-icons/AntDesign";
  import { Audio } from "expo-av";
  import {Slider} from '@miblanchard/react-native-slider';
  import { connect } from "react-redux";
 import { store } from "../../../features/redux/store";
 import Modal from "react-native-modal";
import { getToken } from "../../../services/asyncStorage";
import Lottie from 'lottie-react-native';
  const PLAYLIST1 = [ "https://duaapp-bucket.s3.amazonaws.com/musics/Starting_Wudu-2.mp3", "https://duaapp-bucket.s3.amazonaws.com/musics/After_Wudu-1.mp3",
  "https://duaapp-bucket.s3.amazonaws.com/musics/Starting_Wudu-2.mp3", "https://duaapp-bucket.s3.amazonaws.com/musics/After_Wudu-1.mp3"]
import { useDispatch } from "react-redux";
import { setCoinsModalTrue } from "../../../features/redux/userSlice";

  
  const LOADING_STRING = "Loading...";
  const BUFFERING_STRING = "Buffering...";
  const RATE_SCALE = 3.0;
   
  
   class AudioPlayer extends React.Component {
    
    
    constructor(props) {
    
      super(props);
      this.showModal=false;
      this.index = 0;
      this.isSeeking = false;
      this.shouldPlayAtEndOfSeek = false;
      this.playbackInstance = null;
      this.state = { 
        // store.getState().audioData.data,
        PLAYLIST1: [],
        playbackInstanceName: LOADING_STRING,
        playbackInstancePosition: null,
        playbackInstanceDuration: null,
        shouldPlay: true,
        isPlaying: false,
        isBuffering: false,
        isLoading: true,
        fontLoaded: false,
        volume: 1.0,
        rate: 1.0,
        portrait: null,
        showValumeBox: false,
        duration: "00:00:00",
        timeElapsed: "00:00:00",
      };
    }
      async submitListened(){
      try{
        const tok = await getToken();
        //http://10.0.2.2:8000/
        //https://khushiikids.herokuapp.com/
        const response = await fetch('https://khushiikids.herokuapp.com/sentenceListened/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization':`Bearer ${tok.access}`
          },
          body: JSON.stringify({sentence: this.state.PLAYLIST1[0] ,todayDate:new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0]})
        });
        const data = await response.json();
        if (data.saved=="True"){
          this.showModal=true
          setTimeout(() => {
            this.showModal=false
                    }, 2000);
        }
        console.log(data)
      } catch (error){
        this.setState({ error, loading: false });
      }
     }
  
    componentWillUnmount(){
      if (this.state.isPlaying) {
        this.playbackInstance.stopAsync();
      }
    }
    componentDidMount() {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();}
      this.props.prop.map(obj=>{
        this.state.PLAYLIST1.push(obj)
      })
      
   
      // this.setState({PLAYLIST1:store.getState().audioData})
   
      Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      });
      // (async () => {
      //   await Font.loadAsync({});
      //   this.setState({ fontLoaded: true });
      // })();
  
      this._loadNewPlaybackInstance(false);
    }
  
     
  
    async _loadNewPlaybackInstance(playing) {
      if (this.playbackInstance != null) {
        await this.playbackInstance.unloadAsync();
        this.playbackInstance.setOnPlaybackStatusUpdate(null);
        this.playbackInstance = null;
      }
  
      const source = { uri: this.state.PLAYLIST1[this.index]};
      const initialStatus = {
        shouldPlay: playing,
        rate: this.state.rate,
        volume: this.state.volume,
      };
  
      const { sound, status } = await Audio.Sound.createAsync(
        source,
        initialStatus,
        this._onPlaybackStatusUpdate
      );
      this.playbackInstance = sound;
      if (this.props.shouldPlayOnMount==true){
        this.playbackInstance.playAsync();
      }
      
      this._updateScreenForLoading(false);
    }
  
    _updateScreenForLoading(isLoading) {
      if (isLoading) {
        this.setState({
          isPlaying: false,
          playbackInstanceName: LOADING_STRING,
          playbackInstanceDuration: null,
          playbackInstancePosition: null,
          isLoading: true,
        });
      } else {
        this.setState({
          playbackInstanceName: this.state.PLAYLIST1[this.index].name,
          portrait: this.state.PLAYLIST1[this.index].image,
          isLoading: false,
        });
      }
    }
  
    _onPlaybackStatusUpdate = (status) => {
      if (status.isLoaded) {
        this.setState({
          playbackInstancePosition: status.positionMillis,
          playbackInstanceDuration: status.durationMillis,
          shouldPlay: status.shouldPlay,
          isPlaying: status.isPlaying,
          isBuffering: status.isBuffering,
          rate: status.rate,
          volume: status.volume,
        });
        if (status.didJustFinish) {
          this.props.audioState();
          this.submitListened()
          
          this._advanceIndex(true);
          this._updatePlaybackInstanceForIndex(true);
        }
      } else {
        if (status.error) {
          console.log(`FATAL PLAYER ERROR: ${status.error}`);
        }
      }
    };
  
    _advanceIndex(forward) {
      this.index =
        (this.index + (forward ? 1 : this.state.PLAYLIST1.length - 1)) % this.state.PLAYLIST1.length;
    }
  
    async _updatePlaybackInstanceForIndex(playing) {
      this._updateScreenForLoading(true);
     this._loadNewPlaybackInstance(playing)
    }
  
    _onPlayPausePressed = () => {
      if (this.playbackInstance != null) {
        if (this.state.isPlaying) {
          this.playbackInstance.pauseAsync();
        } else {
          this.playbackInstance.playAsync();
        }
      }
    };
  
    _onStopPressed = () => {
      if (this.playbackInstance != null) {
        this.playbackInstance.stopAsync();
      }
    };
  
    _onForwardPressed = () => {
      if (this.playbackInstance != null) {
        this._advanceIndex(true);
        this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
      }
    };
  
    _onBackPressed = () => {
      if (this.playbackInstance != null) {
        this._advanceIndex(false);
        this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
      }
    };
    handleVolumeBox = () => {
      this.setState({ showValumeBox: !this.state.showValumeBox });
    };
  
    _onVolumeSliderValueChange = (value) => {
      if (this.playbackInstance != null) {
        this.playbackInstance.setVolumeAsync(value);
      }
    };
  
    _trySetRate = async (rate) => {
      if (this.playbackInstance != null) {
        try {
          await this.playbackInstance.setRateAsync(rate);
        } catch (error) {
          // Rate changing could not be performed, possibly because the client's Android API is too old.
        }
      }
    };
  
    _onRateSliderSlidingComplete = async (value) => {
      this._trySetRate(value * RATE_SCALE);
    };
  
    _onSeekSliderValueChange = () => {
      if (this.playbackInstance != null && !this.isSeeking) {
        this.isSeeking = true;
        this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
        this.playbackInstance.pauseAsync();
      }
    };
  
    _onSeekSliderSlidingComplete = async (value) => {
      if (this.playbackInstance != null) {
        this.isSeeking = false;
        const seekPosition = value * this.state.playbackInstanceDuration;
        if (this.shouldPlayAtEndOfSeek) {
          this.playbackInstance.playFromPositionAsync(seekPosition);
        } else {
          this.playbackInstance.setPositionAsync(seekPosition);
        }
      }
    };
  
    _getSeekSliderPosition() {
      if (
        this.playbackInstance != null &&
        this.state.playbackInstancePosition != null &&
        this.state.playbackInstanceDuration != null
      ) {
        return (
          this.state.playbackInstancePosition /
          this.state.playbackInstanceDuration
        );
      }
      return 0;
    }
  
    _getMMSSFromMillis(millis) {
      const totalSeconds = millis / 1000;
      const seconds = Math.floor(totalSeconds % 60);
      const minutes = Math.floor(totalSeconds / 60);
  
      const padWithZero = (number) => {
        const string = number.toString();
        if (number < 10) {
          return "0" + string;
        }
        return string;
      };
      return padWithZero(minutes) + ":" + padWithZero(seconds);
    }
  
    _getTimestamp() {
      if (
        this.playbackInstance != null &&
        this.state.playbackInstancePosition != null &&
        this.state.playbackInstanceDuration != null
      ) {
        return `${this._getMMSSFromMillis(
          this.state.playbackInstancePosition
        )}                                                                   ${this._getMMSSFromMillis(
          this.state.playbackInstanceDuration
        )}`;
      }
      return "";
    }
  
    _getSeekSliderPosition() {
      if (
        this.playbackInstance != null &&
        this.state.playbackInstancePosition != null &&
        this.state.playbackInstanceDuration != null
      ) {
        return (
          this.state.playbackInstancePosition /
          this.state.playbackInstanceDuration
        );
      }
      return 0;
    }
  
    _getMMSSFromMillis(millis) {
      const totalSeconds = millis / 1000;
      const seconds = Math.floor(totalSeconds % 60);
      const minutes = Math.floor(totalSeconds / 60);
  
      const padWithZero = (number) => {
        const string = number.toString();
        if (number < 10) {
          return "0" + string;
        }
        return string;
      };
      return padWithZero(minutes) + ":" + padWithZero(seconds);
    }
  
    // _getTimestamp() {
    //   if (
    //     this.playbackInstance != null &&
    //     this.state.playbackInstancePosition != null &&
    //     this.state.playbackInstanceDuration != null
    //   ) {
    //     return `${this._getMMSSFromMillis(
    //       this.state.playbackInstancePosition
    //     )}
    //       ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    //   }
    //   //   return "";
    // }
  
    _getTimeStart() {
      if (
        this.playbackInstance != null &&
        this.state.playbackInstancePosition != null &&
        this.state.playbackInstanceDuration != null
      ) {
        return `${this._getMMSSFromMillis(this.state.playbackInstancePosition)}`;
      }
      return "";
    }
    _getTimeEnd() {
      if (
        this.playbackInstance != null &&
        this.state.playbackInstancePosition != null &&
        this.state.playbackInstanceDuration != null
      ) {
        return `${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
      }
      return "";
    }
  
    render() {
      return (
          <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)'
            }}
            className = "  h-32  mx-4  px-4 rounded-lg  justify-center space-y-1 bg-opacity-20 backdrop-blur-lg drop-shadow-lg"
          >
            
            <Modal
  isVisible={this.showModal}
  onBackdropPress={() => {this.showModal=false; console.log(this.showModal)}}
>
  <View className = "h-2/4 rounded-xl space-y-6 flex-col-reverse bg-white " >
  <Lottie source={require('../../../assets/animations/celebration-flag.json')} autoPlay  />
  <Lottie source={require('../../../assets/animations/CoinsJar.json')} autoPlay  />
  <View className = ""></View>
  <Text className = "text-center font-bold text-lg">You earned 100 coins</Text>
   
  </View>
</Modal>
  
               <View   className = "" >
                  <Slider
                      animateTransitions
                      minimumValue={0}
                      maximumValue={1}
                      minimumTrackTintColor="#193687"
                      thumbStyle={styles.thumb}
                      trackStyle={styles.track}
                      value={this._getSeekSliderPosition()}
                      onValueChange={this._onSeekSliderValueChange}
                      onSlidingComplete={this._onSeekSliderSlidingComplete}
                      disabled={this.state.isLoading}
                  />
                   <View   className = " flex-row h-4 w-full items-center justify-between">
               
                <Text  className = "text-darkBlue">
                  {this._getTimeStart()}
                </Text>
                <Text className = "text-darkBlue" >
                  {this._getTimeEnd()}
                </Text>
            
            </View>

                  </View>

  
           
            <View
            className = "flex-row justify-center h-10 w-full space-x-12  items-center "
               
            >
                <TouchableOpacity  >
                    <AntDesign name="stepbackward" size={28} color = '#193687' onPress={this._onBackPressed}/>
           
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this._onPlayPausePressed}
                >
                    {this.state.isPlaying ? (
                      <AntDesign name="pausecircleo" size={38} color = '#193687'/>
                    ) : (
                      <AntDesign name="playcircleo" size={38} color = '#193687' />
                    )}
                    {/* <AntDesign name="playcircleo" size={40} /> */}
                </TouchableOpacity>
   
                <TouchableOpacity style={{ marginHorizontal: 3 }} onPress={this._onForwardPressed} >
                    <AntDesign name="stepforward" size={28} color = '#193687' />
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={this.handleVolumeBox}
                  style={{ marginHorizontal: wp("3%") }}
                >
                  <View style={{ padding: 5 }}>
                    <Fontisto name="headphone" size={25} />
                  </View>
                </TouchableOpacity> */}
            
            </View>
            {/* End Aracbic */}
  
            {/* ................. */}
          </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    detailsContainer: {
    //   height: '1',
      alignSelf: "center",
      // flexDirection: "row",
      // marginTop: 40,
      // backgroundColor: "yellow",
      // alignItems: "center",
      // bottom: 5,
    //   width:  "70%" ,
    },
    text: {
      fontSize: 15,
      minHeight: 15,
      alignSelf: "center",
    },
    title: {
      fontSize: 28,
      textAlign: "center",
      fontWeight: "600",
      textTransform: "capitalize",
      color: "#ffffff",
    },
    artist: {
      fontSize: 18,
      textAlign: "center",
      color: "#ffffff",
      textTransform: "capitalize",
    },
 
    albumCover: {
      width: 250,
      height: 2,
    },
    trackInfo: {
      padding: 40,
      backgroundColor: "#fff",
    },
    trackInfoText: {
      textAlign: "center",
      flexWrap: "wrap",
      color: "#550088",
    },
    largeText: {
      fontSize: 22,
    },
    smallText: {
      fontSize: 16,
    },
    control: {
      margin: 20,
    },
    controls: {
      flexDirection: "row",
    },
    thumb: {
      backgroundColor: '#193687',
      borderRadius: 30 / 2,
      height: 8,
      shadowColor: 'black',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.35,
      shadowRadius: 2,
      width: 8,
  },
  track: {
      backgroundColor:'#D9D9D9',
      height:2,
  },
  });
  
  function mapStateToProps(){
    const dispatch = useDispatch();
    return{
      audioState:()=>dispatch(setCoinsModalTrue(true))
  
    }
  }

 
  export default connect(mapStateToProps) (AudioPlayer);