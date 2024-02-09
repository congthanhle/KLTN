import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import TsButton from '@common/TsButton';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const cameraRef = useRef<any>();

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.granted);
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert('Picture saved! 🎉');
        setImage(null);
        console.log('saved successfully');
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}
          >
            <Pressable>

            </Pressable>
            <TsButton
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
              color=''
            />
            <TsButton
              title=''
              onPress={() =>{
                setFlash(
                  flash === FlashMode.off
                    ? FlashMode.on
                    : FlashMode.off
                )
              }
              }
              icon="flash"
              color={flash === FlashMode.off ? 'gray' : '#fff'}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}
          >
            <TsButton
              title="Re-take"
              onPress={() => setImage(null)}
              icon="retweet"
              color=''
            />
            <TsButton title="Save" onPress={savePicture} icon="check" color=''/>
          </View>
        ) : (
          <TsButton title="Take a picture" onPress={takePicture} icon="camera" color=''/>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    flex: 5,
  },
  topControls: {
    flex: 1,
  },
});
