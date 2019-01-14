import React from 'react';
import { graphql} from 'react-apollo';
import {VERIFY_AUTH} from '../queries/auth-query';
import {L_STATE_MUTATION} from '../local-graphql/type-defs/local-state-mutation';
import {compose} from 'recompose';
import Cookie from '../cookies-config';

const withAuth = (Component) => (props) => {

    let ComponentWithAuth;
    
    const refreshToken = Cookie.get('x-auth-refresh');
    const authorizationToken = Cookie.get('x-auth');

    const AuthQuery = graphql(VERIFY_AUTH, {
        name: 'AuthQuery',
        options: {
            variables: {
                refreshToken
            },
            context: {
                headers: {
                    'Authorization': authorizationToken
                }
            }
        }
    });

    const StoreMutation = graphql(L_STATE_MUTATION, {
        name: 'StoreMutation'
    })

    if(refreshToken && authorizationToken){
        ComponentWithAuth = compose(StoreMutation, AuthQuery)(Component);
    }
    else {
        ComponentWithAuth = Component
    }

    return(
        <React.Fragment>
            <ComponentWithAuth {...props} />
        </React.Fragment>
    );
}

export default withAuth;