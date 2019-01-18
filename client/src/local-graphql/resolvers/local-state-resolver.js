import {L_USER_QUERY} from '../type-defs/l-state-query';

export const resolvers = {
    Mutation: {
        addUser: async (_, variables, {cache, getCacheKey}) => {
            if(variables.user){
                cache.writeData({data:{user: variables.user}});
            }
            return variables.user;
        },
        removeUser: async (_, variables, {cache}) => {
            let user = cache.readQuery({query: L_USER_QUERY});
            user = null;
            cache.writeData({data:{user}});
            cache.reset();
            return {
                removed:true,
                error: false,
                __typename: 'RemovedUser'
            };
        }
    } 
};