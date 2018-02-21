import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
//import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const SIGNUP_USER_MUTATION = gql`
    mutation SignupUser($email: String!, $password: String!) {
        signupUser(email: $email, password: $password) {
            id
            token
        }
    }
`;
 class Signup extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    componentDidMount() {
       const navigation=this.props;
    }

    signup = async () => {
        const { email, password } = this.state;
        console.log(password);
        console.log(email);
        try {
            const result = await this.props.signupUserMutation({
                variables: {
                    email,
                    password,
                },
            });

            // Store the ID and token in local storage.
            localStorage.setItem('SHORTLY_ID', result.data.signupUser.id);
            localStorage.setItem('SHORTLY_TOKEN', result.data.signupUser.token);
            this.props.navigation('CreatUrl', navigation)
        } catch (err) {
            // TODO: Handle the error properly
        }
    };

    
    
   
  render() {
    const { email, password} = this.state;
    //sconsole.log(this.props)
    return <View style={styles.container}>
			<FormLabel>email</FormLabel>
			<FormInput onChangeText={email => this.setState({ email })} value={email} />
			<FormLabel>password</FormLabel>
			<FormInput onChangeText={password => this.setState({ password })} value={password} />
			<Button onPress={() => this.signup()} title="Submit" />
		</View>;
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default graphql(SIGNUP_USER_MUTATION, { name: 'signupUserMutation' })(
    Signup,
);