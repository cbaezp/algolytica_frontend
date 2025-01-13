// Terminal.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Terminal = () => {
    const [logs, setLogs] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const loadAsciiArt = async () => {
            try {
                const response = await fetch('/f.ascii'); // Ensure this file is in your public directory
                const asciiArt = await response.text();

                const messages = [
                    "Identity theft is not a joke, Jim",
                    asciiArt, // Render the ASCII art as-is
                ];

                let index = 0;
                const interval = setInterval(() => {
                    if (index < messages.length) {
                        setLogs((prevLogs) => [...prevLogs, messages[index]]);
                        index++;
                    } else {
                        clearInterval(interval);
                        setTimeout(() => {
                            router.push("/");
                        }, 6000);
                    }
                }, 600);

                return () => clearInterval(interval);
            } catch (error) {
                console.error("Failed to load ASCII art:", error);
            }
        };

        loadAsciiArt();
    }, [router]);

    return (
        <div className="fixed inset-0 bg-black text-green-400 font-mono text-sm p-4 overflow-auto">
            <pre className="whitespace-pre-wrap">
                {logs.map((log, index) => (
                    <div key={index}>
                        {index === 1 ? <pre>{log}</pre> : log}
                    </div>
                ))}
            </pre>
            <div className="animate-pulse">|</div>
        </div>
    );
};

export default Terminal;
