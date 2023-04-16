import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import tw from 'tailwind-react-native-classnames';

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
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const filename = uri.split('/').pop();
      const filetype = 'audio/m4a';
      const data = new FormData();
      data.append('audio', {
        uri,
        name: filename,
        type: filetype,
      });
      setIsUploading(true);
      const response = await fetch('https://example.com/api/upload-audio', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      });
      setIsUploading(false);
      if (!response.ok) {
        throw new Error('Failed to upload audio');
      }
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
      }
    } catch (err) {
      console.error('Failed to play sound', err);
    }
  };

  return (
    <View style={tw('flex-1 justify-center items-center')}>
      {isRecording ? (
        <View style={tw('items-center')}>
          <Text style={tw('text-lg font-bold mb-2')}>{`Recording... ${formatTime(duration)}`}</Text>
          <TouchableOpacity
            style={tw('py-2 px-4 bg-red-500 rounded-md')}
            onPress={stopRecording}
            disabled={isUploading}
          >
            <Text style={tw('text-white font-semibold text-lg')}>Stop Recording</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity 
          style={tw('py-2 px-4 bg-blue-500 rounded-md')}
          onPress={startRecording}
          disabled={isUploading}
        >
          <Text style={tw('text-white font-semibold text-lg')}>Start Recording</Text>
        </TouchableOpacity>
      )}
      {sound && (
        <View style={tw('mt-4 w-full')}>
          <Text style={tw('text-lg font-bold text-center mb-2')}>{`Playing... ${formatTime(position)} / ${formatTime(sound.durationMillis)}`}</Text>
          <TouchableOpacity 
            style={tw('py-2 px-4 bg-green-500 rounded-md')}
            onPress={playSound}
            disabled={isUploading}
          >
            <Text style={tw('text-white font-semibold text-lg')}>{isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>
          <Slider
            minimumValue={0}
            maximumValue={sound.durationMillis}
            value={position}
            onSlidingComplete={handlePositionSliderSlidingComplete}
            disabled={isUploading}
          />
          {isUploading && <Text style={tw('text-lg font-bold text-center mt-4')}>Uploading...</Text>}
          <TouchableOpacity
            style={tw('py-2 px-4 bg-blue-500 rounded-md mt-4')}
            onPress={stopRecording}
            disabled={isUploading}>
            <Text style={tw('text-white font-semibold text-lg')}>Send to API</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
