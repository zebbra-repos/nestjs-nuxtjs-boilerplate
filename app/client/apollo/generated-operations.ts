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

/** Csrf token */
export type CsrfTokenDto = {
  __typename?: "CsrfTokenDto";
  /** Token */
  token: Scalars["String"];
};

/** Application settings for frontend */
export type SettingsDto = {
  __typename?: "SettingsDto";
  /** Application version */
  version: Scalars["String"];
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

/** Message Response DTO model */
export type MessageResponseDto = {
  __typename?: "MessageResponseDto";
  /** Custom information message */
  message: Scalars["String"];
};

/** Sign In Response DTO model */
export type SignInResponseDto = {
  __typename?: "SignInResponseDto";
  /** JWT expires in */
  expiresIn: Scalars["Int"];
  /** JSON web token */
  accessToken: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  /** Fetch a new csrf token */
  csrf: CsrfTokenDto;
  /** Get application settings for frontend */
  settings: SettingsDto;
  /** Get current user profile */
  profile: UserDto;
  /** Get user by ID */
  user: UserDto;
};

export type QueryUserArgs = {
  id: Scalars["Int"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** Request account confirmation instructions */
  confirmAccountRequest: MessageResponseDto;
  /** Request account unlock instructions */
  unlockAccountRequest: MessageResponseDto;
  /** Request user password reset instructions */
  resetPasswordRequest: MessageResponseDto;
  /** Register as a new user */
  signUp: MessageResponseDto;
  /** Login as user */
  signIn: SignInResponseDto;
};

export type MutationConfirmAccountRequestArgs = {
  data: EmailRequestDto;
};

export type MutationUnlockAccountRequestArgs = {
  data: EmailRequestDto;
};

export type MutationResetPasswordRequestArgs = {
  data: EmailRequestDto;
};

export type MutationSignUpArgs = {
  data: CreateUserDto;
};

export type MutationSignInArgs = {
  data: SignInRequestDto;
};

/** Email Request DTO model */
export type EmailRequestDto = {
  /** User email */
  email: Scalars["String"];
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

/** Sign In Request DTO model */
export type SignInRequestDto = {
  /** User email */
  email: Scalars["String"];
  /** User password */
  password: Scalars["String"];
};

export type SignUpMutationVariables = Exact<{
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type SignUpMutation = { readonly __typename?: "Mutation" } & {
  readonly signUp: { readonly __typename?: "MessageResponseDto" } & Pick<
    MessageResponseDto,
    "message"
  >;
};

export type SignInMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type SignInMutation = { readonly __typename?: "Mutation" } & {
  readonly signIn: { readonly __typename?: "SignInResponseDto" } & Pick<
    SignInResponseDto,
    "accessToken" | "expiresIn"
  >;
};

export type ResetPasswordRequestMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ResetPasswordRequestMutation = {
  readonly __typename?: "Mutation";
} & {
  readonly resetPasswordRequest: {
    readonly __typename?: "MessageResponseDto";
  } & Pick<MessageResponseDto, "message">;
};

export type ConfirmAccountRequestMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ConfirmAccountRequestMutation = {
  readonly __typename?: "Mutation";
} & {
  readonly confirmAccountRequest: {
    readonly __typename?: "MessageResponseDto";
  } & Pick<MessageResponseDto, "message">;
};

export type UnlockAccountRequestMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type UnlockAccountRequestMutation = {
  readonly __typename?: "Mutation";
} & {
  readonly unlockAccountRequest: {
    readonly __typename?: "MessageResponseDto";
  } & Pick<MessageResponseDto, "message">;
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
  readonly settings: { readonly __typename?: "SettingsDto" } & Pick<
    SettingsDto,
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

export const SignUpDocument = gql`
  mutation signUp(
    $firstName: String
    $lastName: String
    $email: String!
    $password: String!
  ) {
    signUp(
      data: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      message
    }
  }
`;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSignUpMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SignUpMutation,
        SignUpMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SignUpMutation,
          SignUpMutationVariables
        >
      >,
) {
  return VueApolloComposable.useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SignUpDocument, options);
}
export type SignUpMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  SignUpMutation,
  SignUpMutationVariables
>;
export const SignInDocument = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(data: { email: $email, password: $password }) {
      accessToken
      expiresIn
    }
  }
`;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        SignInMutation,
        SignInMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          SignInMutation,
          SignInMutationVariables
        >
      >,
) {
  return VueApolloComposable.useMutation<
    SignInMutation,
    SignInMutationVariables
  >(SignInDocument, options);
}
export type SignInMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  SignInMutation,
  SignInMutationVariables
>;
export const ResetPasswordRequestDocument = gql`
  mutation resetPasswordRequest($email: String!) {
    resetPasswordRequest(data: { email: $email }) {
      message
    }
  }
`;

/**
 * __useResetPasswordRequestMutation__
 *
 * To run a mutation, you first call `useResetPasswordRequestMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordRequestMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useResetPasswordRequestMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResetPasswordRequestMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        ResetPasswordRequestMutation,
        ResetPasswordRequestMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          ResetPasswordRequestMutation,
          ResetPasswordRequestMutationVariables
        >
      >,
) {
  return VueApolloComposable.useMutation<
    ResetPasswordRequestMutation,
    ResetPasswordRequestMutationVariables
  >(ResetPasswordRequestDocument, options);
}
export type ResetPasswordRequestMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  ResetPasswordRequestMutation,
  ResetPasswordRequestMutationVariables
>;
export const ConfirmAccountRequestDocument = gql`
  mutation confirmAccountRequest($email: String!) {
    confirmAccountRequest(data: { email: $email }) {
      message
    }
  }
`;

/**
 * __useConfirmAccountRequestMutation__
 *
 * To run a mutation, you first call `useConfirmAccountRequestMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useConfirmAccountRequestMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useConfirmAccountRequestMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useConfirmAccountRequestMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        ConfirmAccountRequestMutation,
        ConfirmAccountRequestMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          ConfirmAccountRequestMutation,
          ConfirmAccountRequestMutationVariables
        >
      >,
) {
  return VueApolloComposable.useMutation<
    ConfirmAccountRequestMutation,
    ConfirmAccountRequestMutationVariables
  >(ConfirmAccountRequestDocument, options);
}
export type ConfirmAccountRequestMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  ConfirmAccountRequestMutation,
  ConfirmAccountRequestMutationVariables
>;
export const UnlockAccountRequestDocument = gql`
  mutation unlockAccountRequest($email: String!) {
    unlockAccountRequest(data: { email: $email }) {
      message
    }
  }
`;

/**
 * __useUnlockAccountRequestMutation__
 *
 * To run a mutation, you first call `useUnlockAccountRequestMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUnlockAccountRequestMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUnlockAccountRequestMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUnlockAccountRequestMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        UnlockAccountRequestMutation,
        UnlockAccountRequestMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          UnlockAccountRequestMutation,
          UnlockAccountRequestMutationVariables
        >
      >,
) {
  return VueApolloComposable.useMutation<
    UnlockAccountRequestMutation,
    UnlockAccountRequestMutationVariables
  >(UnlockAccountRequestDocument, options);
}
export type UnlockAccountRequestMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  UnlockAccountRequestMutation,
  UnlockAccountRequestMutationVariables
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
