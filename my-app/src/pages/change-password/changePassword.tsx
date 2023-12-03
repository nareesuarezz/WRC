import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './changePassword.css';

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const storedPassword = localStorage.getItem('password');
  
    console.log('Stored Password:', storedPassword);
  
    if (storedPassword === currentPassword) {
      localStorage.setItem('password', newPassword);
  
      navigate(-1);
    } else {
      setError('Contraseña actual incorrecta. Inténtalo de nuevo.');
    }
  };
  

  return (
    <div className="change-password-container">
      <h1 className="change-password-title">Change Password</h1>
      <form onSubmit={handleSubmit} className="change-password-form">
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <label className="change-password-input-container">
          <input 
            type={showCurrentPassword ? "text" : "password"} 
            value={currentPassword} 
            onChange={handleCurrentPasswordChange} 
            placeholder="Current Password"
            className="change-password-input"
          />
          {showCurrentPassword ? <EyeTwoTone onClick={() => setShowCurrentPassword(false)} className="change-password-eye-icon"/> : <EyeInvisibleOutlined onClick={() => setShowCurrentPassword(true)} className="change-password-eye-icon"/>}
        </label>
        <label className="change-password-input-container">
          <input 
            type={showNewPassword ? "text" : "password"} 
            value={newPassword} 
            onChange={handleNewPasswordChange} 
            placeholder="New Password"
            className="change-password-input"
          />
          {showNewPassword ? <EyeTwoTone onClick={() => setShowNewPassword(false)} className="change-password-eye-icon"/> : <EyeInvisibleOutlined onClick={() => setShowNewPassword(true)} className="change-password-eye-icon"/>}
        </label>
        <button type="submit" className="change-password-submit-button">Change</button>
      </form>
    </div>
  );
};

export default ChangePassword;
