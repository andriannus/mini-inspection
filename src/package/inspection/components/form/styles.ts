import { Card, Image, Row, Upload } from 'antd';
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

export const StyledUploadDragger = styled(Upload.Dragger)`
  display: block;
  height: 354px;
`;

export const CardForAction = styled.div`
  align-items: center;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  display: flex;
  height: 100%;
  min-height: 398px;
  justify-content: center;
  width: 100%;
`;

export const WrapperForIcon = styled.div`
  color: #1677ff;
  display: flex;
  font-size: 48px;
  justify-content: center;
`;
