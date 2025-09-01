"use client";
import React, { useState } from "react";
import { mockData } from "../../mockdata/mockData";
import type { FileItem } from "../../mockdata/mockData";

const Drive: React.FC = () => {
    const [currentFolder, setCurrentFolder] = useState<FileItem | null>(null);
    const [history, setHistory] = useState<FileItem[]>([]);

    // получаем список элементов для отображения
    const items = currentFolder ? currentFolder.children || [] : mockData;

    const openFolder = (folder: FileItem) => {
        setHistory((prev) => [...prev, folder]); // добавляем в историю
        setCurrentFolder(folder);
    };

    const goBack = () => {
        const newHistory = [...history];
        newHistory.pop(); // убираем последний шаг
        setHistory(newHistory);
        setCurrentFolder(newHistory[newHistory.length - 1] || null);
    };

    return (
        <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "sans-serif" }}>
            <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>My Drive</h1>

            {currentFolder && (
                <button
                    onClick={goBack}
                    style={{
                        marginBottom: "15px",
                        padding: "5px 10px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        cursor: "pointer",
                    }}
                >
                    ⬅ Back
                </button>
            )}

            <ul style={{ listStyle: "none", padding: 0 }}>
                {items.map((item) => (
                    <li
                        key={item.id}
                        style={{
                            margin: "8px 0",
                            padding: "8px 12px",
                            border: "1px solid #eee",
                            borderRadius: "8px",
                            cursor: item.type === "folder" ? "pointer" : "default",
                            background: "#fafafa",
                            transition: "background 0.2s",
                        }}
                        onClick={() => item.type === "folder" && openFolder(item)}
                    >
                        {item.type === "folder" ? (
                            <span>📁 {item.name}</span>
                        ) : (
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none", color: "#333" }}
                            >
                                📄 {item.name}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Drive;
