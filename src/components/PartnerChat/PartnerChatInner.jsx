/**
 * PartnerChatInner
 * A full standalone chat page for the Partner section.
 * - Uses partner-specific hooks (usePartnerChatData, usePartnerRealTimeChat)
 * - Reads current user from 'partner_user_data' (not 'yall_user_data')
 * - Shares UI sub-components (Messages, MessageFooter, etc.) from the student chat
 *   but drives them with independent data and auth.
 */
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Card, CardContent, CardFooter, CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { getAvatarInitials } from "@/lib/image-utils";
import { useQueryClient } from "@tanstack/react-query";

// Shared UI components from the student chat (display-only, no auth dependency)
import ContactList from "@/components/Chat/chat/contact-list";
import MessageHeader from "@/components/Chat/chat/message-header";
import MessageFooter from "@/components/Chat/chat/message-footer";
import Messages from "@/components/Chat/chat/messages";
import EmptyMessage from "@/components/Chat/chat/empty-message";
import PinnedMessages from "@/components/Chat/chat/pin-messages";
import ForwardMessage from "@/components/Chat/chat/forward-message";
import ContactInfo from "@/components/Chat/chat/contact-info";
import ChatListSkeleton from "@/components/Chat/chat/ChatListSkeleton";
import Loader from "@/components/Chat/chat/loader";
import Blank from "@/components/Chat/chat/blank";

// Partner-specific hooks & utils
import {
  usePartnerChatData,
  usePartnerRealTimeChat,
  getPartnerUser,
} from "@/hooks/usePartnerChatData";

// ─── Partner profile header (reads partner_user_data) ─────────────────────────
const PartnerProfileHeader = () => {
  const user = getPartnerUser();  
  return (
    <div className="flex gap-3 border-b border-default-200 p-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={user?.user?.image} alt={user?.user?.name} />
        <AvatarFallback className="uppercase">
          {getAvatarInitials(user?.user?.name || "PT")}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center">
        <div className="text-sm font-medium text-default-900">
          <span className="relative before:h-1.5 before:w-1.5 before:rounded-full before:bg-success before:absolute before:top-1.5 before:-right-3">
            {user?.user?.name || "Partner"}
          </span>
        </div>
        <span className="text-xs text-default-600">
          {"Student"}
        </span>
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const PartnerChatInner = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showContactSidebar, setShowContactSidebar] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [replay, setReply] = useState(false);
  const [replayData, setReplyData] = useState({});
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const [isForward, setIsForward] = useState(false);

  const queryClient = useQueryClient();
  const chatHeightRef = useRef(null);

  // ── Partner-isolated hooks ──────────────────────────────────────────────────
  const {
    conversations: chatsData,
    conversationsLoading: chatsLoading,
    conversationsError: chatsError,
    sendMessageMutation: createMessageMutation,
    deleteMessageMutation,
    markAsReadMutation: listMarkAsRead,
  } = usePartnerChatData();

  const {
    messagesData,
    messagesLoading,
    messagesError,
    markAsReadMutation,
    autoMarkAsRead,
  } = usePartnerRealTimeChat(selectedChatId);

  // ── Current partner user ────────────────────────────────────────────────────
  const currentUser = getPartnerUser();

  // ── Safe replay data ────────────────────────────────────────────────────────
  const safeReplayData = replayData && typeof replayData === "object" ? replayData : {};
  const safeReplayMessage =
    typeof safeReplayData.message === "string"
      ? safeReplayData.message
      : String(safeReplayData.message || "");
  const safeReplayContact =
    safeReplayData.contact && typeof safeReplayData.contact === "object"
      ? safeReplayData.contact : {};
  const safePinnedMessages = Array.isArray(pinnedMessages) ? pinnedMessages : [];

  // ── Current chat ────────────────────────────────────────────────────────────
  const currentChat = chatsData?.data?.find((c) => c.id === selectedChatId);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const openChat = (chatId) => {
    setSelectedChatId(chatId);
    setReply(false);
    if (chatId) markAsReadMutation.mutate(chatId);
    if (showContactSidebar) setShowContactSidebar(false);
  };

  const handleSendMessage = (messageData) => {
    if (!selectedChatId) return;
    let finalMessageData;
    if (typeof messageData === "string") {
      if (!messageData.trim()) return;
      finalMessageData = { chatId: selectedChatId, message: messageData, type: "text" };
    } else if (typeof messageData === "object") {
      const { message, attachments } = messageData;
      if (!message?.trim() && (!attachments || attachments.length === 0)) return;
      finalMessageData = {
        chatId: selectedChatId,
        message: message?.trim() || "",
        type: "text",
        attachments: attachments || [],
      };
    } else return;
    createMessageMutation.mutate(finalMessageData);
  };

  const handleReply = (data, contact) => {
    setReply(true);
    setReplyData({
      message: typeof data === "string" ? data : String(data || ""),
      contact: contact && typeof contact === "object" ? contact : {},
    });
  };

  const handlePinMessage = (note) => {
    const safeNote = typeof note === "string" ? note : String(note || "");
    const updated = [...safePinnedMessages];
    const idx = updated.findIndex((m) => m.note === safeNote);
    if (idx !== -1) updated.splice(idx, 1);
    else updated.push({ note: safeNote, index: Date.now() });
    setPinnedMessages(updated);
  };

  const handleUnpinMessage = (pinnedMessage) => {
    const safeNote =
      typeof pinnedMessage?.note === "string"
        ? pinnedMessage.note : String(pinnedMessage?.note || "");
    const updated = [...safePinnedMessages];
    const idx = updated.findIndex((m) => m.note === safeNote);
    if (idx !== -1) { updated.splice(idx, 1); setPinnedMessages(updated); }
  };

  const onDelete = (messageId) => {
    deleteMessageMutation.mutate({ chatId: selectedChatId, messageId });
  };

  // ── Auto-scroll ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (chatHeightRef.current) {
      chatHeightRef.current.scrollTo({ top: chatHeightRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messagesData, createMessageMutation.isSuccess]);

  useEffect(() => {
    if (createMessageMutation.isSuccess && chatHeightRef.current) {
      setTimeout(() => {
        chatHeightRef.current?.scrollTo({ top: chatHeightRef.current.scrollHeight, behavior: "smooth" });
      }, 100);
    }
  }, [createMessageMutation.isSuccess]);

  // ── Auto mark-as-read ───────────────────────────────────────────────────────
  useEffect(() => {
    if (selectedChatId && messagesData?.data) autoMarkAsRead();
  }, [selectedChatId, messagesData]);

  const isLg = useMediaQuery("(max-width: 1024px)");

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex gap-5 app-height h-full relative rtl:space-x-reverse">
      {/* Mobile overlays */}
      {isLg && showContactSidebar && (
        <div
          className="bg-background/60 backdrop-filter backdrop-blur-sm absolute w-full flex-1 inset-0 z-[99] rounded-md"
          onClick={() => setShowContactSidebar(false)}
        />
      )}
      {isLg && showInfo && (
        <div
          className="bg-background/60 backdrop-filter backdrop-blur-sm absolute w-full flex-1 inset-0 z-40 rounded-md"
          onClick={() => setShowInfo(false)}
        />
      )}

      {/* ── Contact sidebar ─────────────────────────────────────────────────── */}
      <div
        className={cn("w-90 transition-all duration-150", {
          "absolute h-full top-0 md:w-[260px] w-[200px] z-[999]": isLg,
          "left-0": isLg && showContactSidebar,
          "-left-full": isLg && !showContactSidebar,
        })}
      >
        <Card className="h-full p-0">
          <CardHeader className="border-none p-0 mb-0">
            <PartnerProfileHeader />
          </CardHeader>
          <CardContent className="pt-0 px-0 lg:h-[calc(100%-170px)] h-[calc(100%-70px)]">
            <ScrollArea className="h-full">
              {chatsLoading ? (
                <ChatListSkeleton count={5} />
              ) : chatsError ? (
                <div className="p-4 text-center">
                  <div className="text-red-500 mb-2">{chatsError.message}</div>
                  {chatsError.message?.includes("login") && (
                    <Button
                      onClick={() => (window.location.href = "/partner-login")}
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
                chatsData?.data?.map((contact) => (
                  <ContactList
                    key={contact.id}
                    contact={contact}
                    selectedChatId={selectedChatId}
                    openChat={openChat}
                    currentUser={currentUser}
                  />
                ))
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* ── Messages area ───────────────────────────────────────────────────── */}
      {selectedChatId ? (
        <div className="flex-1">
          <div className="flex space-x-5 h-full rtl:space-x-reverse">
            <div className="flex-1">
              <Card className="h-full flex flex-col">
                <CardHeader className="flex-none mb-0">
                  <MessageHeader
                    contact={currentChat}
                    showInfo={showInfo}
                    handleShowInfo={() => setShowInfo(!showInfo)}
                    mblChatHandler={() => setShowContactSidebar(!showContactSidebar)}
                  />
                </CardHeader>

                <CardContent className="!p-0 relative flex-1 overflow-y-auto overflow-x-hidden">
                  <div
                    className="h-full py-4 overflow-y-auto no-scrollbar relative"
                    ref={chatHeightRef}
                  >
                    {messagesLoading ? (
                      <Loader />
                    ) : messagesError ? (
                      <div className="p-4 text-center">
                        <div className="text-red-500 mb-2">{messagesError.message}</div>
                        {messagesError.message?.includes("login") && (
                          <Button
                            onClick={() => (window.location.href = "/chat-login")}
                            className="bg-main text-primary-foreground hover:bg-main/90"
                          >
                            Go to Login
                          </Button>
                        )}
                      </div>
                    ) : !messagesData?.data || messagesData.data.length === 0 ? (
                      <EmptyMessage />
                    ) : (
                      messagesData.data
                        .slice()
                        .sort((a, b) => {
                          const tA = new Date(a.created_at || a.time || a.updated_at);
                          const tB = new Date(b.created_at || b.time || b.updated_at);
                          return tA - tB;
                        })
                        .map((message, index) => {
                          if (!message || typeof message !== "object") return null;
                          const isOwnMessage =
                            String(message.user?.id) === String(currentUser?.id);
                          const messageKey = message.id
                            ? String(message.id)
                            : `msg-${index}`;
                          return (
                            <Messages
                              key={messageKey}
                              message={message}
                              contact={currentChat || {}}
                              profile={currentUser}
                              onDelete={onDelete}
                              index={index}
                              selectedChatId={selectedChatId}
                              handleReply={handleReply}
                              replayData={{ message: safeReplayMessage, contact: safeReplayContact }}
                              handleForward={() => setIsForward(!isForward)}
                              handlePinMessage={handlePinMessage}
                              pinnedMessages={safePinnedMessages}
                              isOwnMessage={isOwnMessage}
                            />
                          );
                        })
                        .filter(Boolean)
                    )}
                    <PinnedMessages
                      pinnedMessages={safePinnedMessages}
                      handleUnpinMessage={handleUnpinMessage}
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex-none flex-col px-0 py-6 border-t border-border !opacity-100">
                  <MessageFooter
                    handleSendMessage={handleSendMessage}
                    replay={replay}
                    setReply={setReply}
                    replayData={replayData}
                    isLoading={createMessageMutation.isPending}
                  />
                  {createMessageMutation.isError && (
                    <div className="px-4 py-2 text-red-500 text-sm">
                      Error: {createMessageMutation.error?.message}
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>

            {showInfo && (
              <ContactInfo
                handleSetIsOpenSearch={() => setIsOpenSearch(!isOpenSearch)}
                handleShowInfo={() => setShowInfo(!showInfo)}
                contact={chatsData?.data?.find((c) => c.id === selectedChatId)}
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
        contact="s"
        setIsOpen={setIsForward}
        contacts={chatsData?.data || []}
      />
    </div>
  );
};

export default PartnerChatInner;
