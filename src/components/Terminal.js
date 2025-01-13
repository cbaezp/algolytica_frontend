// Terminal.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const generateRandomCharacters = (lines = 12, charsPerLine = 80) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    const randomLines = [];

    for (let i = 0; i < lines; i++) {
        let line = "";
        for (let j = 0; j < charsPerLine; j++) {
            line += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        randomLines.push(line);
    }

    return randomLines;
};

const Terminal = () => {
    const [logs, setLogs] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const loadMessages = () => {
            const randomLines = generateRandomCharacters();

            const messages = [
                "Identity theft is not a joke, Jim",
                "Redirecting to",
                ...randomLines,
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
            }, 200);

            return () => clearInterval(interval);
        };

        loadMessages();
    }, [router]);

    return (
        <div className="fixed inset-0 bg-black text-green-400 font-mono text-sm p-4 overflow-auto">
            <pre className="whitespace-pre-wrap">
                {logs.map((log, index) => (
                    <div key={index}>{log}</div>
                ))}
            </pre>
            <div className="animate-pulse">|</div>
        </div>
    );
};

export default Terminal;
