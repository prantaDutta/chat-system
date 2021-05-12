This is a [Next.js](https://nextjs.org/) chat app create by me, [Pranta Dutta](https://github.com/prantaDutta)

> We are using Prisma with this project to save our messages.

## Features

- User Authentication (Login, Signup and Logout)
- Prisma Connection and Usage
- Chat Room System where two or multiple users can chat with one other

## Stacks

- [NextJS](https://nextjs.org)
- [ReactJS](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [SWR](https://swr.vercel.app) (not necessary, but I use it so that I don't have to use useEffect)
- [Prisma](https://prisma.io)
- [Postgresql](https://www.postgresql.org/)

## Getting Started

- Copy and Paste the following command to install this repo

```bash
    npx create-next-app chat-system -e https://github.com/prantaDutta/chat-system
```

- After installtion, Create an env file with the following command

```bash
    touch .env
```

- Then open the file and Provide the following Data in the file

```
    DATABASE_URL="postgresql://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/DB_NAME?schema=public"
    SECRET_COOKIE_PASSWORD="complex_password_at_least_32_characters_long"
```

Edit these values with your database credentials and also set a cookie password for authentication that is 32 characters long

- Then migrate your database with the following command

```
    yarn migrate
```

Give it a name if it asks and press enter

- That's it. Now open the development server with the following command

```bash
    yarn dev
```

## ScreenShots

![ScreenShot](./public/ScreenShot.png)

> Thank You.
> For any Query, email me at prantadutta1997@gmail.com
