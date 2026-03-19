import React, { useState, useEffect } from "react";
import { formatTime } from "../../../lib/utils";
import { Icon } from "@iconify/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  fixImageUrl,
  getAvatarInitials,
  safeToString,
} from "../../../lib/image-utils";
import {
  formatMessageWithLinks,
  getFileType,
  formatFileSize,
} from "../../../lib/utils";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

// Utility function to safely get message content
const getSafeMessageContent = (message) => {
  if (!message) return "";

  // If message is an object, try to extract the message property
  if (typeof message === "object") {
    if (message.message) return safeToString(message.message);
    if (message.text) return safeToString(message.text);
    if (message.content) return safeToString(message.content);
    return safeToString(message);
  }

  return safeToString(message);
};

// Component to render different types of message content
const MessageContent = ({ message, files, setImageModal }) => {
  const hasText = message && message.trim().length > 0;
  const hasFiles = files && files.length > 0;

  return (
    <div className="space-y-2">
      {/* Text content with link detection */}
      {hasText && (
        <div className="whitespace-pre-wrap break-words">
          {formatMessageWithLinks(message).map((part) => {
            if (part.type === "link") {
              return (
                <a
                  key={part.key}
                  href={part.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-700 hover:text-blue-800 underline break-all"
                >
                  {part.content}
                </a>
              );
            }
            return part.content;
          })}
        </div>
      )}

      {/* Files/Attachments */}
      {hasFiles && (
        <div className="space-y-2">
          {/* Separate images from other files for better layout */}
          {(() => {
            const images = files.filter((file) => {
              const fileType = getFileType(file.name || file.filename);
              const isImage =
                fileType === "image" ||
                file.type === "image" ||
                file.type?.startsWith("image/");
              return (
                isImage && (file.link || file.url || file.path || file.src)
              );
            });

            const otherFiles = files.filter((file) => {
              const fileType = getFileType(file.name || file.filename);
              const isImage =
                fileType === "image" ||
                file.type === "image" ||
                file.type?.startsWith("image/");
              return (
                !isImage || !(file.link || file.url || file.path || file.src)
              );
            });

            return (
              <>
                {/* Images Grid */}
                {images.length > 0 && (
                  <div className="grid gap-2 grid-cols-1">
                    {images.map((file, index) => {
                      console.log("file", file.link);
                      const fileUrl =
                        file.link || file.url || file.path || file.src;
                      const fileName =
                        file.name || file.filename || "Unknown file";

                      return (
                        <div
                          key={`img-${index}`}
                          className="relative rounded-lg overflow-hidden bg-gray-100"
                        >
                          <div className="group w-100 h-70">
                            <img
                              src={fileUrl}
                              alt={fileName}
                              width={200}
                              height={150}
                              className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity w-full h-full"
                              onClick={() => window.open(fileUrl, "_blank")}
                            />
                            {/* Fallback for failed images */}
                            <div
                              className="hidden items-center justify-center h-32 bg-gray-200 text-gray-500"
                              style={{ display: "none" }}
                            >
                              <div className="text-center">
                                <Icon
                                  icon="tabler:photo-off"
                                  className="text-2xl mx-auto mb-2"
                                />
                                <p className="text-sm">Image failed to load</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {fileName}
                                </p>
                              </div>
                            </div>
                            {/* Hover overlay with zoom icon */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                className="h-6 w-6 p-0 bg-main text-white hover:bg-main/80 cursor-pointer"
                                onClick={() => window.open(fileUrl, "_blank")}
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Other Files */}
                {otherFiles.map((file, index) => {
                  const fileType = getFileType(file.name || file.filename);
                  const fileUrl =
                    file.link || file.url || file.path || file.src;
                  const fileName = file.name || file.filename || "Unknown file";
                  const fileSize = file.size ? formatFileSize(file.size) : "";

                  return (
                    <div
                      key={`file-${index}`}
                      className="border rounded-lg overflow-hidden"
                    >
                      {fileType === "video" && fileUrl ? (
                        // Video display
                        <video
                          controls
                          className="max-w-full max-h-64"
                          src={fileUrl}
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : fileType === "audio" && fileUrl ? (
                        // Audio display
                        <audio controls className="w-full" src={fileUrl}>
                          Your browser does not support the audio tag.
                        </audio>
                      ) : (
                        // File attachment display
                        <div className="p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <Icon
                                icon={
                                  fileType === "document"
                                    ? "tabler:file-text"
                                    : fileType === "image"
                                    ? "tabler:photo"
                                    : fileType === "video"
                                    ? "tabler:video"
                                    : fileType === "audio"
                                    ? "tabler:music"
                                    : "tabler:file"
                                }
                                className="text-2xl text-gray-500"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {fileName}
                              </p>
                              {fileSize && (
                                <p className="text-xs text-gray-500">
                                  {fileSize}
                                </p>
                              )}
                            </div>
                            {fileUrl && (
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0"
                              >
                                <Icon
                                  icon="tabler:download"
                                  className="text-lg text-blue-600 hover:text-blue-800"
                                />
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};

const Messages = ({
  message,
  onDelete,
  contact,
  profile,
  index,
  selectedChatId,
  handleReply,
  replayData,
  handleForward,
  handlePinMessage,
  pinnedMessages,
  isOwnMessage: isOwnMessageProp,
}) => {
  const user_data = JSON.parse(localStorage.getItem("yall_user_data"));
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [imageModal, setImageModal] = useState({
    isOpen: false,
    src: "",
    alt: "",
  });

  // Safety check: ensure message is a valid object
  if (!message || typeof message !== "object") {
    console.warn("Invalid message object:", message);
    return null;
  }

  const {
    id,
    message: chatMessage,
    user_id,
    created_at,
    updated_at,
    time,
    user,
    read_at, // Read status field
    files, // Legacy field for file attachments
    attachments, // New field from API response
  } = message;

  // Use acttachmets if available, otherwise fall back to files
  const messageAttachments = attachments || files || [];

  // Determine if message is from current user
  const isOwnMessage = isOwnMessageProp !== undefined 
    ? isOwnMessageProp 
    : String(user?.id) === String(user_data?.id);

  const messageTime = time || created_at || updated_at;
  const senderName = safeToString(user?.name || "Unknown");
  const senderAvatar = fixImageUrl(user?.avatar || user?.image);

  // Get safe message content
  const safeMessageContent = getSafeMessageContent(chatMessage);

  // Determine read status for own messages
  const isMessageRead = read_at !== null && read_at !== undefined;

  const handleDeleteClick = (messageId) => {
    setMessageToDelete(messageId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (messageToDelete) {
      onDelete(messageToDelete);
      setDeleteDialogOpen(false);
      setMessageToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setMessageToDelete(null);
  };

  // Handle ESC key for image modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && imageModal.isOpen) {
        setImageModal({ isOpen: false, src: "", alt: "" });
      }
    };

    if (imageModal.isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [imageModal.isOpen]);

  return (
    <>
      <div className="block md:px-6 px-0">
        {isOwnMessage ? (
          // OWN MESSAGE - Right side with main color
          <>
            <div className="flex space-x-2 items-start justify-end group w-full rtl:space-x-reverse mb-4">
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1">
                  <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <span className="w-7 h-7 rounded-full bg-main/20 hover:bg-main/30 flex items-center justify-center cursor-pointer transition-colors">
                          <Icon
                            icon="bi:three-dots-vertical"
                            className="text-lg text-main"
                          />
                        </span>
                      </DropdownMenuTrigger>
                    </DropdownMenu>
                  </div>
                  <div className="max-w-xs md:max-w-md lg:max-w-lg">
                    <div className="bg-main text-white text-sm py-2 px-3 rounded-lg">
                      <MessageContent
                        message={safeMessageContent}
                        files={messageAttachments}
                        setImageModal={setImageModal}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-end text-default-500">
                    {formatTime(messageTime)}
                  </span>
                  {/* Read status indicator for own messages */}
                  {isOwnMessage && (
                    <span className="text-xs text-default-400">
                      {isMessageRead ? "✓✓" : "✓"}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-none self-end -translate-y-5">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={senderAvatar} />
                  <AvatarFallback className="text-xs">
                    {getAvatarInitials(senderName)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </>
        ) : (
          // OTHER MESSAGE - Left side with gray color and actions
          <div className="flex space-x-2 items-start group rtl:space-x-reverse mb-4">
            <div className="flex-none self-end -translate-y-5">
              <Avatar className="h-10 w-10">
                <AvatarImage src={senderAvatar} />
                <AvatarFallback className="text-xs">
                  {getAvatarInitials(senderName)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <div className="max-w-xs md:max-w-md lg:max-w-lg">
                  <div className="bg-gray-100 text-gray-900 text-sm py-2 px-3 rounded-lg">
                    <MessageContent
                      message={safeMessageContent}
                      files={attachments}
                      setImageModal={setImageModal}
                    />
                  </div>
                </div>
              </div>
              <span className="text-xs text-default-500">
                {formatTime(messageTime)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white z-100">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleCancelDelete}
              className="text-white bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Image Modal */}
      {imageModal.isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setImageModal({ isOpen: false, src: "", alt: "" })}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setImageModal({ isOpen: false, src: "", alt: "" })}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <Icon icon="tabler:x" className="text-3xl" />
            </button>
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={imageModal.src}
                alt={imageModal.alt}
                className="max-w-full max-h-[80vh] object-contain"
                onClick={(e) => e.stopPropagation()}
                onError={(e) => {
                  console.error("Image failed to load:", imageModal.src);
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback for failed images in modal */}
              <div
                className="hidden items-center justify-center h-64 bg-gray-100 text-gray-500"
                style={{ display: "none" }}
              >
                <div className="text-center">
                  <Icon
                    icon="tabler:photo-off"
                    className="text-4xl mx-auto mb-4"
                  />
                  <p className="text-lg">Image failed to load</p>
                  <p className="text-sm text-gray-400 mt-2">{imageModal.alt}</p>
                </div>
              </div>
            </div>
            {imageModal.alt && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-lg">
                <p className="text-white text-sm">{imageModal.alt}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
