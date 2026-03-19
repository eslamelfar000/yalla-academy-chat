import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { Annoyed, SendHorizontal, Loader2, Paperclip, X } from "lucide-react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getFileType, formatFileSize } from "../../../lib/utils";
import { validateFiles } from "../../../lib/file-upload";

const MessageFooter = ({
  handleSendMessage,
  replay,
  setReply,
  replayData,
  isLoading = false,
}) => {
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
    e.target.style.height = "auto"; // Reset the height to auto to adjust
    e.target.style.height = `${e.target.scrollHeight - 15}px`;
  };

  const handleSelectEmoji = (emoji) => {
    setMessage(message + emoji.native);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      // Validate files
      validateFiles(files);

      // Only allow one file
      if (files.length > 1) {
        alert("You can only upload one file at a time.");
        return;
      }

      setSelectedFiles([files[0]]); // Only keep the first file

      // Show preview for image
      const file = files[0];
      if (getFileType(file.name) === "image") {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => {
      const newFiles = prev.filter((_, i) => i !== index);
      if (newFiles.length === 0) {
        setFilePreview(null);
      }
      return newFiles;
    });
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && selectedFiles.length === 0) {
      alert("Please type a message or attach a file before sending.");
      return;
    }
    if (isLoading || isUploading) return;

    try {
      setIsUploading(true);
      let attachments = [];

      // Prepare attachments if any files are selected
      if (selectedFiles.length > 0) {
        attachments = selectedFiles.map((file) => ({
          file: file,
          type: file.type,
          name: file.name,
          size: file.size.toString(),
        }));
      }

      // Create message data with attachments
      const messageData = {
        chat_id: null, // This will be set by the parent component
        message: message.trim(), // Always require message
        attachments: attachments,
      };

      handleSendMessage(messageData);
      setReply(false);
      setMessage("");
      clearAllFiles();
    } catch (error) {
      alert(`Error preparing message: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {replay && (
        <div className=" w-full px-6 py-4 flex justify-between gap-4 items-center">
          <div>
            <div className="font-semibold text-base text-default-700 mb-1">
              Replying to {replayData?.contact?.fullName}
            </div>
            <div className="truncate">
              <span className="text-sm text-muted-foreground">
                {replayData?.message}
              </span>
            </div>
          </div>
          <span className="cursor-pointer " onClick={() => setReply(false)}>
            <Icon
              icon="heroicons:x-mark-20-solid"
              className="text-2xl text-default-900"
            />
          </span>
        </div>
      )}

      {/* File Preview */}
      {selectedFiles.length > 0 && (
        <div className="px-4 py-2 bg-gray-50 border-t w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Attached files ({selectedFiles.length})
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFiles}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Image Preview */}
          {/* {filePreview && (
            <div className="mb-2">
              <img
                src={filePreview}
                alt="Preview"
                className="max-h-32 max-w-full rounded-lg object-cover"
              />
            </div>
          )} */}

          {/* File List */}
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-2 rounded border"
              >
                <div className="flex items-center space-x-2">
                  <Icon
                    icon={
                      getFileType(file.name) === "image"
                        ? "tabler:photo"
                        : "tabler:file"
                    }
                    className="text-lg text-gray-500"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-6 w-6 p-0 ml-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className="w-full flex items-center gap-1 lg:gap-2 relative px-2 "
        style={{
          boxSizing: "border-box",
        }}
      >
        <div className="hidden lg:block">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Label htmlFor="attachment">
                  <span className="h-10 w-10 rounded-full hover:bg-main/10 flex justify-center items-center cursor-pointer">
                    <Paperclip className="w-5 h-5 text-main/80" />
                  </span>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    id="attachment"
                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.rtf"
                    onChange={handleFileSelect}
                  />
                </Label>
              </TooltipTrigger>
              <TooltipContent align="start" className="bg-main border-none">
                <p>Attach files</p>
                <TooltipArrow className="fill-main" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-1 relative">
              <textarea
                value={message}
                onChange={handleChange}
                placeholder={selectedFiles.length > 0 ? "Type your message... (optional)" : "Type your message... (required)"}
                className="bg-background border border-default-200 outline-none focus:border-main rounded-xl break-words pl-8 md:pl-3 px-3 flex-1 h-10 pt-2 p-1 pr-8 no-scrollbar"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                disabled={isLoading || isUploading}
                style={{
                  minHeight: "40px",
                  maxHeight: "120px",
                  overflowY: "auto",
                  resize: "none",
                }}
              />

              <Popover>
                <PopoverTrigger asChild>
                  <span className="absolute ltr:right-12 rtl:left-12 bottom-1.5 h-7 w-7 rounded-full cursor-pointer">
                    <Annoyed className="w-6 h-6 text-main" />
                  </span>
                </PopoverTrigger>
                <PopoverContent
                  side="top"
                  className="w-fit p-0 shadow-none border-none bottom-0 rtl:left-5 ltr:-left-[110px]"
                >
                  <Picker
                    data={data}
                    onEmojiSelect={handleSelectEmoji}
                    theme="light"
                  />
                </PopoverContent>
              </Popover>
              <Button
                type="submit"
                disabled={isLoading || isUploading || (!message.trim() && selectedFiles.length === 0)}
                className="rounded-full bg-main/20 hover:bg-main/30 h-[42px] w-[42px] p-0 self-end disabled:opacity-50"
              >
                {isLoading || isUploading ? (
                  <Loader2 className="w-5 h-5 text-main animate-spin" />
                ) : (
                  <SendHorizontal className="w-5 h-8 text-main rtl:rotate-180" />
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MessageFooter;
