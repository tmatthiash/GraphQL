import RepositoryList from '../Repository';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../Loading';


const GET_ALL_MESSAGES = gql`
  {
    user(id: 1) {
      email
      firstName
      lastName
    }
  }
`;

const Profile = () => (
  <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
    {({ data, loading }) => {
      const { viewer } = data;

      if (loading || !viewer) {
        return <Loading />;
      }

      return <RepositoryList repositories={viewer.repositories} />;
    }}
  </Query>
);