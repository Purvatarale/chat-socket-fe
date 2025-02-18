import React, { useEffect, useState } from "react";
import GlobalLayout from "../global";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import request from "../../utils/request";
import { useUser } from "../../context/user.context";
import useIsMobile from "../../utils/use-device";
import { cn } from "../../utils";

const ChatLayout = ({ children, singleChat, flag }) => {
  const user = useUser();
  const isMobile = useIsMobile();
  
  return (
    <GlobalLayout>
      {!isMobile ? (
        <section className="w-screen h-screen border-2 border-red-100 overflow-hidden flex flex-col">
        <Navbar />
        <div className="flex flex-row gap-2 p-2 h-[90vh] max-h-[90vh] border-2 border-orange-100">
          <div className={cn(`basis-[30%] w-full h-[88vh] max-h-[88vh] overflow-y-scroll`)}>
            <Sidebar flag={flag} />
          </div>
          <div className={cn(`border-2 border-green-100 basis-[75%] w-full h-[88vh] max-h-[88vh] overflow-y-scroll`)}>
            {children}
          </div>
        </div>
      </section>
      ) : (
        <section className="w-screen h-screen border-2 border-red-100 overflow-hidden flex flex-col">
        <Navbar />

        <div className="flex flex-row gap-2 p-2 h-[90vh] max-h-[90vh] border-2 border-orange-100">
          {singleChat ? (
          <div className={cn(`border-2 border-green-100 basis-[100%] w-full h-[88vh] max-h-[88vh] overflow-y-scroll`)}>
            
            {children}
            </div>
          ) : (
          <div className={cn(`basis-[100%] w-full h-[88vh] max-h-[88vh] overflow-y-scroll`)}>
            <Sidebar />
            </div>
          )}
        </div>
      </section>
      )}
      
    </GlobalLayout>
  );
};

export default ChatLayout;
