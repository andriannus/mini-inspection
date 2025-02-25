import type { MessageInstance } from 'antd/es/message/interface';
import { createContext, useContext } from 'react';

export const MessageContext = createContext<Partial<MessageInstance>>({});
export const useMessage = () => useContext(MessageContext);
