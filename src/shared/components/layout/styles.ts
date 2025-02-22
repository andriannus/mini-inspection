import { Layout } from 'antd';
import styled from 'styled-components';

export const StyledSider = styled(Layout.Sider)`
  bottom: 0;
  height: 100vh;
  inset-inline-start: 0;
  overflow: auto;
  position: sticky;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  top: 0;
`;

export const StyledHeader = styled(Layout.Header)`
  background: #ffffff;
  padding: 0;
`;

export const StyledContent = styled(Layout.Content)`
  background: #ffffff;
  border-radius: 8px;
  margin: 24px 16px 0;
  overflow: initial;
  padding: 24px;
`;

export const StyledFooter = styled(Layout.Footer)`
  text-align: center;
`;

export const Logo = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  height: 32px;
  margin: 16px;
`;
