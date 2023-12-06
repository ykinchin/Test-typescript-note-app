import {
  Autocomplete,
  Box,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { FC, useMemo, useState } from 'react';

import NoteCard from '../components/NoteCard';
import { useAppSelector } from '../hooks/reduxHooks';
import { Tag } from '../types/types';

const NoteListPage: FC = () => {
  const { notes, tags } = useAppSelector((state) => state.note);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState('');

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === '' ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <Box display="flex" flexDirection="column" gap={2} overflow="auto" pt={2}>
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Autocomplete
        multiple
        id="tags"
        options={tags}
        getOptionLabel={(option) => option.label}
        value={selectedTags}
        onChange={(_, newValue) => setSelectedTags(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Tags" variant="outlined" />
        )}
      />
      <Stack
        pt={4}
        gap={4}
        direction="row"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="flex-start"
        overflow="auto"
      >
        {filteredNotes.length !== 0 ? (
          filteredNotes.map((note) => (
            <Paper variant="outlined" key={note.id}>
              <NoteCard {...note} />
            </Paper>
          ))
        ) : (
          <Typography>No matching notes found</Typography>
        )}
      </Stack>
    </Box>
  );
};

export default NoteListPage;
