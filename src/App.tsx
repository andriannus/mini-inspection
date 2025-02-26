import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { message } from 'antd';

import { MessageContext } from '#/contexts/message';

import Router from './router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [messageAPI, contextHolder] = message.useMessage();

  return (
    <QueryClientProvider client={queryClient}>
      <MessageContext.Provider value={messageAPI}>
        {contextHolder}
        <Router />
      </MessageContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
