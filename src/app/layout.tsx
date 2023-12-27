import { AppBar, CssBaseline, Toolbar } from "@mui/material";

import AccountMenu from "@/components/AccountMenu";
import Providers from "@/utils/Providers";


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
        <Providers>
          <CssBaseline />
          <AppBar position="relative">
            <Toolbar sx={{ justifyContent: "flex-end" }}>
              <AccountMenu />
            </Toolbar>
          </AppBar>
          {children}
        </Providers>
      </body>
    </html>
  );
}
