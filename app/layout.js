import "./globals.css";

export const metadata = {
  title: "SalesOps",
  description: "Painel comercial SalesOps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
