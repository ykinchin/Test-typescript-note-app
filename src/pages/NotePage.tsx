import {
  Box,
  Button,
  Chip,
  Link,
  Modal,
  Paper,
  Typography
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { removeNote } from '../store/noteSlice';
import { Note as NoteType } from '../types/types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};

const NotePage: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { notes } = useAppSelector((state) => state.note);
  const [note, setNote] = useState<NoteType | undefined>(undefined);
  const navigate = useNavigate();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const handleOpen = () => {
    setIsModalOpened(true);
  };
  const handleClose = () => {
    setIsModalOpened(false);
  };

  useEffect(() => {
    const selectedNote = notes.find((note) => note.id === id);
    setNote(selectedNote);
  }, [id, notes]);

  const handleRemoveNote = () => {
    if (note) {
      dispatch(removeNote(note.id));
    }
    handleClose();
    navigate('..');
  };

  return (
    <>
      <Box mt={4}>
        {note ? (
          <Box>
            <Box
              display="flex"
              sx={{ width: '100%', justifyContent: 'space-between' }}
              pb={5}
            >
              <Typography variant="h4" sx={{ textDecorationLine: 'underline' }}>
                {note.title}
              </Typography>
              <Box display="flex" gap={2} alignItems="flex-start">
                <Link to={`/${note.id}/edit`} component={RouterLink}>
                  <Button
                    sx={{ minWidth: '150px' }}
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  sx={{ minWidth: '150px' }}
                  variant="contained"
                  color="error"
                  onClick={handleOpen}
                >
                  Delete
                </Button>
              </Box>
            </Box>
            <Paper variant="outlined" sx={{ p: '2rem 0.5rem' }}>
              <Typography variant="body1">{note.markdown}</Typography>
            </Paper>
            <Box mt={2} display="flex" gap={1}>
              <Typography variant="subtitle1">Tags:</Typography>
              {note.tags.map((tag) => (
                <Chip key={tag.id} label={tag.label} />
              ))}
            </Box>
          </Box>
        ) : (
          <Typography variant="h6">Note not found</Typography>
        )}
      </Box>
      <Modal
        open={isModalOpened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
            pb={4}
          >
            Are you sure you want to delete this note?
          </Typography>
          <Box
            id="modal-modal-desription"
            display="flex"
            justifyContent="space-between"
          >
            <Button
              sx={{ minWidth: '150px' }}
              variant="contained"
              color="primary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              sx={{ minWidth: '150px' }}
              variant="contained"
              color="error"
              onClick={handleRemoveNote}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NotePage;
