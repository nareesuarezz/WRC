import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import UserService from '../../services/user.services'; 
import './userMenu.css'

interface User {
  username: string;
  password: string;
  img: string;
}

const UserMenu: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState<string>('');
  const [userImage, setUserImage] = useState<string>('');

  useEffect(() => {
    const usersData = UserService.getUsers();
    setUsers(usersData);
    setUsername(usersData[0].username);
    setUserImage(usersData[0].img);
  }, []);

  const handleMenuClick = (e: any) => {
    if (e.key === 'logout') {
      alert('Logout');
    } else if (e.key === 'changeUsername') {
      const newUsername = prompt('Introduce tu nuevo nombre de usuario');
      if (newUsername) {
        setUsername(newUsername);
      }
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key='logout'>
        Logout
      </Menu.Item>
      <Menu.Item key='changeUsername'>
        Change username
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button className="user-menu-button">
        <img src={`/assets/img/${userImage}`} alt="User" className="user-menu-image" /> {username} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default UserMenu;
