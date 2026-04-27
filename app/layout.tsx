export const metadata = {
  title: 'Kikopey Map',
  description: 'Prototype land aggregation platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
