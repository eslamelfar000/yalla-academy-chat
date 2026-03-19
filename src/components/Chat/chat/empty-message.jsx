import { Icon } from "@iconify/react";

const EmptyMessage = ({ type = "messages" }) => {
  const getContent = () => {
    switch (type) {
      case "chats":
        return {
          icon: "gala:chat",
          title: "No chats yet",
          subtitle: "Start a conversation with your teachers or classmates",
        };
      case "messages":
      default:
        return {
          icon: "typcn:messages",
          title: "No messages",
          subtitle: "Don't worry, just take a deep breath & say 'Hello'",
        };
    }
  };

  const content = getContent();

  return (
    <div className="h-full px-6">
      <div className="text-center flex flex-col justify-center items-center opacity-50">
        <div className="mt-4 text-md flex flex-col justify-center items-center">
          <Icon icon={content.icon} className="text-2xl text-default-300" />
          <div className="mt-2">{content.title}</div>
        </div>
        <div className="mt-1 text-sm text-default-400">{content.subtitle}</div>
      </div>
    </div>
  );
};

export default EmptyMessage;
