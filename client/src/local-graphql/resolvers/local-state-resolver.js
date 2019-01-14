
export const resolvers = {
    Mutation: {
        addUser: async (_, variables, {cache, getCacheKey}) => {
            if(variables.user){
                cache.writeData({data:{user: variables.user}});
            }
            return variables.user;
        }
    } 
};