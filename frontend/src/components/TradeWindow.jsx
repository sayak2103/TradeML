import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function TradeWindow() {
    const [data, setData] = useState([[]]);

    useEffect(() => {
        const socket = io("http://localhost:8080");

        socket.on("newData", (d) => {
            if(Array.isArray(d)){
                setData((prevData) => [...prevData , d])
            }
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div>
            <h2>Trading logs</h2>
            <pre>{JSON.stringify(data , null , 1)}</pre>
            <h3>Submitted Data</h3>
        </div>
    );
}

export default TradeWindow;
