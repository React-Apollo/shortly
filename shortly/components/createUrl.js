import React from 'react'
import { StyleSheet, Text, View, AsyncStorage, ScrollView} from 'react-native'
import styled from 'styled-components/native'
import { FormLabel, FormInput, Button } from 'react-native-elements';
import {map} from 'ramda';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
const LINKS = [
  {
    id: '1',
    hash: 'ABC',
    url: 'http://google.com',
    description: 'Google shortlink'
  },
  {
    id: '2',
    hash: 'DEF',
    url: 'http://graph.cool',
    description: 'Graphcool shortlink'
  },
  {
    id: '3',
    hash: 'GHI',
    url: 'http://reactjs.org',
    description: 'ReactJS shortlink'
  }
]
const Container = styled.View`
     flex:1;
     align-items:center;
     justify-content:center;
`
const HeaderImage = styled.Image`
      height:25;
      resize-mode:contain;
`

const HeaderText = styled.Text`
      color:white;
      fontSize:18
 `
// const borderRadius=10;
const InputContainer = styled.View`
     
     width: 340;
     height:200;
     margin-top:20;
     background-color:#ffcfc0;
     align-items: center;
     border-width:1;
     border-color:#af7dff
`
const Item = styled.View`
   
   height:80;
   width:250;
   borderBottomWidth:1;
   border-color: #dedede;
   align-items:center;
   padding-horizontal:5;
   justify-content:space-between;
`
const Items = (item) => {
  return (<Item key={item.id}>
      
         <Text>{item.description}</Text>
         
         <Text>{item.hash}</Text>
        
     
    </Item>
    )
}  

const ALL_LINKS_QUERY = gql`
    query AllLinksQuery {
        allLinks {
            id
            url
            description
            hash
        }
    }
`;

const CREATE_SHORT_LINK_MUTATION = gql`
    mutation CreateLinkMutation($url: String!, $description: String!, $hash: String!) {
        createLink(url: $url, description: $description, hash: $hash) {
            id
        }
    }
`;


class CreateUrl extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            url: '',
            description: '',
        };
    }
  componentDidMount () {
    //AsyncStorage.getItem('SHORTLY_TOKEN').then(value => console.log(value))
    this.props.allLinksQuery.startPolling(1000);
  }
   
  render () {
    console.log(this.props)
    if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
            return <View style={{ flex:1,alignItems:'center',justifyContent:'center'}}><Text>Loading...</Text></View>;
        }

    const allLinks = this.props.allLinksQuery.allLinks;
        if (allLinks.length === 0) {
          return <View style={{alignItems:'center',justifyContent:'center'}}><Text>No Links</Text></View>;
        }
    return (

      <Container>
          <InputContainer>
          <View style={{ justifyContent: 'center', alignItems: 'center', height: 160, width: 300, borderWidth: 1, borderColor: '#ffcfc0', borderRadius: 6 }}>
				<FormLabel containerStyle={{height:20,width:240}}>description</FormLabel>
				<FormInput containerStyle={{height:40,width:240}} onChangeText={description => this.setState({ description })}  />
				<FormLabel containerStyle={{height:20,width:240}}>url</FormLabel>
				<FormInput containerStyle={{height:40,width:240}} onChangeText={url=> this.setState({url})} />
				<Button buttonStyle={{ backgroundColor: 'rgba(92, 99,216, 1)', width: 240, height: 30, borderColor: 'transparent', borderWidth: 0, borderRadius: 5, marginTop: 5 }} onPress={() => this.submit()} title="Submit" />
			</View>
          </InputContainer> 
          <ScrollView style={{height:300}}>
           
          {map(Items)(allLinks)}
         </ScrollView>

         

      </Container>
    )
  }
}

export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery' })(CreateUrl);
