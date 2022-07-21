import React, { useState, useContext, createContext } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client'
import { LOG_IN, SIGN_UP } from '../graphql/queries'
import {offsetLimitPagination} from '@apollo/client/utilities';

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}


function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null)

  const isSignedIn = () => {
    if (authToken) {
      return true
    } else {
      return false
    }
  }


  const getAuthHeaders = () => {
    if (!authToken) return null

    return {
      authorization: `Bearer ${authToken}`,
    }
  }

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: 'https://api.vrmarketing.guru/',
      headers: getAuthHeaders(),
    })

    return new ApolloClient({
      link,
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              launchesPast: offsetLimitPagination()
            }
          }
        }
      }),
    })
  }

  const signUp = async ({ name, email, password }) => {
    const client = createApolloClient()

    const result = await client.mutate({
      mutation: SIGN_UP,
      variables: { name, email, password },
    })

    console.log(result)

    if (result?.data?.login?.token) {
      setAuthToken(result.data.login.token)
    }
  }

  const logIn = async ({ email, password }) => {
    const client = createApolloClient()

    const result = await client.mutate({
      mutation: LOG_IN,
      variables: { email, password },
    })

    console.log(result)

    if (result?.data?.login?.token) {
      setAuthToken(result.data.login.token)
    }
  }

// not Implemented 
  const signOut = () => {
    setAuthToken(null)
  }

  return {
    setAuthToken,
    isSignedIn,
    logIn,
    signUp,
    signOut,
    createApolloClient,
  }
}