# Yalla Academy – Chat

**Live:** https://academy-chat.vercel.app

The chat front end for Yalla, an online Arabic-language academy. The project started as the academy's student website (session booking, calendar, profiles and student–teacher chat), and this deployment now serves the partner side: partners sign in with an access code and get all their conversations in one inbox.

## What it does

- Access-code login for partners, with the session kept in cookies and protected routes.
- Conversation list and message view that refresh in the background every 10 seconds (TanStack Query polling), so new messages and unread counts show up without reloading.
- File uploads in messages, and links in text turned into clickable links.
- Per-chat notes from the academy, shown in a dialog the first time a partner opens the chat.
- Responsive layout that works on phones, built from shadcn/ui components.

The `docs/` folder documents the API responses, the polling approach and the chat refactoring.

## Stack

React 18, Vite, Tailwind CSS, shadcn/ui (Radix UI), TanStack Query, Redux Toolkit, React Hook Form + Zod, Axios, Framer Motion.

## Running it locally

Requires Node 20.

```bash
npm install
npm run dev
```

The API base URL is read from `VITE_API_URL` in `.env`.
