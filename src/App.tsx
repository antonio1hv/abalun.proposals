import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/hooks/use-auth";
import { ErrorBoundary } from "@/components/error-boundary";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ProposalView from "./pages/ProposalView";
import NewProposal from "./pages/NewProposal";
import EditProposal from "./pages/EditProposal";
import Settings from "./pages/Settings";
import Companies from "./pages/Companies";
import NotFound from "./pages/NotFound";
import TestPage from '@/pages/test';
import AuthCallback from './pages/auth/callback';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // or a loading spinner
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth/callback" element={<AuthCallback />} />

              {/* Protected routes */}
              <Route path="/companies" element={
                <ProtectedRoute>
                  <Companies />
                </ProtectedRoute>
              } />
              <Route path="/proposal/:id" element={
                <ProtectedRoute>
                  <ProposalView />
                </ProtectedRoute>
              } />
              <Route path="/proposal/new" element={
                <ProtectedRoute>
                  <NewProposal />
                </ProtectedRoute>
              } />
              <Route path="/proposal/:id/edit" element={
                <ProtectedRoute>
                  <EditProposal />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/test" element={
                <ProtectedRoute>
                  <TestPage />
                </ProtectedRoute>
              } />

              {/* Catch all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;