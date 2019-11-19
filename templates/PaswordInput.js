
import React,{ Component } from 'react';
import {
  View,
  Button,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export class PasswordTextInput extends Component {
  state = {
    hidden: true,
  };

  onInputLabelPressed = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  render = () => (
    <View style={styles.viewStyle}>
      <TextInput
        style={styles.inputStyle}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={this.state.hidden}
        {...this.props}
      />
      <TouchableOpacity onPress={this.onInputLabelPressed}>
        <Image
          style={{width: 20, height: 15}}
          source={require('./Browse.png')}/>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    height:22,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputStyle: {
    color: "#252D76",
    margin:0,
    padding:0,
    fontSize: 14,
    flex: 2
  },
});
export default PasswordTextInput;