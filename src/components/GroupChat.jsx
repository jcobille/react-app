import { useState, useRef, useEffect } from "react";
import { formatTime } from "./misc/utils";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, submitMessage } from "../redux/chatsAction";
import { setCurrentUser } from '../redux/usersAction';
import { getUserId } from "./misc/cookie";

const socket = new WebSocket("ws://localhost:3001");

const GroupChat = () => {
    let divRef = useRef(null);
    const sendLabel = "Send";
    const refreshLabel = "Refresh";

    const userId = getUserId();
    const dispatch = useDispatch();
    const messagesData = useSelector((state) => state.chats);
    const newChat = useSelector((state) => state.chat);
    const [messages, setMessages] = useState([]);
    const [chat, setChat] = useState({
        userId: userId,
        message: ''
    });
    const user = useSelector((state) => state.currentUser);

    // loads when userId fetched
    useEffect(() => {
        dispatch(setCurrentUser(userId));
        dispatch(getMessages());
    }, [userId]);
    
    const reloadPage = () => {
        window.location.reload();
    }
    const scrollToBottom = () => {
        divRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const handleChanges = e => {
        setChat({ ...chat, message: e.target.value });
    };

    const handleSubmit = async () => {
        if (chat.message !== '') {
            dispatch(submitMessage(chat, socket));
            setChat({ ...chat, message: '' });
        }
        scrollToBottom();
    }

    const handleKeyEnter = e => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    // loads when new chat has been sent;
    useEffect(() => {
        if (newChat.message) {
            socket.send(JSON.stringify({ ...newChat }));
        }
    }, [newChat]);

    // loads when messages data changed
    useEffect(() => {
        setMessages(messagesData);
    }, [messagesData]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    // chat receiver
    socket.onmessage = (evt) => {
        if (typeof evt.data === 'string') {
            dispatch(getMessages());
        }
    }

    return (
        <>
            <section className="full-section">
                <div className="bordered-div">
                    <div className="div-header">
                        Group Chat
                        <button className="btn-float-end">&#x2715;</button>
                        <div className="div-message text-start p-2">
                            {messages.map((chat, key) => {
                                return <p className="m-0" key={key}>
                                    [{formatTime(chat.timestamp)}] {chat.user} : {chat.message}
                                </p>
                            })}
                            <div ref={divRef} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2 text-end">
                            {user.name}
                        </div>
                        <div className="col">
                            <input type="text" name="message"
                                className="bordered-input"
                                placeholder="I am good"
                                onChange={handleChanges}
                                onKeyDown={handleKeyEnter}
                                value={chat.message}
                                autoComplete="off"
                            />
                        </div>
                        <div className="col-3 text-start">
                            <button className="bordered-button btn-md" onClick={handleSubmit}>{sendLabel}</button>
                            <button className="bordered-button btn-md" onClick={reloadPage}>{refreshLabel}</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default GroupChat