import React from 'react';
import { createUseStyles } from 'react-jss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayoutProvider } from '../contexts/LayoutContext';
import Nav from '../components/nav/Nav';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import { Suspense, lazy } from 'react';
import Loader from '../components/common/Loader';

const Home = lazy(() => import('../screens/Home'));
const ListPage = lazy(() => import('../screens/ListPage'));

function App() {
  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
      <LayoutProvider>
        <div className={classes.root}>
          <BrowserRouter>
            <Nav />
            <div className={classes.content}>
              <div className={classes.scrollableArea}>
                <Suspense fallback={<Loader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pokemon" element={<ListPage />} />
                    <Route path="/pokemon/:name" element={<ListPage />} />
                  </Routes>
                </Suspense>
              </div>
            </div>
          </BrowserRouter>
        </div>
      </LayoutProvider>
    </ApolloProvider>
  );
}

const useStyles = createUseStyles(
  {
    root: {
      background: '#171E2b',
      minHeight: '100vh',
      minWidth: '100vw',
      height: '100%',
      width: '100%',
      display: 'flex',
    },
    content: {
      flex: '1',
      overflow: 'hidden',
      position: 'relative',
    },
    scrollableArea: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto',
    },
  },
  { name: 'App' }
);

export default App;
