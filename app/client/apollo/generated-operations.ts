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

/** Application settings for frontend */
export type AppSettingsDto = {
  __typename?: "AppSettingsDto";
  /** Application version */
  version: Scalars["String"];
};

/** Csrf token */
export type CsrfTokenDto = {
  __typename?: "CsrfTokenDto";
  /** Token */
  token: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  /** Get current user profile */
  profile: UserDto;
  /** Get user by ID */
  user: UserDto;
  /** Get application settings for frontend */
  settings: AppSettingsDto;
  /** Fetch a new csrf token */
  csrf: CsrfTokenDto;
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

export type RegisterUserMutationVariables = Exact<{
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type RegisterUserMutation = { readonly __typename?: "Mutation" } & {
  readonly register: { readonly __typename?: "UserDto" } & Pick<
    UserDto,
    "id" | "firstName" | "lastName" | "email"
  >;
};

export type LoginUserMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginUserMutation = { readonly __typename?: "Mutation" } & {
  readonly login: { readonly __typename?: "LoginUserResponseDto" } & Pick<
    LoginUserResponseDto,
    "accessToken" | "expiresIn"
  >;
};

export type GetProfileQueryVariables = Exact<{ [key: string]: never }>;

export type GetProfileQuery = { readonly __typename?: "Query" } & {
  readonly profile: { readonly __typename?: "UserDto" } & Pick<
    UserDto,
    "id" | "firstName" | "lastName" | "email"
  >;
};

export type AppSettingsQueryVariables = Exact<{ [key: string]: never }>;

export type AppSettingsQuery = { readonly __typename?: "Query" } & {
  readonly settings: { readonly __typename?: "AppSettingsDto" } & Pick<
    AppSettingsDto,
    "version"
  >;
};

export type CsrfTokenQueryVariables = Exact<{ [key: string]: never }>;

export type CsrfTokenQuery = { readonly __typename?: "Query" } & {
  readonly csrf: { readonly __typename?: "CsrfTokenDto" } & Pick<
    CsrfTokenDto,
    "token"
  >;
};

export const RegisterUserDocument = gql`
  mutation registerUser(
    $firstName: String
    $lastName: String
    $email: String!
    $password: String!
  ) {
    register(
      createUserInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRegisterUserMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        RegisterUserMutation,
        RegisterUserMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          RegisterUserMutation,
          RegisterUserMutationVariables
        >
      >,
) {
  return VueApolloComposable.useMutation<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >(RegisterUserDocument, options);
}
export type RegisterUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;
export const LoginUserDocument = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(loginUserInput: { email: $email, password: $password }) {
      accessToken
      expiresIn
    }
  }
`;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        LoginUserMutation,
        LoginUserMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          LoginUserMutation,
          LoginUserMutationVariables
        >
      >,
) {
  return VueApolloComposable.useMutation<
    LoginUserMutation,
    LoginUserMutationVariables
  >(LoginUserDocument, options);
}
export type LoginUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  LoginUserMutation,
  LoginUserMutationVariables
>;
export const GetProfileDocument = gql`
  query getProfile {
    profile {
      id
      firstName
      lastName
      email
    }
  }
`;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a Vue component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetProfileQuery(
 *   {
 *   }
 * );
 */
export function useGetProfileQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        GetProfileQuery,
        GetProfileQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetProfileQuery,
          GetProfileQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetProfileQuery,
          GetProfileQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<GetProfileQuery, undefined>(
    GetProfileDocument,
    undefined,
    options,
  );
}
export type GetProfileQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  GetProfileQuery,
  GetProfileQueryVariables
>;
export const AppSettingsDocument = gql`
  query appSettings {
    settings {
      version
    }
  }
`;

/**
 * __useAppSettingsQuery__
 *
 * To run a query within a Vue component, call `useAppSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppSettingsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAppSettingsQuery(
 *   {
 *   }
 * );
 */
export function useAppSettingsQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        AppSettingsQuery,
        AppSettingsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          AppSettingsQuery,
          AppSettingsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          AppSettingsQuery,
          AppSettingsQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<AppSettingsQuery, undefined>(
    AppSettingsDocument,
    undefined,
    options,
  );
}
export type AppSettingsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  AppSettingsQuery,
  AppSettingsQueryVariables
>;
export const CsrfTokenDocument = gql`
  query csrfToken {
    csrf {
      token
    }
  }
`;

/**
 * __useCsrfTokenQuery__
 *
 * To run a query within a Vue component, call `useCsrfTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useCsrfTokenQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCsrfTokenQuery(
 *   {
 *   }
 * );
 */
export function useCsrfTokenQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        CsrfTokenQuery,
        CsrfTokenQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          CsrfTokenQuery,
          CsrfTokenQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          CsrfTokenQuery,
          CsrfTokenQueryVariables
        >
      > = {},
) {
  return VueApolloComposable.useQuery<CsrfTokenQuery, undefined>(
    CsrfTokenDocument,
    undefined,
    options,
  );
}
export type CsrfTokenQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  CsrfTokenQuery,
  CsrfTokenQueryVariables
>;
