import React, { Component } from 'react';
import Header from './templates/Header';
import {StyleSheet,Text,Image , View, TouchableOpacity,BackHandler} from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import CustomMarker from './icons/Photo.png'

export default class HelloWorldApp extends Component {
	state = {
		location: null,
		markerPos:null,
	};
	getCurrentPosotion=()=>{
		Geolocation.getCurrentPosition(position=>{
			console.log(JSON.stringify(position))
			let region={
				latitude: position.coords.latitude,
          		longitude: position.coords.longitude,
          		latitudeDelta: 0.009,
          		longitudeDelta: 0.009
			}
			this.setState({location:region})
			this.setState({markerPos:{latitude: region.latitude,longitude: region.longitude}})
		})
	}
	componentDidMount(){
		this.getCurrentPosotion();
	}
  render() {
    return (
	    <View style={{backgroundColor: "#3066E0",flex:1}}>
	      <View style={{justifyContent: "center", alignItems: "center",marginTop:60}}>
	      	<Header/>
	        <Text style={{color: "#fff",fontSize:29,marginTop:17}}>Будем знакомы :)</Text>
    		<Text style={{color: "#fff",fontSize:13,marginTop:23,marginBottom:20}}>Вы здесь</Text>
    		<View style={{justifyContent: "center", alignItems: "center",alignSelf:'stretch',height:400}}>
    		<MapView
    			ref={map=>this._map=map}
        		style={ styles.map }
        		initialRegion={this.state.location}>
		            <Marker
		            	coordinate={this.state.markerPos}
		            	title={"ЭТО Я"}>
		            	<View style={{justifyContent: "center", alignItems: "center"}}>
		            		<Text>Я сейчас тут</Text>
			            	<Image style={{borderRadius:20}} source={CustomMarker}/>
		            	</View>
		            </Marker>
        		</MapView>
	        </View>
	        <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {BackHandler.exitApp()}}>
                  <Text style={styles.buttonText}>Выйти</Text>
          </TouchableOpacity> 
	      </View>
	    </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonText:{
    color:'#3168DE',
    fontSize:13,
  },
  buttonStyle:{
  	marginTop:50,
    width:156,
    justifyContent:'center',
    alignItems:'center',
    height:35,
    backgroundColor:'#fff',
    borderRadius:23,
  },
});