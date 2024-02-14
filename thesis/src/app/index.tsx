import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { Color } from "@utils/TsColorConstant";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Link href={`/camera`} asChild>
        <Pressable style={{ ...styles.box, backgroundColor: Color.COLOR_04 }}>
          <Text style={styles.text}>Scan</Text>
          <Image
            style={styles.stretch}
            source={require("@assets/img/common/scan.png")}
          />
        </Pressable>
      </Link>
      <Link href={`/healthRecord`} asChild>
        <Pressable style={{ ...styles.box, backgroundColor: Color.COLOR_04 }}>
          <Text style={styles.text}>Health records</Text>
          <Image
            style={styles.stretch}
            source={require("@assets/img/common/stethoscope.png")}
          />
        </Pressable>
      </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  box: {
    height: 80,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#9b4521",
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 16,
    flexDirection: "row",
    paddingHorizontal: 32,
  },
  text: {
    color: Color.COLOR_01,
    fontSize: 20,
  },
  stretch: {
    width: 50,
    height: 50,
  },
});

export default App;
