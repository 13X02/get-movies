import { Inter } from "next/font/google";
import "./globals.css";


export const metadata = {
  title: "Get Movies",
  description: "Get your Movies",
};

export default function RootLayout({
  children,
}){
  return (

    <html lang="en">

<head>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet"/>

  </head>
      <body>{children}</body>

    </html>

  );
}
