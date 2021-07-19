// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
hello: string;
users: Array<IUser | null> | null;
user: IUser | null;
}

interface IHelloOnQueryArguments {
name?: string | null;
}

interface IUserOnQueryArguments {
id: string;
}

interface IUser {
__typename: "User";
id: string;
username: string;
firstName: string | null;
lastName: string | null;
email: string;
password: string;
created: string | null;
}

interface IMutation {
__typename: "Mutation";
register: IUser | null;
createReview: IReview | null;
}

interface IRegisterOnMutationArguments {
email: string;
password: string;
username: string;
firstName?: string | null;
lastName?: string | null;
created?: string | null;
}

interface ICreateReviewOnMutationArguments {
description: string;
rating?: number | null;
movieId: number;
authorId: string;
created?: string | null;
}

interface IReview {
__typename: "Review";
id: string;
description: string;
rating: number;
author: IUser;
movieId: number;
authorId: string;
created: string | null;
}
}

// tslint:enable
