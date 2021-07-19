import { gql } from "@apollo/client";

export const GET_USER_LOGIN = gql`
    query getLogin (
        $username: String!
        $password: String!
    ) {
        login(username: $username, password: $password) {
            id
            username
            lastName
            firstName
            created
            email
            likedReviews {
                id
            }
            reviews {
                id
            }
        }
    }
`;

export const GET_ALL_USERS = gql`
    query users {
        users {
            username,
            email,
            id,
            firstName,
            lastName,
        }
    }
`;

export const GET_MOVIE_REVIEWS = gql`
    query reviewsById(
        $movieId: Int!
    ) {
        reviewsById (
            movieId: $movieId
        ) {
            id
            description
            movieId
            rating
            created
            author {
                id
                username
                firstName
            }
            likes {
                id
                created
                user {
                    id
                    username
                }
            }
        }
    } 
`