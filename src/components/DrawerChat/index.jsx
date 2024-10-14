import React from "react";
import { Drawer } from "antd";

const DrawerChat = ({ open, onClose }) => {
    return (
        <Drawer
            title="Basic Drawer"
            onClose={onClose}
            open={open}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    );
};

export default DrawerChat;
