import gql from "graphql-tag";
import * as VueApolloComposable from "@vue/apollo-composable";
import * as VueCompositionApi from "@vue/composition-api";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** User DTO model */
export type UserDto = {
  __typename?: "UserDto";
  /** User database ID */
  id: Scalars["Int"];
  /** User first name */
  firstName?: Maybe<Scalars["String"]>;
  /** User last name */
  lastName?: Maybe<Scalars["String"]>;
  /** User email */
  email: Scalars["String"];
};

/** Login User Response DTO model */
export type LoginUserResponseDto = {
  __typename?: "LoginUserResponseDto";
  /** JWT expires in */
  expiresIn: Scalars["Int"];
  /** JSON web token */
  accessToken: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  /** Get current user profile */
  profile: UserDto;
  /** Get user by ID */
  user: UserDto;
  /** Get application version */
  version: Scalars["String"];
};

export type QueryUserArgs = {
  id: Scalars["Int"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** Register as a new user */
  register: UserDto;
  /** Login as user */
  login: LoginUserResponseDto;
};

export type MutationRegisterArgs = {
  createUserInput: CreateUserDto;
};

export type MutationLoginArgs = {
  loginUserInput: LoginUserRequestDto;
};

/** Create User DTO model */
export type CreateUserDto = {
  /** User first name */
  firstName?: Maybe<Scalars["String"]>;
  /** User last name */
  lastName?: Maybe<Scalars["String"]>;
  /** User email */
  email: Scalars["String"];
  /** User password */
  password: Scalars["String"];
};

/** Login User DTO model */
export type LoginUserRequestDto = {
  /** User email */
  email: Scalars["String"];
  /** User password */
  password: Scalars["String"];
};

export type GetVersionQueryVariables = Exact<{ [key: string]: never }>;

export type GetVersionQuery = { readonly __typename?: "Query" } & Pick<
  Query,
  "version"
>;

export const GetVersionDocument = gql`
  query getVersion {
    version
  }
`;

/**
 * __useGetVersionQuery__
 *
 * To run a query within a Vue component, call `useGetVersionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVersionQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetVersionQuery(
 *   {
 *   }
 * );
 */
export function useGetVersionQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        GetVersionQuery,
        GetVersionQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetVersionQuery,
          GetVersionQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetVersionQuery,
          GetVersionQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<GetVersionQuery, undefined>(
    GetVersionDocument,
    undefined,
    options,
  );
}
export type GetVersionQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  GetVersionQuery,
  GetVersionQueryVariables
>;
