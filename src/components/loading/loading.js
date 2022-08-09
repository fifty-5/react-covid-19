import React from "react";

export default function Loading({ show = false }) {
  return (
    <>
      {show && (
        <div className="fixed w-full top-0 left-0 bottom-0 right-0 z-20 bg-gray-300">
          <div className="flex items-center justify-center space-x-2 animate-pulse m-28">
            <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
            <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
            <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      )}
    </>
  );
}
