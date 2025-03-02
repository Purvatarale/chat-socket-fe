import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './modules/landing';
import NotFoundPage from './modules/not-found';
import ChatPage from './modules/chat';
import { UserProvider } from "./context/user.context";

function App() {
  return (
    <UserProvider>
      <BrowserRouter basename='/b/chats' future={{ v7_startTransition: true, v_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/:chatId" element={<ChatPage/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;


// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import LandingPage from './modules/landing';
// import NotFoundPage from './modules/not-found';
// import ChatPage from './modules/chat';
// import { UserProvider } from "./context/user.context";
// import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       refetchOnMount: false,
//       retry: true,
//       cacheTime: 60 * 1000 * 15,
//       staleTime: 60 * 1000 * 5,
//     },
//   },
// });

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <UserProvider>
//       <BrowserRouter basename='/b/chats'>
//         <Routes>
//           <Route path="/" element={<LandingPage/>} />
//           <Route path="/:chatId" element={<ChatPage/>} />
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       </BrowserRouter>
//       </UserProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;
