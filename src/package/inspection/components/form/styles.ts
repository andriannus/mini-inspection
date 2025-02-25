import { Card, Image, Row } from 'antd';
import styled from 'styled-components';

export const StyledRow = styled(Row)`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const StyedCard = styled(Card)`
  .ant-card-body {
    .ant-image {
      height: 300px;
      margin-bottom: 16px;
      overflow: hidden;
      width: 100%;

      .ant-image-img {
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

export const StyledImage = styled(Image)`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

export const CardForAction = styled.div`
  align-items: center;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;
