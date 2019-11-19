import React, { Component } from 'react';
import Header from './templates/Header';
import PasswordTextInput from './templates/PaswordInput';
import {AppRegistry, StyleSheet,TextInput, TouchableHighlight,Text,ScrollView,Image ,Linking,CheckBox, View, TouchableOpacity ,Alert} from 'react-native';
import ImagePicker from 'react-native-image-picker';

//Опции для пикера картинок
const options = {
  title: 'Выберите фото',
  cancelButtonTitle:'Отмена',
  takePhotoButtonTitle:'Сделать фотографию',
  chooseFromLibraryButtonTitle:'Выбрать из галереи',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


export default class Login extends React.Component {
  //убрал хедер
  static navigationOptions = {
    header: null,
  };
  //Стейты
  constructor(props) {
    super(props);
    this.state = {
    selected:'Вход',
    photo:null,
    passCorrect:true,
    emailCorrect:true,
    email:'',
    password:'',
    checked:false};
  }
  //Выбор фотографии профиля
  selectImage=async()=>{
  ImagePicker.showImagePicker(options, (response) => {
  if (response.didCancel) {
  } else if (response.error) {
  } else {
    this.setState({
      photo: response.uri,
    });
  }});}
  //Убрать фотографию профиля
  removeImage=()=>{this.setState({photo: null});}
  //Валидация
  validate = (e,p) => {
      let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(reg.test(e) === false)
        {
          this.setState({emailCorrect:false})
        }
      else 
        {
          this.setState({emailCorrect:true})
        }
      if(p.length < 5)
        {
          this.setState({passCorrect:false})
        }
      else 
        {
          this.setState({passCorrect:true})
        }
      this.tryNavigate();
  }
  //Переход на другую страницу
  tryNavigate=()=>{
    if(this.state.emailCorrect==true&&this.state.email.length>0&&this.state.passCorrect==true&&this.state.password.length>0)
    {
      if(this.state.selected=='Вход'){
      const { navigate } = this.props.navigation;
      navigate('MapScreen')
      //Do more stuff
      }
      else if(this.state.checked==true){
        const { navigate } = this.props.navigation;
        navigate('MapScreen')
        //Do more stuff
      }
    }
  }


  render() {
    return (
      <ScrollView>
        <Header/>
        <View style={{marginBottom:50}}>
        <View style={[styles.basicViewStyle]}>
            <View style={styles.viewSelectionStyle}>
              <View style={{flex:1}}>
                <TouchableOpacity  onPress={()=>{this.setState({ selected: 'Вход' })}}>
                <Text style={this.state.selected=='Вход' ? styles.selectedStyle : styles.selectedNotStyle}>Вход</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity  onPress={()=>{this.setState({ selected: 'Регистрация',photo:null })}}>
                <Text style={this.state.selected=='Регистрация' ? styles.selectedStyle : styles.selectedNotStyle}>Регистрация</Text>
              </TouchableOpacity>
            </View>

          { this.state.selected==='Регистрация' && 
            <View style={styles.viewPhoto}>
              <Text style={styles.inputHeader}>Фото</Text>
              <View style={{flex:1,flexDirection:'row',alignSelf: 'stretch',justifyContent:'center',}}>
              <TouchableOpacity style={styles.photoFrame} onPress={this.selectImage}>
              <Image style={this.state.photo!=null ? styles.photoSelected : styles.photoNotSelected} source={this.state.photo!=null ? {uri:this.state.photo} : require('./icons/Photo.png')}/></TouchableOpacity>
               { this.state.photo!=null && 
               <TouchableOpacity style={styles.cancelButton} onPress={this.removeImage}>
                  <Text>X</Text>
               </TouchableOpacity>
               }
              </View>
            </View> }

            <View style={{alignSelf: 'stretch'}}>
              <Text style={[styles.basicTextStyle,styles.inputHeader]}>Email</Text>
              <TextInput onChangeText={(value) => this.setState({email: value})} value={this.state.email} style={styles.textInput}/>
              <View style={this.state.emailCorrect==true ? styles.border : styles.borderErr}/>
              <Text style={this.state.emailCorrect==true ? styles.errorTextOff : styles.errorTextOn}>Ошибка, неверный email. Попробуйте снова.</Text>
           </View>

            <View style={{alignSelf: 'stretch'}}>
              <Text style={styles.inputHeader}>Password</Text>
              <PasswordTextInput
              value={this.state.password}
              onChangeText={password => this.setState({ password })}/>
              <View style={this.state.passCorrect==true ? styles.border : styles.borderErr}/>
              <Text style={this.state.passCorrect==true ? styles.errorTextOff : styles.errorTextOn}>Неверный пароль</Text>
            </View>

           {this.state.selected==='Вход' && 
            <View style={styles.basicViewStyle}>
              <Text style={styles.inputHeader}>Еще не зарегистрированы?</Text>
              <TouchableOpacity onPress={()=>{this.setState({ selected: 'Регистрация',photo:null })}}>
                <Text>Регистрация</Text>
              </TouchableOpacity>
            </View>
           }

           {this.state.selected==='Регистрация' && 
            <View style={[{alignItems:'center',justifyContent:'center',flexDirection: 'row'}]}>
            <CheckBox value={this.state.checked} onValueChange={() => this.setState({ checked: !this.state.checked })}/>
              <Text style={[styles.basicTextStyle,{textAlign:'center'}]}>
                Я согласен с 
                <Text style={[styles.basicTextStyle,{textAlign:'center',color:'#3066E0'}]}onPress={() => Linking.openURL('http://vk.com')}> Политикой Конфиденциальности</Text>
              </Text>
            </View>
           }

          <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {this.validate(this.state.email,this.state.password);}}>
                  <Text style={styles.buttonText}>{this.state.selected}</Text>
          </TouchableOpacity> 
      </View>
      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  basicTextStyle:{
    fontSize:13
  },
  basicViewStyle:{
    alignItems:'center',
    alignSelf: 'stretch',
    justifyContent:'center',
    paddingLeft:40,
    paddingRight:40
  },
  inputContainer: {
    paddingLeft:40,
    paddingRight:40
  },
  viewSelectionStyle: {
    height:130,
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectedStyle: {
    color:'#252D76',
    fontSize:26,
  },
  selectedNotStyle: {
    color:'#252D76',
    fontSize:16,
  },
  inputHeader:{
    color:'#252D76',
    opacity:0.5
  },
  textInput:{ 
    height: 22,
    padding:0,
    color:'#252D76', 
    borderColor: 'transparent',
    fontSize:14 },
  border:{
    borderBottomColor: '#252D76',
    borderBottomWidth: 1,
    opacity:0.2},
  borderErr:{
    borderBottomColor: '#E81D4E',
    borderBottomWidth: 1,
    opacity:0.5},
  errorTextOn:{
    color:'#E81D4E',
    fontSize:12,
    opacity:0.5},
  errorTextOff:{
    color:'#fff'},
  viewPhoto: {
    height:98,
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText:{
    color:'#FFFFFF',
    fontSize:13,
  },
   buttonStyle:{
    marginTop:50,
    width:156,
    justifyContent:'center',
    alignItems:'center',
    height:35,
    backgroundColor:'#3168DE',
    borderRadius:23,
  },
  photoNotSelected:{
    width: 23, height: 23,borderRadius:23/2
  },
  photoSelected:{
    width: 98, height: 98,borderRadius:98/2
  },
  photoFrame:{width: 98, height: 98,backgroundColor:"#E7E7E7",borderRadius:49,alignItems:'center',justifyContent:'center'},
  cancelButton:{width: 20, height: 20,backgroundColor:"#E7E7E7",borderRadius:10,alignItems:'center',justifyContent:'center'}
});

