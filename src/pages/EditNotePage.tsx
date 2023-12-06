import { FC } from 'react';
import { useParams } from 'react-router-dom';

import NoteForm from '../components/NoteForm';
import { useAppSelector } from '../hooks/reduxHooks';

const EditNotePage: FC = () => {
  const { notes } = useAppSelector((state) => state.note);
  const { id } = useParams();

  const existingNote = notes.find((note) => note.id === id);

  return (
    <>
      <NoteForm
        formTitle="Edit Node"
        buttonTitle="Save"
        initialData={existingNote}
      />
    </>
  );
};

export default EditNotePage;
