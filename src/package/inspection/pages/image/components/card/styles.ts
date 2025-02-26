import { Card, Image } from 'antd';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  .ant-card-cover {
    height: 200px;

    > * {
      object-fit: cover;
      height: 100%;
    }
  }
`;

export const PreviewImage = styled(Image)`
  display: none;
`;
