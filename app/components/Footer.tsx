import React from "react";

const Footer = () => {
    return (
        <div className="px-4 flex justify-between items-center py-2 bg-gray-800 text-white text-xs ">
            Final Fareway &copy;
            {new Date().getFullYear()}
        </div>
    );
};

export default Footer;
