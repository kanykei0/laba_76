"use client";
import type { Metadata } from "next";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MessageForm from "@/components/MessageForm/MessageForm";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <html lang="en">
            <body
              style={{
                background:
                  "url('https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/Desktop.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <main style={{ height: "100vh", overflowY: "auto" }}>
                <Container maxWidth="xl">{children}</Container>
              </main>
            </body>
          </html>
        </QueryClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
