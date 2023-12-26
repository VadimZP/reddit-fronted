import AccountMenu from "@/components/AccountMenu";
import { AppBar, Box, CssBaseline, Toolbar } from "@mui/material";

export const metadata = {
  title: "Reddit",
  description: "Post anything",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <AccountMenu />
          </Toolbar>
        </AppBar>
        {children}
      </body>
    </html>
  );
}
