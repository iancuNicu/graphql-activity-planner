
export const L_USER_QUERY = `
    query {
        getUser @client {
            email
            id
            name
        }
    }
`