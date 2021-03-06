import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Signup from './signup';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink } from 'apollo-link';

const GRAPHQL_ENDPOINT = 'https://api.graph.cool/simple/v1/cjdvepoew0ghc0197x1300bck';
const SUBSCRIPTIONS_ENDPOINT = 'wss://subscriptions.ap-northeast-1.graph.cool/v1/cjdvepoew0ghc0197x1300bck';

if (!SUBSCRIPTIONS_ENDPOINT) {
    throw Error('Provide a GraphQL Subscriptions endpoint.');
}

if (!GRAPHQL_ENDPOINT) {
    throw Error('Provide a GraphQL endpoint.');
}

const link = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
});

// const apolloLinkWithToken = new ApolloLink((operation, forward) => {
//     const token = localStorage.getItem('SHORTLY_TOKEN');
//     const authHeader = token ? `Bearer ${token}` : null;
//     operation.setContext({
//         headers: {
//             authorization: authHeader,
//         },
//     });
//     return forward(operation);
// });

//const httpLinkWithToken = apolloLinkWithToken.concat(httpLink);

// const wsLink = new WebSocketLink({
//     uri: SUBSCRIPTIONS_ENDPOINT,
//     options: {
//         reconnect: true,
//     },
// });

// We inspect the query and use the split function to return the web socket link
// in case the operation is a subscription and return an httpLink in any other case (query or mutation)
// const link = split(
//     ({ query }) => {
//         const { kind, operation } = getMainDefinition(query);
//         return kind === 'OperationDefinition' && operation === 'subscription';
//     },
//     wsLink,
//     httpLink,
// );

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
         <Signup />
      </ApolloProvider>
        
     
    );
  }
}


