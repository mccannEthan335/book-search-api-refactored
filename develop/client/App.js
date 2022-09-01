import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import {
    gql, 
    useQuery,
ApolloProvider,
ApolloClient,
InMemoryCache
} from '@apollo/client';

const httpLink = createHttpLink({
    // uri: "http://localhost:3001/graphql",
    uri: "/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

const client = new ApolloClient({
    // link: httpLink,
    link: authLink.concat(httpLink), // combine the authLink and httpLink objects so that every request retrieves the token and sets the request headers before making the request to the API
    cache: new InMemoryCache(),
  });

const query = gql

function App() {
    const {loading, data} = useQuery(query)
    if (loading) return <p>Loading Books Matching Specified Criteria</p>

  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
        
      </>
    </Router>
    
  );
}

export default App;
