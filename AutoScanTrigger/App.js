/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  NativeEventEmitter,
  Button
} from 'react-native';

import {
  Header,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  BarcodeManager,
  AutoScanTrigger
} from '@datalogic/react-native-datalogic-module';

const isAvailable = async () => {
  try {
    var isAvailableReturn = await AutoScanTrigger.isAvailable();
    console.log(isAvailableReturn);
    Alert.alert(JSON.stringify(isAvailableReturn));
  } catch (e) {
    console.error(e);
  }
};

const getSupportedRanges = async () => {
  try {
    var supportedRangesReturn = await AutoScanTrigger.getSupportedRanges();
    console.log(supportedRangesReturn);
    Alert.alert(JSON.stringify(supportedRangesReturn));
  } catch (e) {
    console.error(e);
  }
};

const getCurrentRange = async () => {
  try {
    var currentRangeReturn = await AutoScanTrigger.getCurrentRange();
    console.log(currentRangeReturn);
    Alert.alert(JSON.stringify(currentRangeReturn));
  } catch (e) {
    console.error(e);
  }
};

const setCurrentRange = async () => {
  try {
    var setRangeReturn = await AutoScanTrigger.setCurrentRange(0);
    console.log(setRangeReturn);
    Alert.alert(JSON.stringify(setRangeReturn));
  } catch (e) {
    console.error(e);
  }
};

class App extends React.Component {
  async componentDidMount() {
    try {
      const eventEmitter = new NativeEventEmitter(BarcodeManager);
      eventEmitter.addListener('successCallback', (map) => {
        Alert.alert('Barcode Result', map.barcodeData + '\n' + map.barcodeType);
      });
      await BarcodeManager.addReadListener();
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>AutoScanTrigger:</Text>
                <Text style={styles.sectionDescription}>
                  This app demonstrates how to use the <Text style={styles.highlight}>AutoScanTrigger
                  </Text> methods on Datalogic devices. WARNING: Not all Datalogic devices have this functionality.
                </Text>
                <Text style={styles.sectionTitle}>Is Available</Text>
                <Text style={styles.sectionDescription}>
                  This function returns true if the AutoScanTrigger is available on the current device. 
                </Text>
                  <View style={styles.app}>
                    <Button
                      onPress={isAvailable}
                      title="Available?"
                      color="#841584"
                      accessibilityLabel="Is Available"
                    />
                </View>
                <Text style={styles.sectionTitle}>Get Supported Ranges</Text>
                <Text style={styles.sectionDescription}>
                  This function returns the supported ranges for the device. 
                </Text>
                  <View style={styles.buttonStyle}>
                    <Button
                      onPress={getSupportedRanges}
                      title="Get Ranges"
                      color="#841584"
                      accessibilityLabel="Get Supported Ranges"
                    />
              </View>
              <Text style={styles.sectionTitle}>Get Current Range</Text>
                <Text style={styles.sectionDescription}>
                  This function returns the current range of the device. 
                </Text>
                  <View style={styles.buttonStyle}>
                    <Button
                      onPress={getCurrentRange}
                      title="Get Range"
                      color="#841584"
                      accessibilityLabel="Get Current Range"
                    />
              </View>
              <Text style={styles.sectionTitle}>Set Current Range</Text>
                <Text style={styles.sectionDescription}>
                  This function sets the current range for the device.  
                </Text>
                  <View style={styles.buttonStyle}>
                    <Button
                      onPress={setCurrentRange}
                      title="Set Range"
                      color="#841584"
                      accessibilityLabel="Set Current Range"
                    />
              </View>
          </View>
        </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
