import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { useSpeechToTextMutation } from '../../services/dataApi';
import { getToken } from '../../services/asyncStorage';
import { encode, decode } from 'base-64';
import axios from 'axios';
 

 

const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default function App() {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = useState(null);
  const [maximumValueAudio, setMaximumValueAudio] = useState(0)
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechToTextApi] = useSpeechToTextMutation()

  const handlePositionSliderSlidingComplete = async (value) => {
    try {
      await sound.setPositionAsync(value);
      setPosition(value);
    } catch (err) {
      console.error('Failed to set position', err);
    }
  };

  useEffect(() => {
    Audio.requestPermissionsAsync();
  }, []);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration((prevDuration) => prevDuration + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
      setDuration(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setIsPlaying(status.isPlaying);
          setPosition(status.positionMillis);
        }
      });
    }
  }, [sound]);

  const startRecording = async () => {
    try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
            });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
      setMaximumValueAudio(0)
      setSound(null)
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      setIsRecording(false);
      const { sound: newSound } = await recording.createNewLoadedSoundAsync();
      setSound(newSound);
 
      
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const playSound = async () => {
    try {
      if (isPlaying) {
        sound.pauseAsync();
       
      } else {
        await sound.playAsync();
        const status = JSON.parse(sound._lastStatusUpdate);
        const durationMillis = status.durationMillis;
        setMaximumValueAudio(durationMillis)
      }
    } catch (err) {
      console.error('Failed to play sound', err);
    }
  };

  const uploadAudioFile = async () => {
  
      // const token = await getToken(); // get authentication token from async storage  
      const status = JSON.parse(sound._lastStatusUpdate);
      const uri = status.uri;
      
     
  // Create FormData object
  const formData = new FormData();
  formData.append('file', {
    uri,
    type: 'audio/3gp',
    name: "name",
  });

  // Send file to Django API using axios
  try {
    const response = await axios.post('http://10.0.2.2:8000/speechToText', formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    })

    console.log('Response from Django API:', response.data)
  } catch (error) {
    console.error(error)
  }
      
  };

  return (
    <View className="flex-1 justify-center items-center">
      {isRecording ? (
        <View className="items-center">
          <Text className="text-lg font-bold mb-2">{`Recording... ${formatTime(duration)}`}</Text>
          <TouchableOpacity
            className="py-2 px-4 bg-red-500 rounded-md"
            onPress={stopRecording}
          >
            <Text className="text-white font-semibold text-lg">Stop Recording</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity 
          className="py-2 px-4 bg-blue-500 rounded-md"
          onPress={startRecording}
        >
          <Text className="text-white font-semibold text-lg">Start Recording</Text>
        </TouchableOpacity>
      )}
      {sound && (
        <View className="mt-4 w-full items">
          <Text className="text-lg font-bold text-center mb-2">{`${formatTime(position)} / ${formatTime(maximumValueAudio)}`}</Text>

          <Slider
            minimumValue={0}
            maximumValue={maximumValueAudio}
            value={position}
            onSlidingComplete={handlePositionSliderSlidingComplete}
          />
          <View className = "items-center space-y-2">
          <TouchableOpacity 
             className="py-2 px-4 bg-green-500 rounded-md w-1/4 items-center"
            onPress={playSound}>
            <Text className="text-white font-semibold text-lg  ">{isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
              className="py-2 px-4 bg-yellow-500 rounded-md   items-center"
              onPress={uploadAudioFile}
            >
              <Text className="text-white font-semibold text-lg">Send Recording</Text>
            </TouchableOpacity>


          </View>
                    
        </View>
      )}
    </View>
  );
}



// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';

// const audioRecorderPlayer = new AudioRecorderPlayer();

// const Memorization = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioPath, setAudioPath] = useState('');

//   const startRecording = async () => {
//     try {
//       const path = await audioRecorderPlayer.startRecorder();
//       setIsRecording(true);
//       setAudioPath(path);
//       console.log(`Recording started: ${path}`);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       const path = await audioRecorderPlayer.stopRecorder();
//       setIsRecording(false);
//       setAudioPath(path);
//       console.log(`Recording stopped: ${path}`);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const sendAudio = async audioPath => {
//     try {
//       const formData = new FormData();
//       formData.append('audio', {
//         uri: audioPath,
//         type: 'audio/mp4',
//         name: 'audio.mp4',
//       });
//       const response = await fetch('http://10.0.2.2:8000/speechToText/', {
//         method: 'POST',
//         body: formData,
//       });
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleRecordButtonPress = () => {
//     if (isRecording) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   const handleSendButtonPress = () => {
//     sendAudio(audioPath);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={handleRecordButtonPress}>
//         <Text style={styles.buttonText}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleSendButtonPress}>
//         <Text style={styles.buttonText}>Send Audio</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   button: {
//     backgroundColor: '#2196F3',
//     borderRadius: 10,
//     padding: 10,
//     margin: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 20,
//   },
// });

// export default Memorization;
