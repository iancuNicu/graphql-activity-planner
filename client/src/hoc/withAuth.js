import React from 'react';
import {graphql, Query} from 'react-apollo';
import {VERIFY_AUTH} from '../queries/auth-query';
import {L_STATE_MUTATION} from '../local-graphql/type-defs/local-state-mutation';
import {compose} from 'recompose';
import Cookie from '../cookies-config';

const withAuth = (Component) => (props) => {

    let ComponentWithAuth;
    
    const refreshToken = Cookie.get('x-auth-refresh');
    const authorizationToken = Cookie.get('x-auth');

    return(
        <React.Fragment>
            {(refreshToken && authorizationToken) ? 
                <Query query={VERIFY_AUTH} variables={{refreshToken}}   
                   context={
                    {
                         headers:{
                            'Authorization': authorizationToken
                        }   
                    }}>
                    {(authQuery) => {
                        if(authQuery.loading){
                            return (
                                <h4>Loading...</h4>
                            );
                        }
                        else {
                            ComponentWithAuth =  graphql(L_STATE_MUTATION, {
                                name: 'StoreMutation',
                                options: {
                                    variables: {
                                        user: {
                                            ...authQuery.data.verifyAuth
                                        }
                                    }
                                }
                            })(Component);
                            return (
                                <ComponentWithAuth authData={authQuery.data.verifyAuth} {...props} />
                            )
                        }
                    }}
                </Query> 
                : <Component />
            }
        </React.Fragment>
    );
}

export default withAuth;