// Partner-specific chat data hooks.
// These are parallel to useChatData / useRealTimeChat but use partnerApi
// and read user identity from 'partner_user_data' in localStorage.

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { partnerApi } from '../config/partnerApi';
import { PARTNER_USER_KEY } from './usePartnerAuthToken';

// ─── Helper: get current partner user ────────────────────────────────────────
export const getPartnerUser = () => {
  try {
    return JSON.parse(localStorage.getItem(PARTNER_USER_KEY) || 'null');
  } catch {
    return null;
  }
};

// ─── API calls ────────────────────────────────────────────────────────────────
const fetchPartnerChats = async (page = 1) => {
  const res = await partnerApi.get(`/chat?page=${page}`);
  return res.data;
};

const fetchPartnerMessages = async (chatId, page = 1) => {
  const res = await partnerApi.get(`/chat_message?chat_id=${chatId}&page=${page}`);
  return res.data;
};

const postPartnerMessage = async (messageData) => {
  if (messageData.attachments && messageData.attachments.length > 0) {
    const formData = new FormData();
    formData.append('chat_id', messageData.chat_id);
    formData.append('message', messageData.message || '');
    formData.append('time', messageData.time || new Date().toISOString());
    const att = messageData.attachments[0];
    if (att.file) {
      formData.append('attach_type', att.type);
      formData.append('attach_name', att.name);
      formData.append('attach_size', att.size);
      formData.append('attachments', att.file);
    }
    const res = await partnerApi.post('/chat_message', formData, {
      headers: { 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
    });
    return res.data;
  }
  const res = await partnerApi.post('/chat_message', {
    ...messageData,
    time: messageData.time || new Date().toISOString(),
  });
  return res.data;
};

const deletePartnerMessage = async (messageId) => {
  const res = await partnerApi.delete(`/chat_message/${messageId}`);
  return res.data;
};

const markPartnerMessagesRead = async (chatId) => {
  const res = await partnerApi.post('/chat/mark-as-read', { chat_id: chatId });
  return res.data;
};

// ─── Main conversations + operations hook ────────────────────────────────────
export const usePartnerChatData = () => {
  const queryClient = useQueryClient();

  const {
    data: conversations,
    isLoading: conversationsLoading,
    error: conversationsError,
    refetch: refetchConversations,
  } = useQuery({
    queryKey: ['partner-chat-conversations'],
    queryFn: () => fetchPartnerChats(1),
    refetchInterval: 10_000,
    refetchIntervalInBackground: true,
    staleTime: 5_000,
  });

  const sendMessageMutation = useMutation({
    mutationFn: ({ chatId, message, attachments = [] }) =>
      postPartnerMessage({
        chat_id: chatId,
        message,
        time: new Date().toISOString(),
        attachments,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['partner-chat-messages', variables.chatId]);
      queryClient.invalidateQueries(['partner-chat-conversations']);
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: ({ messageId }) => deletePartnerMessage(messageId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['partner-chat-messages', variables.chatId]);
      queryClient.invalidateQueries(['partner-chat-conversations']);
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: (chatId) => markPartnerMessagesRead(chatId),
    onSuccess: (_, chatId) => {
      queryClient.invalidateQueries(['partner-chat-conversations']);
      queryClient.invalidateQueries(['partner-chat-messages', chatId]);
    },
  });

  return {
    conversations,
    conversationsLoading,
    conversationsError,
    refetchConversations,
    sendMessageMutation,
    deleteMessageMutation,
    markAsReadMutation,
  };
};

// ─── Real-time messages hook (per chat) ───────────────────────────────────────
export const usePartnerRealTimeChat = (chatId) => {
  const queryClient = useQueryClient();
  const currentUser = getPartnerUser();

  const {
    data: messagesData,
    isLoading: messagesLoading,
    error: messagesError,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ['partner-chat-messages', chatId],
    queryFn: () => fetchPartnerMessages(chatId, 1),
    enabled: !!chatId,
    refetchInterval: 10_000,
    refetchIntervalInBackground: true,
    staleTime: 5_000,
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id) => markPartnerMessagesRead(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(['partner-chat-conversations']);
      queryClient.invalidateQueries(['partner-chat-messages', id]);
    },
  });

  const autoMarkAsRead = () => {
    if (!chatId || !messagesData?.data?.length) return;
    const hasUnread = messagesData.data.some(
      (m) => m.read_at === null && String(m.user?.id) !== String(currentUser?.id)
    );
    if (hasUnread) markAsReadMutation.mutate(chatId);
  };

  return {
    messagesData,
    messagesLoading,
    messagesError,
    refetchMessages,
    markAsReadMutation,
    autoMarkAsRead,
  };
};
