import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri:'http://localhost:5000/graphql'
});

ReactDOM.render(<ApolloProvider client={client}>
                  <CookiesProvider>
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
