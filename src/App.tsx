import { Container } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import CreateNotePage from './pages/CreateNotePage';
import EditNotePage from './pages/EditNotePage';
import NoteListPage from './pages/NoteListPage';
import NotePage from './pages/NotePage';

function App() {
  return (
    <Container maxWidth={'xl'}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<NoteListPage />} />
          <Route path="/create-note" element={<CreateNotePage />} />
          <Route path="/:id">
            <Route index element={<NotePage />} />
            <Route path="/:id/edit" element={<EditNotePage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}
export default App;
