# NoogleDocs

A collaborative document editing web application inspired by Google Docs. With NoogleDocs, users can create, edit, and collaborate on documents in real time with seamless sharing and commenting features.

---

## Features

- **Document Creation & Editing**: Create and edit documents with a rich text editor powered by React Lexical.
- **Real-Time Collaboration**: Collaborate on documents in real-time with Liveblocks integration.
- **User Authentication**: Secure user login and account management using Clerk.
- **Live Notifications & Commenting**: Stay updated with live notifications and leave comments directly on documents.
- **Responsive UI**: Built with Tailwind CSS for a modern, responsive design.

---

## Tech Stack

- **Frontend**: React, Next.js
- **Backend**: Liveblocks, Clerk
- **Styling**: Tailwind CSS
- **Editor**: React Lexical
- **Deployment**: Vercel

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shahin-r71/noogleDocs.git
   cd noogleDocs
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory with the following content:

   ```bash

    CLERK_SECRET_KEY=<your-clerk-secret-key>
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=<clerk-sign-in-url>
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=<clerk-sign-up-url>
    LIVEBLOCKS_SECRET=<your-liveblocks-secret-key>

   ```

4. Run database migrations:

   ```
   npm run dev

   ```

5. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

