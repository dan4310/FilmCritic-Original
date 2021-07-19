import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation createUser(
            $username: String!
            $email: String!
            $password: String!
            $firstName: String
            $lastName: String
        ) {
            register(
                firstName: $firstName
                lastName: $lastName
                username: $username
                password: $password
                email: $email
            ) {
                id
                username
                lastName
                firstName
                created
                email
            }
        }
    
`;

export const CREATE_REVIEW = gql`
    mutation createReview(
            $authorId: String!
            $description: String!
            $movieId: Int!
            $rating: Float!
        ) {
            createReview(
                authorId: $authorId
                description: $description
                rating: $rating
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
                    user {
                        id
                        username
                    }
                }
            }
        }
    
`;

export const CREATE_LIKE = gql`
    mutation createLike(
            $userId: String!
            $reviewId: String!
        ) {
            likePost(
                userId: $userId
                reviewId: $reviewId
            ) {
                id
                created
                user {
                    id
                    username
                }
                review {
                    id
                }
            }
        }
    
`;

export const DELETE_LIKE = gql`
    mutation deleteLike(
        $userId: String!
        $reviewId: String!
    ) {
        deleteLike(
            userId: $userId
            reviewId: $reviewId
        ) {
            id
        }
    }
`
