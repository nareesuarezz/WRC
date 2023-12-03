import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Button, Modal, Upload } from 'antd';
import { DownOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from '../../img/pfp.jpg'; // Importa la imagen por defecto

interface User {
  username: string;
  password: string;
  img: string;
}

const UserMenu: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedProfileImageUrl = localStorage.getItem('profileImageUrl');
    let storedPassword = localStorage.getItem('password');
    if (!storedPassword) {
      storedPassword = "prueba";
    }
    
    if (!storedUsername) {
      const initialUser: User = {
        username: 'prueba',
        password: 'prueba',
        img: defaultProfileImage,
      };

      localStorage.setItem('username', initialUser.username);
      localStorage.setItem('profileImageUrl', initialUser.img);
      localStorage.setItem('password', initialUser.password);

      setUsername(initialUser.username);
      setUserImage(initialUser.img);
      setPassword(initialUser.password)
    } else {
      setUsername(storedUsername);
      setUserImage(storedProfileImageUrl);
      setPassword(storedPassword);
      console.log('UserMenu password:', storedPassword);

    }
  }, []);

  const handleMenuClick = (e: any) => {
    if (e.key === 'logout') {
      navigate('/login')
    } else if (e.key === 'changeUsername') {
      navigate('/change-username');
    } else if (e.key === 'changeProfilePic') {
      navigate('/change-profile-pic');
    } else if (e.key === 'changePassword') {
      navigate('/change-password');
    }
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      return false;
    },
  };

  return (
    <div>
      <Dropdown overlay={<Menu onClick={handleMenuClick}>
        <Menu.Item key='logout'>
          Logout
        </Menu.Item>
        <Menu.Item key='changeUsername'>
          Change username
        </Menu.Item>
        <Menu.Item key='changeProfilePic'>
          Change profile picture
        </Menu.Item>
        <Menu.Item key='changePassword'>
          Change password
        </Menu.Item>
      </Menu>}>
        <Button className="user-menu-button">
          {userImage && <img src={userImage} alt="User" className="user-menu-image" />}
          {username} <DownOutlined />
        </Button>
      </Dropdown>
      <Modal
        title="Change Profile Picture"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default UserMenu;
