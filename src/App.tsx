import { HelmetProvider } from 'react-helmet-async';

import Router from './router';

function App() {
  return (
    <HelmetProvider>
      <Router />
    </HelmetProvider>
  );
}

export default App;
