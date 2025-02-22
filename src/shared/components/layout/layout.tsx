import { FileSearchOutlined, HomeFilled } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';

import {
  Logo,
  StyledContent,
  StyledFooter,
  StyledHeader,
  StyledSider,
} from './styles';

function SharedLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout hasSider>
      <StyledSider breakpoint="lg" collapsedWidth={0}>
        <Logo />

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/home']}
          selectedKeys={[location.pathname]}
          items={[
            {
              key: '/home',
              icon: <HomeFilled />,
              label: 'Home',
            },
            {
              key: '/inspection',
              icon: <FileSearchOutlined />,
              label: 'Inspection',
              children: [
                {
                  key: '/inspection/create',
                  label: 'Create',
                },
                {
                  key: '/inspection/image',
                  label: 'Image',
                },
              ],
            },
          ]}
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      </StyledSider>

      <Layout>
        <StyledHeader />

        <StyledContent>
          <Outlet />
        </StyledContent>

        <StyledFooter>Mini Inspection &copy; 2025</StyledFooter>
      </Layout>
    </Layout>
  );
}

export default SharedLayout;
