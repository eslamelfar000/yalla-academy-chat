import React, { useCallback, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContactList from "./contact-list";
import { useState } from "react";
import Blank from "./blank";
import MessageHeader from "./message-header";
import MessageFooter from "./message-footer";
import Messages from "./messages";
import { getMessages } from "./chat-config";
import MyProfileHeader from "./my-profile-header";
import EmptyMessage from "./empty-message";
import PinnedMessages from "./pin-messages";
import ForwardMessage from "./forward-message";
import ContactInfo from "./contact-info";
import { useMediaQuery } from "../../../hooks/use-media-query";
import { cn } from "../../../lib/utils";

import { useChatData, useRealTimeChat } from "../../../hooks/useChatData";
import ChatListSkeleton from "./ChatListSkeleton";
import Loader from "./loader";
import { useQueryClient } from "@tanstack/react-query";

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showContactSidebar, setShowContactSidebar] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [messagePage, setMessagePage] = useState(1);

  const queryClient = useQueryClient();

  // API hooks
  const {
    conversations: chatsData,
    conversationsLoading: chatsLoading,
    conversationsError: chatsError,
    sendMessageMutation: createMessageMutation,
    deleteMessageMutation,
  } = useChatData();
  

  // Use the new real-time chat hook
  const {
    messagesData,
    messagesLoading,
    messagesError,
    markAsReadMutation,
    autoMarkAsRead,
  } = useRealTimeChat(selectedChatId);

  // Get current user data from localStorage
  const currentUser = JSON.parse(localStorage.getItem("yall_user_data") || "null");

  // Memoize getMessages using useCallback
  const getMessagesCallback = useCallback((chatId) => getMessages(chatId), []);

  // reply state
  const [replay, setReply] = useState(false);
  const [replayData, setReplyData] = useState({});

  // Ensure replayData is safe to pass
  const safeReplayData =
    replayData && typeof replayData === "object" ? replayData : {};

  // Ensure replayData.message is a string
  const safeReplayMessage =
    typeof safeReplayData.message === "string"
      ? safeReplayData.message
      : String(safeReplayData.message || "");

  // Ensure replayData.contact is safe
  const safeReplayContact =
    safeReplayData.contact && typeof safeReplayData.contact === "object"
      ? safeReplayData.contact
      : {};

  // search state
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const [pinnedMessages, setPinnedMessages] = useState([]);

  // Ensure pinnedMessages is always an array
  const safePinnedMessages = Array.isArray(pinnedMessages)
    ? pinnedMessages
    : [];
  // Forward State
  const [isForward, setIsForward] = useState(false);

  const onDelete = (messageId) => {
    deleteMessageMutation.mutate({ chatId: selectedChatId, messageId });
  };

  const openChat = (chatId) => {
    setSelectedChatId(chatId);
    setReply(false);
    setMessagePage(1); // Reset to first page when opening a new chat

    // Mark messages as read when opening a chat
    if (chatId) {
      markAsReadMutation.mutate(chatId);
    }

    if (showContactSidebar) {
      setShowContactSidebar(false);
    }
  };

  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };

  const handleSendMessage = (messageData) => {
    if (!selectedChatId) return;

    console.log("handleSendMessage called with:", messageData);

    // Handle both string messages and object messages with attachments
    let finalMessageData;

    if (typeof messageData === "string") {
      // Simple text message
      if (!messageData.trim()) return;
      finalMessageData = {
        chatId: selectedChatId,
        message: messageData,
        type: "text",
      };
    } else if (typeof messageData === "object") {
      // Message with attachments or structured data
      const { message, attachments } = messageData;

      console.log("Processing object message:", { message, attachments });

      // Require a message OR attachments
      if (!message?.trim() && (!attachments || attachments.length === 0)) return;

      finalMessageData = {
        chatId: selectedChatId,
        message: message?.trim() || "",
        type: "text",
        attachments: attachments || [], // Include attachments
      };
    } else {
      return;
    }

    console.log("Final message data being sent:", finalMessageData);
    createMessageMutation.mutate(finalMessageData);
  };

  const chatHeightRef = useRef(null);

  // replay message
  const handleReply = (data, contact) => {
    // Ensure data is a string
    const safeData = typeof data === "string" ? data : String(data || "");

    // Ensure contact is a safe object
    const safeContact = contact && typeof contact === "object" ? contact : {};

    const newObj = {
      message: safeData,
      contact: safeContact,
    };
    setReply(true);
    setReplyData(newObj);
  };

  useEffect(() => {
    if (chatHeightRef.current) {
      chatHeightRef.current.scrollTo({
        top: chatHeightRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messagesData, createMessageMutation.isSuccess]);

  // Auto-scroll to bottom when new message is sent successfully
  useEffect(() => {
    if (createMessageMutation.isSuccess && chatHeightRef.current) {
      setTimeout(() => {
        chatHeightRef.current.scrollTo({
          top: chatHeightRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100); // Small delay to ensure DOM is updated
    }
  }, [createMessageMutation.isSuccess]);

  const handleSetIsOpenSearch = () => {
    setIsOpenSearch(!isOpenSearch);
  };

  // handle pin note
  const handlePinMessage = (note) => {
    // Ensure note is a string
    const safeNote = typeof note === "string" ? note : String(note || "");

    const updatedPinnedMessages = [...safePinnedMessages];

    const existingIndex = updatedPinnedMessages.findIndex(
      (msg) => msg.note === safeNote
    );

    if (existingIndex !== -1) {
      updatedPinnedMessages.splice(existingIndex, 1);
    } else {
      updatedPinnedMessages.push({ note: safeNote, index: Date.now() });
    }

    setPinnedMessages(updatedPinnedMessages);
  };

  const handleUnpinMessage = (pinnedMessage) => {
    // Ensure pinnedMessage.note is a string
    const safeNote =
      typeof pinnedMessage?.note === "string"
        ? pinnedMessage.note
        : String(pinnedMessage?.note || "");

    const updatedPinnedMessages = [...safePinnedMessages];

    const index = updatedPinnedMessages.findIndex(
      (msg) => msg.note === safeNote
    );

    if (index !== -1) {
      updatedPinnedMessages.splice(index, 1);
      setPinnedMessages(updatedPinnedMessages);
    }
  };

  // Get current chat data
  const currentChat = chatsData?.data?.find(
    (chat) => chat.id === selectedChatId
  );

  // Forward handle
  const handleForward = () => {
    setIsForward(!isForward);
  };

  const isLg = useMediaQuery("(max-width: 1024px)");

  // Mark messages as read when messages are loaded and user is viewing the chat
  useEffect(() => {
    if (selectedChatId && messagesData?.data) {
      autoMarkAsRead();
    }
  }, [selectedChatId, messagesData, autoMarkAsRead]);

  return (
    <div className="flex gap-5 app-height h-full  relative rtl:space-x-reverse">
      {isLg && showContactSidebar && (
        <div
          className=" bg-background/60 backdrop-filter
         backdrop-blur-sm absolute w-full flex-1 inset-0 z-[99] rounded-md"
          onClick={() => setShowContactSidebar(false)}
        ></div>
      )}
      {isLg && showInfo && (
        <div
          className=" bg-background/60 backdrop-filter
         backdrop-blur-sm absolute w-full flex-1 inset-0 z-40 rounded-md"
          onClick={() => setShowInfo(false)}
        ></div>
      )}
      <div
        className={cn("w-90 transition-all duration-150  ", {
          "absolute h-full top-0 md:w-[260px] w-[200px] z-[999]": isLg,
          "left-0": isLg && showContactSidebar,
          "-left-full": isLg && !showContactSidebar,
        })}
      >
        <Card className="h-full p-0">
          <CardHeader className="border-none p-0 mb-0">
            <MyProfileHeader />
          </CardHeader>
          <CardContent className="pt-0 px-0   lg:h-[calc(100%-170px)] h-[calc(100%-70px)]   ">
            <ScrollArea className="h-full">
              {chatsLoading ? (
                <ChatListSkeleton count={5} />
              ) : chatsError ? (
                <div className="p-4 text-center">
                  <div className="text-red-500 mb-2">{chatsError.message}</div>
                  {chatsError.message.includes("login") && (
                    <Button
                      onClick={() => (window.location.href = "/login")}
                      className="bg-main text-primary-foreground hover:bg-main/90"
                    >
                      Go to Login
                    </Button>
                  )}
                </div>
              ) : chatsData?.data?.length === 0 ? (
                <div className="p-4">
                  <EmptyMessage type="chats" />
                </div>
              ) : (
                <>
                  {/* Real-time status indicator */}
                  {/* <div className="px-4 py-2 text-xs text-gray-500 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Real-time updates enabled</span>
                  </div> */}
                  {chatsData?.data?.map((contact) => (
                    <ContactList
                      key={contact.id}
                      contact={contact}
                      selectedChatId={selectedChatId}
                      openChat={openChat}
                      currentUser={currentUser}
                    />
                  ))}
                </>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      {/* chat sidebar  end*/}
      {/* chat messages start */}
      {selectedChatId ? (
        <div className="flex-1 ">
          <div className=" flex space-x-5 h-full rtl:space-x-reverse">
            <div className="flex-1">
              <Card className="h-full flex flex-col ">
                <CardHeader className="flex-none mb-0">
                  <MessageHeader
                    contact={currentChat}
                    showInfo={showInfo}
                    handleShowInfo={handleShowInfo}
                    mblChatHandler={() =>
                      setShowContactSidebar(!showContactSidebar)
                    }
                  />
                </CardHeader>

                <CardContent className=" !p-0 relative flex-1 overflow-y-auto overflow-x-hidden">
                  <div
                    className="h-full py-4 overflow-y-auto no-scrollbar relative"
                    ref={chatHeightRef}
                  >
                    {messagesLoading ? (
                      <Loader />
                    ) : messagesError ? (
                      <div className="p-4 text-center">
                        <div className="text-red-500 mb-2">
                          {messagesError.message}
                        </div>
                        {messagesError.message.includes("login") && (
                          <Button
                            onClick={() => (window.location.href = "/login")}
                            className="bg-main text-primary-foreground hover:bg-main/90"
                          >
                            Go to Login
                          </Button>
                        )}
                      </div>
                    ) : (
                      <>
                        {/* Real-time messages indicator */}
                        {/* {selectedChatId && (
                          <div className="px-4 py-1 text-xs text-gray-500 flex items-center gap-2 justify-center">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                            <span>Messages update automatically</span>
                          </div>
                        )} */}
                        {!messagesData?.data ||
                        messagesData.data.length === 0 ? (
                          <EmptyMessage />
                        ) : (
                          // Sort messages by time (oldest first, newest last)
                          messagesData.data
                            .sort((a, b) => {
                              const timeA = new Date(
                                a.created_at || a.time || a.updated_at
                              );
                              const timeB = new Date(
                                b.created_at || b.time || b.updated_at
                              );
                              return timeA - timeB; // Oldest first
                            })
                            .map((message, index) => {
                              // Safety check: ensure message is a valid object
                              if (!message || typeof message !== "object") {
                                console.error(
                                  "Invalid message object:",
                                  message
                                );
                                return null;
                              }

                              const isOwnMessage =
                                String(message.user?.id) ===
                                String(currentUser?.id);
                              const contactUser = currentChat || {};

                              // Ensure we have a valid key
                              const messageKey = message.id
                                ? String(message.id)
                                : `message-${index}`;

                              return (
                                <Messages
                                  key={messageKey}
                                  message={message}
                                  contact={contactUser}
                                  profile={currentUser}
                                  onDelete={onDelete}
                                  index={index}
                                  selectedChatId={selectedChatId}
                                  handleReply={handleReply}
                                  replayData={{
                                    message: safeReplayMessage,
                                    contact: safeReplayContact,
                                  }}
                                  handleForward={handleForward}
                                  handlePinMessage={handlePinMessage}
                                  pinnedMessages={safePinnedMessages}
                                  isOwnMessage={isOwnMessage}
                                />
                              );
                            })
                            .filter(Boolean) // Remove any null entries
                        )}
                      </>
                    )}
                    <PinnedMessages
                      pinnedMessages={safePinnedMessages}
                      handleUnpinMessage={handleUnpinMessage}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex-none flex-col px-0 py-4 border-t border-border">
                  {currentChat?.is_reservation_finished ? (
                    <div className="w-full text-sm text-center py-4 px-6 bg-muted/20 text-muted-foreground font-medium flex items-center justify-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-destructive" />
                      This conversation is closed because the reservation is finished.
                    </div>
                  ) : (
                    <MessageFooter
                      handleSendMessage={handleSendMessage}
                      replay={replay}
                      setReply={setReply}
                      replayData={replayData}
                      isLoading={createMessageMutation.isPending}
                    />
                  )}
                  {createMessageMutation.isError && (
                    <div className="px-4 py-2 text-red-500 text-sm">
                      Error sending message:{" "}
                      {createMessageMutation.error?.message}
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>

            {showInfo && (
              <ContactInfo
                handleSetIsOpenSearch={handleSetIsOpenSearch}
                handleShowInfo={handleShowInfo}
                contact={chatsData?.data?.find(
                  (contact) => contact.id === selectedChatId
                )}
                chatId={selectedChatId}
              />
            )}
          </div>
        </div>
      ) : (
        <Blank mblChatHandler={() => setShowContactSidebar(true)} />
      )}
      <ForwardMessage
        open={isForward}
        contact={"s"}
        setIsOpen={setIsForward}
        contacts={chatsData?.data || []}
      />
    </div>
  );
};

export default ChatPage;
