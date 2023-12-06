import { FC } from 'react';

import NoteForm from '../components/NoteForm';

const CreateNotePage: FC = () => {
  return (
    <>
      <NoteForm formTitle="Create Node" buttonTitle="Add Note" />
    </>
  );
};

export default CreateNotePage;
