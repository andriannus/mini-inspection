import { Typography } from 'antd';

import { PageTitle } from '#/components/page-title';

function StandalonePageCreate() {
  return (
    <>
      <PageTitle value="Welcome to Inspection" />

      <Typography.Title>Oh hi! Welcome to Inspection App.</Typography.Title>

      <Typography.Paragraph>
        Found something interesting during your inspection?
      </Typography.Paragraph>
    </>
  );
}

export default StandalonePageCreate;
