"use client"; // Important for React components in Next.js 13

import React, { useState } from "react";
import Link from "next/link"; // Import Next.js Link for navigation
import styles from "./page.module.css"; // Import CSS module for styling

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // State to control collapse/expand
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // State for submenu visibility

  // Define the menu structure with corresponding paths for main and submenu items
  const menuItems = [
    {
      name: "Home",
      icon: "🏠",
      path: "/home",
      subItems: [
        { name: "Orders", path: "/Home/Sub1" },
        { name: "Calender", path: "/Home/sub2" },
      ],
    },
    {
      name: "User",
      icon: "👤",
      path: "/user",
      subItems: [
        { name: "Profile", path: "/user/profile" },
        { name: "Settings", path: "/user/settings" },
      ],
    },
    { name: "Settings", icon: "⚙️", path: "/settings" },
    { name: "Logout", icon: "🚪", path: "/logout" },
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Handle submenu item clicks - this can be used for additional actions or logging
  const handleSubItemClick = (subItem: string) => {
    console.log(`Clicked on ${subItem}`);
    // Add your custom logic here (e.g., tracking, etc.)
  };

  return (
    <div className={`${styles.wrapper}`}>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
        <div className={styles.toggleButton} onClick={toggleSidebar}>
          {isCollapsed ? "➡️" : "⬅️"}
        </div>

        <ul className={styles.menu}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={styles.menuItem}
              onMouseEnter={() => setActiveMenu(item.name)} // Show subitems when hovering over menu item
              onMouseLeave={() => setActiveMenu(null)} // Hide subitems when hovering out
            >
              <div className={styles.icon}>{item.icon}</div>
              {/* Main link */}
              <Link href={item.path} className={`${styles.menuLink} ${isCollapsed ? styles.collapsedLink : ""}`}>
                {!isCollapsed && <span className={styles.menuText}>{item.name}</span>}
              </Link>

              {/* Submenu outside the expanded sidebar */}
              {activeMenu === item.name && item.subItems && (
                <div className={styles.submenu}>
                  {item.subItems.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.path} // Use the submenu item path for navigation
                      className={styles.subMenuItem}
                      onClick={() => handleSubItemClick(subItem.name)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
