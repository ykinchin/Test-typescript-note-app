import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Link,
  Stack
} from '@mui/material';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Note } from '../types/types';

const NoteCard: FC<Note> = ({ title, id, tags }) => {
  return (
    <Link
      component={RouterLink}
      to={`/${id}`}
      color={'inherit'}
      underline="none"
    >
      <Card sx={{ minWidth: '200px', minHeight: '150px' }}>
        <CardHeader title={title} />
        <CardContent>
          <Stack
            gap={2}
            className="align-items-center justify-content-center h-100"
          >
            {tags.length > 0 && (
              <Stack gap={1} direction="row">
                {tags.map((tag) => (
                  <Chip key={tag.id} label={tag.label} />
                ))}
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NoteCard;
