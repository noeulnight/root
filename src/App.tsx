import { ProfileHeader } from "./components/profile/ProfileHeader";
import { ProfileTabs } from "./components/profile/ProfileTabs";
import { AwardsPage } from "./pages/AwardsPage";
import { CertificationsPage } from "./pages/CertificationsPage";
import { HomePage } from "./pages/HomePage";
import { HomelabAppsPage } from "./pages/HomelabAppsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="max-w-2xl mx-auto p-10">
      <ProfileHeader />
      <ProfileTabs />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/projects"
            element={
              <PageTransition>
                <ProjectsPage />
              </PageTransition>
            }
          />
          <Route
            path="/awards"
            element={
              <PageTransition>
                <AwardsPage />
              </PageTransition>
            }
          />
          <Route
            path="/certifications"
            element={
              <PageTransition>
                <CertificationsPage />
              </PageTransition>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <PageTransition>
                <ProjectDetailPage />
              </PageTransition>
            }
          />
          <Route
            path="/homelab"
            element={
              <PageTransition>
                <HomelabAppsPage />
              </PageTransition>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
