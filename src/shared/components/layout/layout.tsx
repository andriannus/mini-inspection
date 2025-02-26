import {
  FileSearchOutlined,
  HomeFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';

import {
  Logo,
  StyledContent,
  StyledFooter,
  StyledHeader,
  StyledSider,
} from './styles';
import { useState } from 'react';

function SharedLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider>
      <StyledSider
        breakpoint="lg"
        collapsed={collapsed}
        collapsible
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
      >
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
        <StyledHeader>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </StyledHeader>

        <StyledContent>
          <Outlet />
        </StyledContent>

        <StyledFooter>Mini Inspection &copy; 2025</StyledFooter>
      </Layout>
    </Layout>
  );
}

export default SharedLayout;
