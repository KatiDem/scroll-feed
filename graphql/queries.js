import { gql } from '@apollo/client'

export const GET_ALL_LINKS = gql`
query {
  feed {
    count
    links {
      id
      description
      url
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
          name
        }
      }
    }
  }
}
`;

export const SEARCH = gql`
query {
  feed(filter: "graphql") {
    count
    links {
      id
      description
      url
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
          name
        }
      }
    }
  }
}`

export const PAGINATE = gql`
query feed($take: Int = 10, $skip: Int!) {
  feed(take: $take, skip: $skip) {
    count
    links {
      id
      description
      url
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
          name
        }
      }
    }
  }
}`

export const SORT_BY_DESC = gql`
query {
  feed(orderBy: { description: asc }) {
    count
    links {
      id
      description
      url
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
          name
        }
      }
    }
  }
}`


export const ADD_LINK = gql`
mutation($url: String!, $description: String!){
  post( url: $url, description: $description) {
    id
  }
}`

export const ADD_VOTE = gql`
mutation VoteMutation($linkId: ID!){
  vote(linkId: $linkId) {
    id
  }
}`

export const LOG_IN = gql`
	mutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`;

export const SIGN_UP = gql`
	mutation($name: String!, $email: String!, $password: String!) {
		signup(name: $name, email: $email, password: $password) {
			token
		}
	}
`;