import {
  useQuery,
  gql
} from '@apollo/client';

const tokenQuery = (id: string) => `
  query GetToken {
    token(
      id: "${id}"
    ) {
      id
      tokenId
      invocation
      createdAt
      uri
      owner {
        id
      }
      project {
        id
        projectId
        name
        artistName
        scriptJSON
      }
    }
  }`;

const useToken = (id: string) => {
  const { loading, error, data, refetch } = useQuery(gql(tokenQuery(id)));

  if (error) {
    refetch()
  }

  return {
    loading,
    error,
    data,
  }
}

export default useToken;
