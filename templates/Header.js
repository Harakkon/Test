import React from 'react';

import {StatusBar,View,Text,Style,StyleSheet} from 'react-native';

const Header =() => {
  return (
     <View style={styles.headerStyle}>
      <StatusBar backgroundColor = "#3066E0"/>
      <View style={styles.flexRow}>
         <Text style={styles.headerLText}>L<Text style={styles.headerFText}>F</Text></Text>
         <Text style={styles.headerPText}>потерял{"\n"}<Text style={styles.headerNText}>нашел</Text></Text>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
  headerLText:{
    color:'#F7D352',
    fontSize:49,
  },
  headerFText:{
    color:'#fff',
    fontSize:49,
  },
  headerPText:{
    color:'#F7D352',
    fontSize:16,
  },
  headerNText:{
    color:'#fff',
    fontSize:16,
  },
  headerStyle:{
    backgroundColor:'#3066E0',
    alignSelf: 'stretch',
    height: 80,
  },
  flexRow: {
    flexDirection: "row",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Header