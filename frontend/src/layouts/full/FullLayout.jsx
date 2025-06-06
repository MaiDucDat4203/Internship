// src/layouts/FullLayout.jsx
import React, { useState, useEffect, Suspense } from "react";
import { styled, Container, Box, Typography, useTheme } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: theme.palette.background.default,
  width: "100%",
  overflow: "hidden",
}));

const ContentBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: "calc(100vh - 64px)",
  width: "100%",
  backgroundColor: theme.palette.background.paper,
}));

const FullLayout = () => {
  const { user, logout } = useUser();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();

  return (
    <MainWrapper className="mainwrapper">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
        userRole={user.role} // Truyền role để hiển thị menu phù hợp
      />

      {/* Main Wrapper */}
      <PageWrapper className="page-wrapper">
        {/* Header */}
        <Header
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
          user={user}
          logout={logout}
        />

        {/* PageContent */}
        <ContentBox>
          <Container
            sx={{
              paddingTop: "20px",
              paddingBottom: "20px",
              maxWidth: "1200px",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Suspense fallback={<div>Đang tải trang...</div>}>
                <Outlet />
              </Suspense>
            </Box>
          </Container>

          {/* Footer */}
          <Box
            sx={{
              pt: 3,
              pb: 3,
              display: "flex",
              justifyContent: "center",
              width: "100%",
              borderTop: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © 2025 LD Technogry Company
            </Typography>
          </Box>
        </ContentBox>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;