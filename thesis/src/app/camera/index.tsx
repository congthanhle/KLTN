import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import TsButton from "@common/TsButton";
import TsLink from "@/components/common/TsButton/TsLink";
import { Header } from "react-native-elements";
import { Color } from "@utils/TsColorConstant";

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
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
        alert("Picture saved! 🎉");
        setImage(null);
        console.log("saved successfully");
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
      <Header
        leftComponent={<TsLink title="" color="" icon="home" path="/" />}
        centerComponent={{ text: "SCAN", style: { color: "#fff" } }}
        rightComponent={<TsButton
          title=""
          onPress={() => {
            setFlash(flash === FlashMode.off ? FlashMode.on : FlashMode.off);
          }}
          icon="flash"
          color={flash === FlashMode.off ? "gray" : "#fff"}
        />}
        backgroundColor={Color.COLOR_01}
        containerStyle = {{paddingHorizontal: 30}}
      />
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
          zoom={0.1}
        >
          <View style={styles.overlay}>
            <View style={styles.crosshair}>
              <Text style={styles.crosshairText}>+</Text>
            </View>
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      {!image ? (
        <View style={styles.controls}>
          <View style={styles.buttonWrapper}>
            <TsButton
              title=""
              onPress={takePicture}
              icon="camera"
              color={Color.COLOR_07}
            />
          </View>
        </View>
      ) : (
        <View style={styles.controls}>
          <TsButton
            title="Re-take"
            onPress={() => setImage(null)}
            icon="retweet"
            color=""
          />
          <TsButton title="Save" onPress={savePicture} icon="check" color="" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  controls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    paddingHorizontal: 50,
    backgroundColor: Color.COLOR_01,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#E9730F",
    marginLeft: 10,
  },
  camera: {
    flex: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  crosshair: {
    width: 148,
    height: 148,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 74,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  crosshairText: {
    color: "white",
    fontSize: 24,
  },
  buttonWrapper: {
    width: 80,
    height: 80,
    borderRadius: 30,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Color.COLOR_07,
  },
});
