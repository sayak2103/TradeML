import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function TradeWindow() {
    const [dateTime, setDateTime] = useState("");

    useEffect(() => {
        const socket = io("http://localhost:8080");

        socket.on("dateTime", (data) => {
            setDateTime(data.dateTime);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div>
            <h2>Real-time Data</h2>
            <p>Current Date & Time: {dateTime}</p>
            <h3>Submitted Data</h3>
        </div>
    );
}

export default TradeWindow;
