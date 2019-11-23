import colors from '~config/colors';
import { createSession } from '~actions/sessionActions';
import { connect } from 'react-redux';

import React, { Fragment, PureComponent } from 'react';

import {
  ScrollView,
  TextInput,
  Text,
} from 'react-native';

class CreateSessionScreen extends PureComponent {

  constructor (props) {
    super(props);
  }

  onSubmit = (event) => {
    const one_time_code = event.nativeEvent.text
    this.props.dispatch(createSession(one_time_code))
  }

  render() {
    const { sessionTokenExists, sessionError, sessionLoaded, sessionLoading } = this.props;
    return (
      <ScrollView testID="createSessionScreen">
        {!sessionTokenExists && (
          <Fragment>
            {sessionError && (
              <Fragment>
                <Text style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginBottom: 10,
                  fontWeight: 'bold',
                  color: colors.white,
                }}>
                  Authorization errored with this error:
                </Text>
                <Text style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginBottom: 20,
                  color: colors.white,
                  fontFamily: 'Courier',
                }}>
                  {JSON.stringify(sessionError)}
                </Text>
              </Fragment>
            )}
            <Text style={{
              marginLeft: 20,
              marginRight: 20,
              color: colors.white,
            }}>
              Run the create-auth-script on your server enter the code below:
            </Text>
            <TextInput
              style={{
                height: 40,
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20,
                color: colors.white,
                fontSize: 18,
                textAlign: 'center',
              }}
              placeholder="Enter your auth code here"
              spellCheck={false}
              autoCorrect={false}
              returnKey='send'
              enablesReturnKeyAutomatically={true}
              returnKeyType='send'
              onSubmitEditing={this.onSubmit}
              multiline={false}
              textContentType='none'
            />
          </Fragment>
        )}
      </ScrollView>
    );
  }
}
export default connect(state => {
  return {
    sessionError: state.session.error,
    sessionLoaded: state.session.isLoaded,
    sessionLoading: state.session.isLoading,
    sessionTokenExists: (state.session.accessToken !== undefined),
  };
})(CreateSessionScreen);
