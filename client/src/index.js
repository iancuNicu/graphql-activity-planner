import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Cookie from './cookies-config';

import {resolvers} from './local-graphql/resolvers/local-state-resolver';
import {lStateTypeDefs} from './local-graphql/type-defs/l-state.type-def';

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

const defaults = {
  user: null
}

const link = new HttpLink({
  uri:'http://localhost:5000/graphql',
  credentials: 'same-origin'
});

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults,
  resolvers,
  typeDefs: lStateTypeDefs
});

const getAuthHeader = new ApolloLink((operation, forward) => {
  return forward(operation).map(res => {
    const {response} = operation.getContext();
    const headers = {
      'x-auth': response.headers.get('x-auth'),
      'x-auth-refresh': response.headers.get('x-auth-refresh')
    }
    res.headers = {
      ...res.headers,
      ...headers
    }
    return res;
  })
});


const client = new ApolloClient({
  link: ApolloLink.from([stateLink, getAuthHeader, link]),
  cache
});

ReactDOM.render(<ApolloProvider client={client}>
                  <CookiesProvider cookies={Cookie}>
                    <BrowserRouter>
                      <App />
                    </BrowserRouter> 
                  </CookiesProvider> 
                </ApolloProvider>, 
                document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
