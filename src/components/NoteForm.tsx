import { Box, Button, Chip, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { addNote, updateNote } from '../store/noteSlice';
import { Note, Tag } from '../types/types';

type NoteFromProps = {
  formTitle: string;
  buttonTitle: string;
  initialData?: Note;
};

const NoteForm: FC<NoteFromProps> = ({
  formTitle,
  buttonTitle,
  initialData
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLInputElement>(null);

  const { tags } = useAppSelector((state) => state.note);
  const [currentTags, setCurrentTags] = useState<Tag[]>(
    initialData?.tags || []
  );

  //Проверяем есть ли начальные значения, переданные в пропсах. По условию применяем диспатч
  const onClickHandler = () => {
    const title = titleRef.current!.value;
    const data = {
      id: initialData?.id || uuid(),
      markdown: markdownRef.current!.value,
      title: titleRef.current!.value,
      tags: currentTags
    };

    if (!title.trim()) {
      alert('Please enter a non-empty title');
      return;
    }

    if (initialData) {
      dispatch(updateNote(data));
    } else {
      dispatch(addNote(data));
    }
    navigate('..');
  };

  //Устанавливаем начальные значения в форму

  useEffect(() => {
    if (initialData) {
      titleRef.current!.value = initialData.title;
      markdownRef.current!.value = initialData.markdown;
      setCurrentTags(initialData.tags);
    }
  }, [initialData]);

  //Проверяем наличие спецсимвола и добавляем в текущие теки все, что идет после него. Повторое использование спецсимвола добавляет новый тег

  const handleNoteChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    const tagMatches = newText.match(/#(.+?)(?=#|$)/g);

    if (tagMatches) {
      const newTags = tagMatches.map((tag) => ({
        id: uuid(),
        label: tag
      }));
      setCurrentTags(newTags);
    } else {
      setCurrentTags((prevTags) => [...prevTags]);
    }
  };

  //Добавляем теги из доступных в текущие

  const handleAddTagToCurrent = (label: string) => {
    const existingCurrentTag = currentTags.find(
      (currentTag) => currentTag.label === label
    );

    if (!existingCurrentTag) {
      const newTag = {
        id: uuid(),
        label
      };
      setCurrentTags((prevTags) => [...prevTags, newTag]);
    }
  };

  //Удаляем теги из текущих

  const handleRemoveTagFromCurrent = (label: string) => {
    setCurrentTags((prevTags) => prevTags.filter((tag) => tag.label !== label));
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {formTitle}
      </Typography>

      <Box display="flex" gap={2}>
        <Stack spacing={4} sx={{ width: '100%' }}>
          <Box
            display="flex"
            sx={{ width: '100%', justifyContent: 'space-between' }}
          >
            <TextField
              inputRef={titleRef}
              label={'Title'}
              size="small"
              sx={{ minWidth: '200px', width: '300px' }}
              required
            />

            <Button
              variant="contained"
              color="primary"
              onClick={onClickHandler}
              sx={{ minWidth: '150px' }}
            >
              {buttonTitle}
            </Button>
          </Box>

          <TextField
            multiline
            inputRef={markdownRef}
            onChange={handleNoteChange}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            <Typography>Current tags</Typography>
            {currentTags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.label}
                onClick={() => handleRemoveTagFromCurrent(tag.label)}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            <Typography>Available tags</Typography>
            {tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.label}
                onClick={() => handleAddTagToCurrent(tag.label)}
              />
            ))}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default NoteForm;
