import gql from 'graphql-tag';

export const GET_ME = gql`
{
    me {
        _id
        username
        email
        savedBooks {
            _id
            bookId
            authors
            image
            link
            title
            description
        }
    }
}`;