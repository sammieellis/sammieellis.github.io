import "./globals.css";

const title = "Samantha Ellis | Computational Materials Chemistry";
const description = "Research portfolio of Samantha Ellis, NSF Graduate Research Fellow and computational materials chemist.";

export const metadata = {
  metadataBase: new URL("https://samanthaellis.org"),
  title,
  description,
  // link previews in messages and social apps
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Samantha Ellis",
    title,
    description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Samantha Ellis, computational materials chemist, NSF Graduate Research Fellow" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,400..800,0..100,0..1&family=Figtree:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
