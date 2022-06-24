import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Board from './Board';
const ENDPOINT = "https://frozen-island-70548.herokuapp.com:4001";

const App = () => {
    const [response, setResponse] = useState("");

    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
        setResponse(data);
    });
    socket.on('newNote', data => {
        console.log('!!!!!', data);
    });

    useEffect(() => {
        return () => socket.disconnect();
    }, []);

    const onBoardChange = notes => {
        socket.broadcast.emit('newNote', notes);
    };

    return (
        <div>
            It's <time dateTime={response}>{response}</time>
            <Board onBoardChange={onBoardChange}/>
        </div>
    );
};

export default App;