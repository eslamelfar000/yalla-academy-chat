import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "../../../lib/utils";
import { Icon } from "@iconify/react";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Menu } from "lucide-react";
import { useMediaQuery } from "../../../hooks/use-media-query";
import {
  fixImageUrl,
  getAvatarInitials,
  safeToString,
} from "../../../lib/image-utils";

const MessageHeader = ({
  contact,
  showInfo,
  handleShowInfo,
  profile,
  mblChatHandler,
}) => {
  const isLg = useMediaQuery("(max-width: 1024px)");
  const user_data = JSON.parse(localStorage.getItem("yall_user_data"));

  // Safety check: ensure contact is a valid object
  if (!contact || typeof contact !== "object") {
    console.warn("Invalid contact object in MessageHeader:", contact);
    return null;
  }

  // Handle different data structures from API
  const {
    id,
    chat_id,
    user_id,
    name,
    fullName,
    role,
    avatar,
    image,
    status = "offline",
    about,
    bio,
    last_message,
    lastMessage,
    unread_count,
    unreadmessage,
    unseenMsgs,
    updated_at,
    created_at,
    date,
  } = contact;

  // Use the appropriate fields based on what's available
  const userName = safeToString(name || fullName || role || "Unknown User");
  const userAvatar = fixImageUrl(avatar?.src || image || avatar);

  const isActive = status === "online";

  return (
    <div className="flex items-center border-default-200">
      <div className="flex flex-1 gap-3 items-center">
        {isLg && (
          <Menu
            className=" h-5 w-5 cursor-pointer text-default-600"
            onClick={mblChatHandler} // Mobile menu handler
          />
        )}
        <div className="relative inline-block">
          <Avatar>
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="uppercase">
              {getAvatarInitials(userName)}
            </AvatarFallback>
          </Avatar>
          {/* <Badge
            className=" h-3 w-3  p-0 ring-1 ring-border ring-offset-[1px]   items-center justify-center absolute left-[calc(100%-12px)] top-[calc(100%-12px)]"
            color={isActive ? "success" : "secondary"}
          ></Badge> */}
        </div>
        <div className="hidden lg:block">
          <div className="text-sm font-medium text-default-900 flex items-center gap-2">
            <span className="relative">{userName}</span>
            {contact?.is_reservation_finished && (
              <Badge variant="soft" color="destructive" className="h-4 px-1.5 text-[10px] capitalize">
                Finished
              </Badge>
            )}
          </div>
          <span className="text-xs text-default-500">
            {isActive ? "Active Now" : "Offline"}
          </span>
        </div>
      </div>
      <div className="">
        {/* Contact Info */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                className={cn("bg-transparent hover:bg-main/10 rounded-full", {
                  "text-main": !showInfo,
                })}
                onClick={handleShowInfo}
              >
                <span className="text-xl text-main ">
                  {showInfo ? (
                    <Icon icon="material-symbols:info" />
                  ) : (
                    <Icon icon="material-symbols:info-outline" />
                  )}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="end"
              className="bg-main border-none"
            >
              <p>Conversation information</p>
              <TooltipArrow className="fill-main" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default MessageHeader;
