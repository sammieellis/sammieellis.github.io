import "./globals.css";

export const metadata = {
  title: "Samantha Ellis | Computational Materials Chemistry",
  description: "Research portfolio of Samantha Ellis, NSF Graduate Research Fellow and computational materials chemist.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
