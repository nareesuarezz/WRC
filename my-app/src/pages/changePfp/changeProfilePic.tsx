import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import './changeProfilePic.css';

const ChangeProfilePic: React.FC = () => {
    const [newProfilePic, setNewProfilePic] = useState<File | null>(null);
    const [profilePic, setProfilePic] = useState<string>(localStorage.getItem('profileImageUrl') || '');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newProfilePic) {
            try {
                const imageUrl = await uploadImageToServer(newProfilePic);
                localStorage.setItem('profileImageUrl', imageUrl);
                setProfilePic(imageUrl);
                navigate(-1);
            } catch (error) {
                console.error('Error uploading profile picture:', error);
            }
        }
    };

    const uploadImageToServer = async (file: File): Promise<string> => {
        return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProfilePic(e.target.files?.[0] || null);
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="profile-change-container">
            <div className="profile-change-inner">
                <h1>Change Profile Picture</h1>
                <div className="profile-pic-container">
                    <label className="edit-icon">
                        <EditOutlined />
                        <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
                    </label>
                    <img src={profilePic} alt="Profile" className="profile-pic" />
                </div>
                <form onSubmit={handleSubmit}>
                    <button type="submit" className="profile-submit-button">Change</button>
                </form>
            </div>
        </div>
    );
};

export default ChangeProfilePic;
