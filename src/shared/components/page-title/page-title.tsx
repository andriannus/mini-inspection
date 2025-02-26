import { Helmet } from 'react-helmet-async';

type SharedPageTileProps = {
  value: string;
};

function SharedPageTile({ value }: SharedPageTileProps) {
  return (
    <Helmet>
      <title>{value}</title>
    </Helmet>
  );
}

export default SharedPageTile;
