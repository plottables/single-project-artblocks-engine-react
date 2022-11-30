import {
  useQuery,
  gql
} from '@apollo/client';

const tokenCountQuery = (projectId: string, address: string) => `
  query GetTokens {
    tokens(
      where: {
        project: "${projectId}",
        ${address != '' ? `owner: "${address.toLowerCase()}"` : ''}
      }
    ) {
      id
      tokenId
      invocation
    }
  }`;

const useTokenCount = (projectId: string, address: string) => {

  const { loading, error, data, refetch } = useQuery(gql(tokenCountQuery(projectId, address)));

  return {
    loading,
    error,
    data,
    refetch
  }
}

export default useTokenCount;
