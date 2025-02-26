import { useState } from 'react';

import { InspectionFile } from '~/inspection/types';

import { PreviewImage, StyledCard } from './styles';

type ImageCardProps = {
  file: InspectionFile;
};

function ImageCard({ file }: ImageCardProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <StyledCard
        hoverable
        cover={<img alt={file.name} src={file.url} loading="lazy" />}
        onClick={() => {
          setVisible(true);
        }}
      >
        <StyledCard.Meta title={file.name} />
      </StyledCard>

      <PreviewImage
        preview={{
          visible,
          src: file.url,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </>
  );
}

export default ImageCard;
