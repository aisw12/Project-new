"use client"; // Important for React components in Next.js 13
import { Provider } from 'react-redux';
import store from '../redux/store';
import React, { useState, useEffect } from "react";
import Sidebar from "./page"; // Sidebar component
import "./globals.css"; // Global styles

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false); // State to control visibility of layout

  // Simulate a delay for the layout to appear (can be removed in production)
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true); // After the delay, show the sidebar and content
    }, 300); // Adjust delay (300ms is just an example)
  }, []);

  return (
    <>
      {/* Root HTML and Body tags */}
      <Provider store={store}>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>My App</title>
        </head>
        <body>
          {/* Layout structure */}
          <div className={`layout ${isVisible ? "show" : ""}`}>
            <Sidebar /> {/* Render sidebar in the layout only */}
            <div className="content">{children}</div> {/* Render page content here */}
          </div>
        </body>
      </html>
      </Provider>
    </>
  );
};

export default Layout;
