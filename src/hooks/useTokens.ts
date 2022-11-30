import {
  useQuery,
  gql
} from '@apollo/client';
import { tokensPerPage } from 'config';
import { OrderDirection } from 'utils/types';

interface TokensQueryParams {
  first?: number;
  skip?: number;
  orderDirection?: OrderDirection;
}

const tokensQuery = (projectId: string, {
  first,
  skip,
  orderDirection,
}: TokensQueryParams, address: string) => `
  query GetTokens {
    tokens(
      first: ${first},
      skip: ${skip},
      orderBy: createdAt orderDirection: ${orderDirection},
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

const useTokens = (projectId: string, params: TokensQueryParams, address: string) => {
  const first = params?.first || tokensPerPage;
  const skip = params?.skip || 0;
  const orderDirection = params?.orderDirection || OrderDirection.ASC;

  const { loading, error, data, refetch } = useQuery(gql(tokensQuery(projectId, {
    first,
    skip,
    orderDirection,
  }, address)));

  if (error) {
    refetch()
  }

  return {
    loading,
    error,
    data,
  }
}

export default useTokens;
