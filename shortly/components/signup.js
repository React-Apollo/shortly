import React from 'react';
import { StyleSheet, Text, View,AsyncStorage} from 'react-native';
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

    
    

    signup = async (navigate) => {
        const { email, password } = this.state;
        //console.log(password);
        //console.log(email);
       console.log(this.props); 
        try {
            const result = await this.props.signupUserMutation({
                variables: {
                    email,
                    password,
                },
            });

            // Store the ID and token in local storage.
            AsyncStorage.setItem('SHORTLY_ID', result.data.signupUser.id);
            AsyncStorage.setItem('SHORTLY_TOKEN', result.data.signupUser.token);
            //const token=AsyncStorage.getItem('SHORTLY_TOKEN');
            //console.log(token)
            this.props.navigation.navigate('CreateUrl')
        } catch (err) {
            // TODO: Handle the error properly
        }
    };

    
    
   
  render() {
    const { email, password} = this.state;

    return <View style={styles.container}>
			<View style={{ justifyContent: 'center', alignItems: 'center', height: 250, width: 300, borderWidth: 1, borderColor: '#ffcfc0', borderRadius: 6 }}>
				<FormLabel>email</FormLabel>
				<FormInput containerStyle={{height:50,width:240}} onChangeText={email => this.setState({ email })} value={email} />
				<FormLabel>password</FormLabel>
				<FormInput containerStyle={{height:50,width:240}} onChangeText={password => this.setState({ password })} value={password} />
				<Button buttonStyle={{ backgroundColor: 'rgba(92, 99,216, 1)', width: 240, height: 45, borderColor: 'transparent', borderWidth: 0, borderRadius: 5, marginTop: 20 }} onPress={() => this.signup()} title="Submit" />
			</View>
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