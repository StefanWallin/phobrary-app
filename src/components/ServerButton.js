import { Text, TouchableHighlight, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './ServerButton.styles';

export default class ServerButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      buttonPressed: false,
    };
  }

  static defaultProps = {
    loading: false,
  };

  render() {
    return (
      <TouchableHighlight
        testID={this.props.testID}
        underlayColor='transparent'
        disabled={this.props.loading || this.props.disabled}
        onPress={() => {
          this.setState({ buttonPressed: false });
          this.props.onPress();
        }}
        onHideUnderlay={() => this.setState({ buttonPressed: false })}
        onShowUnderlay={() => this.setState({ buttonPressed: true })}
        style={[styles.buttonTouchable, this.props.style]}>
        <View style={[styles.button, this.state.buttonPressed && styles.button_pressed, ((this.props.loading || this.props.disabled) && styles.loading)]}>
          <Text style={[styles.text, this.state.buttonPressed && styles.text_pressed]}>{this.props.label}</Text>
          <Text style={[styles.sub_text, this.state.buttonPressed && styles.sub_text_pressed]}>{this.props.subText}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
