import { message } from 'antd';
import { HelmetProvider } from 'react-helmet-async';

import { MessageContext } from '#/contexts/message';

import Router from './router';

function App() {
  const [messageAPI, contextHolder] = message.useMessage();

  return (
    <HelmetProvider>
      <MessageContext.Provider value={messageAPI}>
        {contextHolder}
        <Router />
      </MessageContext.Provider>
    </HelmetProvider>
  );
}

export default App;
