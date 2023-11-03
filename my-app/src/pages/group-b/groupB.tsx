import React, { useState, useEffect, ChangeEvent } from "react";
import Header from "../../components/header/header";
import "./groupB.css";
import Hamburger from "../../components/menu/Hamburger";
import { Button } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import UserMenu from "../../components/user/userMenu";
import UserService from '../../services/user.services'; // Reemplaza 'ruta/a/UserService' con la ruta correcta a tu archivo UserService

interface User {
    username: string;
    password: string;
    img: string;
}

interface Comment {
    text: string;
    likes: number;
    dislikes: number;
    replies: Reply[];
}

interface Reply {
    text: string;
    likes: number;
    dislikes: number;
}

function GroupB() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [replyText, setReplyText] = useState<string>("");

    useEffect(() => {
        const usersData = UserService.getUsers();
        setUsers(usersData);
        setCurrentUser(usersData[0]);
    }, []);

    const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim() !== "") {
            const newCommentData: Comment = {
                text: newComment,
                likes: 0,
                dislikes: 0,
                replies: [],
            };
            setComments([...comments, newCommentData]);
            setNewComment("");
        }
    };

    const handleLike = (index: number) => {
        const updatedComments = [...comments];
        updatedComments[index].likes += 1;
        setComments(updatedComments);
    };

    const handleDislike = (index: number) => {
        const updatedComments = [...comments];
        updatedComments[index].dislikes += 1;
        setComments(updatedComments);
    };

    const handleReplyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReplyText(e.target.value);
    };

    const handleReplySubmit = (index: number) => {
        if (replyText.trim() !== "") {
            const updatedComments = [...comments];
            updatedComments[index].replies.push({
                text: replyText,
                likes: 0,
                dislikes: 0,
            });
            setComments(updatedComments);
            setReplyText("");
        }
    };

    const handleReplyLike = (commentIndex: number, replyIndex: number) => {
        const updatedComments = [...comments];
        updatedComments[commentIndex].replies[replyIndex].likes += 1;
        setComments(updatedComments);
    };

    const handleReplyDislike = (commentIndex: number, replyIndex: number) => {
        const updatedComments = [...comments];
        updatedComments[commentIndex].replies[replyIndex].dislikes += 1;
        setComments(updatedComments);
    };

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    }

    return (
        <>
            <Header />
            <div className="user-menu-container">
                <UserMenu />
            </div>
            <Hamburger />
            <div className="title">
                <h2>The Legendary Group B</h2>
                <img src="/assets/img/quattro.jpg" alt="car" />
            </div>
            <div className="main-container">
                <p>
                    Group B was formed from a series of regulations for racing cars established by the FIA, for adaptation in rally competitions. It was established in 1982 to replace Group 4 and was banned in 1986, after a series of fatal accidents, being replaced by Group A.
                </p>

                <iframe
                    width="866"
                    height="1000"
                    src="https://www.youtube.com/embed/INwqyPct8qY"
                    title="Rally Group B - Tribute"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen>
                </iframe>

                <div className="comments-section">
                    <h3>Comments</h3>
                    <div className="comment-input">
                        <textarea
                            placeholder="Add a comment"
                            value={newComment}
                            onChange={handleCommentChange}
                        ></textarea>
                        <button onClick={handleCommentSubmit}>Submit</button>
                    </div>
                    <div className="comment-list">
                        {comments.map((comment, commentIndex) => (
                            <div className="comment" key={commentIndex}>
                                {currentUser && (
                                    <div className="comment-user">
                                        <img src={`/assets/img/${currentUser.img}`} alt="User" className="user-menu-image" />
                                        <p>{currentUser.username}</p>
                                    </div>
                                )}
                                <p>{comment.text}</p>
                                <Button onClick={() => handleLike(commentIndex)}><LikeOutlined /> ({comment.likes})</Button>
                                <Button onClick={() => handleDislike(commentIndex)}> <DislikeOutlined /> ({comment.dislikes})</Button>
                                <div className="reply-input">
                                    <textarea
                                        placeholder="Reply to this comment"
                                        value={replyText}
                                        onChange={handleReplyChange}
                                    ></textarea>
                                    <button onClick={() => handleReplySubmit(commentIndex)}>Reply</button>
                                </div>
                                <div className="replies">
                                    {comment.replies.map((reply, replyIndex) => (
                                        <div className="reply" key={replyIndex}>
                                            {currentUser && (
                                                <div className="comment-user">
                                                    <img src={`/assets/img/${currentUser.img}`} alt="User" className="user-menu-image" />
                                                    <p>{currentUser.username}</p>
                                                </div>
                                            )}
                                            <p>{reply.text}</p>
                                            <Button onClick={() => handleReplyLike(commentIndex, replyIndex)}><LikeOutlined /> ({reply.likes})</Button>
                                            <Button onClick={() => handleReplyDislike(commentIndex, replyIndex)}> <DislikeOutlined /> ({reply.dislikes})</Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default GroupB;
