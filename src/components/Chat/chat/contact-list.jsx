import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn, formatTime } from "../../../lib/utils";
import { Icon } from "@iconify/react";
import { getAvatarInitials } from "@/lib/image-utils";

// Safety wrapper to ensure we never render objects
const SafeText = ({ children }) => {
  if (typeof children === "string") {
    return children;
  }
  if (typeof children === "object") {
    return JSON.stringify(children);
  }
  return String(children || "");
};

// Helper function to calculate unread count based on read_at field
const calculateUnreadCount = (contact, currentUserId) => {
  // If the API already provides unread_count, use it
  if (contact.unread_count !== undefined && contact.unread_count !== null) {
    return Number(contact.unread_count) || 0;
  }

  // If we have messages array, calculate based on read_at field
  if (contact.messages && Array.isArray(contact.messages)) {
    return contact.messages.filter(
      (message) =>
        message.read_at === null &&
        String(message.user?.id) !== String(currentUserId)
    ).length;
  }

  // Fallback to unreadmessage field
  if (contact.unreadmessage !== undefined && contact.unreadmessage !== null) {
    return Number(contact.unreadmessage) || 0;
  }

  return 0;
};

const ContactList = ({
  contact,
  openChat,
  selectedChatId,
  isLoading = false,
  currentUser: currentUserProp,
}) => {
  // Get current user data from prop or localStorage
  const currentUser = currentUserProp || JSON.parse(localStorage.getItem("yall_user_data") || "null");

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-3 border-l-2 border-transparent">
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
          <div className="h-2 w-2 rounded-full bg-muted absolute bottom-0 right-0 animate-pulse" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <div className="h-3 w-32 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex flex-col items-end gap-2 hidden lg:flex">
          <div className="h-3 w-12 bg-muted rounded animate-pulse" />
          <div className="h-3 w-3 rounded-full bg-muted animate-pulse" />
        </div>
      </div>
    );
  }

  // Safety check: ensure contact is a valid object
  if (!contact || typeof contact !== "object") {
    console.error("Invalid contact object:", contact);
    return null;
  }

  // Handle API data structure - adjust these fields based on your API response
  const {
    id,
    user_id,
    chat_id,
    name,
    full_name,
    image,
    profile_image,
    status,
    online_status,
    about,
    last_message,
    unread_count,
    unreadmessage,
    unread_messages_count,
    updated_at,
    created_at,
    date,
    participants,
    messages, // Array of messages for calculating unread count
    // Handle both possible field names
    lastMessage = last_message,
    fullName = full_name || name,
    avatarUrl = image || profile_image,
    statusType = status || online_status,
  } = contact;

  const chatId = id || user_id || chat_id;

  // Calculate unread count based on read_at field
  const unreadCount = unread_messages_count || calculateUnreadCount(contact, currentUser?.id);

  // Get read status for last message
  const getLastMessageReadStatus = () => {
    if (!lastMessage || typeof lastMessage !== "object") return null;

    const lastMessageReadAt = lastMessage.read_at;
    const isLastMessageFromCurrentUser =
      String(lastMessage.user?.id) === String(currentUser?.id);

    if (!isLastMessageFromCurrentUser) return null;

    if (lastMessageReadAt !== null && lastMessageReadAt !== undefined) {
      // Double check - blue for seen
      return <Icon icon="uil:check-double" className="text-sm text-blue-500" />;
    } else {
      // Single check - gray for sent but not seen
      return <Icon icon="uil:check" className="text-sm text-gray-400" />;
    }
  };

  // Extract last message content properly
  let lastMessageContent = "No messages yet";
  let lastMessageTime = updated_at || created_at || date;

  if (lastMessage) {
    if (typeof lastMessage === "string") {
      lastMessageContent = lastMessage;
    } else if (typeof lastMessage === "object" && lastMessage.message) {
      lastMessageContent = lastMessage.message;
      lastMessageTime =
        lastMessage.created_at || lastMessage.updated_at || lastMessageTime;
    } else if (typeof lastMessage === "object" && lastMessage.text) {
      lastMessageContent = lastMessage.text;
      lastMessageTime =
        lastMessage.created_at || lastMessage.updated_at || lastMessageTime;
    }
  }

  // Ensure all text fields are strings
  const safeFullName =
    typeof fullName === "string"
      ? fullName
      : String(fullName || "Unknown User");
  const safeLastMessage =
    typeof lastMessageContent === "string"
      ? lastMessageContent
      : String(lastMessageContent || "No messages yet");
  const safeAbout = typeof about === "string" ? about : String(about || "");

  return (
    <div
      className={cn(
        "gap-4 py-3 lg:py-4 px-4 border-l-2 border-transparent hover:bg-second cursor-pointer flex transition-colors duration-200",
        {
          "lg:border-main lg:bg-second": chatId === selectedChatId,
        }
      )}
      onClick={() => openChat(chatId)}
    >
      <div className="flex-1 flex gap-3">
        <div className="relative inline-block">
          <Avatar>
            <AvatarImage src={avatarUrl} alt={safeFullName} />
            <AvatarFallback className="uppercase">
              {getAvatarInitials(safeFullName)}
            </AvatarFallback>
          </Avatar>
          {/* <Badge
            className={cn(
              "h-3 w-3 p-0 ring-2 ring-white absolute right-0 bottom-0",
              {
                "bg-green-500": statusType === "online",
                "bg-gray-400": statusType !== "online",
              }
            )}
          /> */}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-default-900 truncate">
              <SafeText>{safeFullName}</SafeText>
            </span>
            <span className="text-xs text-gray-500 ml-2">
              <SafeText>{formatTime(lastMessageTime) || "Now"}</SafeText>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className={cn("text-sm text-gray-500 truncate flex-1", {
              "font-[600] text-black": unreadCount > 0,
            })}>
              <SafeText>
                {safeLastMessage || safeAbout || "No messages yet"}
              </SafeText>
            </span>
            <div className="flex items-center gap-2 ml-2">
              {unreadCount > 0 && (
                <span className="h-5 w-5 flex items-center justify-center bg-blue-500 rounded-full text-white text-xs font-medium">
                  <SafeText>{unreadCount}</SafeText>
                </span>
              )}
              {unreadCount === 0 &&
                lastMessageContent !== "No messages yet" &&
                getLastMessageReadStatus()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
