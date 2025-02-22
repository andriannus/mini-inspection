import { Row } from 'antd';
import styled from 'styled-components';

export const StyledRow = styled(Row)`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;
