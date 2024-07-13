import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import Explore from "./pages/Explore";
import Message from "./pages/Message";
import CreatePost from "./pages/CreatePost";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import FollowingList from "./components/FollowingList";
import ProfileGallery from "./components/ProfileGallery";
import EditProfile from "./pages/EditProfile";
import EditPost from "./pages/EditPost";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ExploreProvider } from "./Context/ExploreContext";
import NotFound from "./components/NotFound";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ExploreProvider>
                  <AppLayout />
                </ExploreProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="explore" element={<Explore />} />
            <Route path="message" element={<Message />} />
            <Route path="chat/:username" element={<Chat />} />
            <Route path="createpost" element={<CreatePost />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />}>
              <Route
                path="following"
                element={<FollowingList route="/chat" />}
              />
              <Route path="posts" element={<ProfileGallery />} />
              <Route path="editprofile" element={<EditProfile />} />
              <Route path="editpost/:postid" element={<EditPost />} />
              <Route index element={<Navigate replace to="posts" />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {/* <Navbar /> */}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
