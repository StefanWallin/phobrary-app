import { Text, TouchableHighlight, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './PhoButton.styles';

export default class PhoButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      buttonPressed: false,
    };
  }

  static defaultProps = {
    type: 'primary',
    display: 'inline',
    loading: false,
    disabled: false,
    size: 'large',
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
        style={[
          styles.buttonTouchable,
          styles[`button_type_${this.props.type}_touchable`],
          this.props.style,
        ]}>
        <View style={[
            styles.button,
            styles[`button_${this.props.type}`],
            this.state.buttonPressed && styles[`button_type_${this.props.type}_pressed`],
            ((this.props.loading || this.props.disabled) && styles.loading),
          ]}>
          <Text style={[
            styles.text,
            styles[`text_${this.props.type}`],
            this.state.buttonPressed && styles[`text_type_${this.props.type}_pressed`],
          ]}>{this.props.label}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
