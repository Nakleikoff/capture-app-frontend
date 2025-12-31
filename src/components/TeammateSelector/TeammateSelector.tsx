import { useEffect, useState } from 'react';
import styles from './TeammateSelector.module.scss';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  createTeammate,
  getTeammates,
  type Teammate,
} from '../../api/teammates';
import { useAlert } from '../../context/alert-context';
import useTeammateSelector from './hooks/useTeammateSelector';

type Inputs = {
  teammateName: string;
};

export default function TeammateSelector({
  setTeammate,
}: {
  setTeammate: React.Dispatch<React.SetStateAction<Teammate | undefined>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
  });
  const { getData, addTeammate, teammates, defaultName, teammate } =
    useTeammateSelector();
  const [selectedTeammate, setSelectedTeammate] = useState<Teammate | string>(
    '',
  );
  const [inputValue, setInputValue] = useState('');

  const filtered = teammates.filter((teammate) =>
    teammate.name.toLowerCase().includes(inputValue.toLowerCase()),
  );
  const noResults = filtered.length === 0;

  const handleAddTeammate = async () => {
    if (inputValue && noResults) {
      addTeammate(inputValue);
    }
  };

  useEffect(() => {
    getData();
  }, [setTeammate]);

  useEffect(() => {
    if (teammate) {
      setTeammate(teammate);
    }
  }, [teammate]);

  useEffect(() => {
    if (defaultName) {
      setInputValue(defaultName);
    }
  }, [defaultName]);

  return (
    <form
      className={styles.selectorWrapper}
      onSubmit={handleSubmit(handleAddTeammate)}
    >
      <Autocomplete
        disablePortal
        freeSolo
        options={teammates}
        className={styles.autocomplete}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Teammate"
            {...register('teammateName', {
              required: 'Please select or add a teammate.',
              maxLength: {
                value: 30,
                message: 'Teammate name cannot be more than 30 letters long.',
              },
              minLength: {
                value: 1,
                message: 'That name is too short.',
              },
              pattern: {
                value: /^[a-zA-Z ]+$/i,
                message:
                  "A teammate name can only contain letters and can't have trailing spaces.",
              },
            })}
            error={errors.teammateName ? true : false}
            helperText={errors.teammateName?.message}
          />
        )}
        getOptionLabel={(teammate: Teammate | string) => {
          return typeof teammate === 'string' ? teammate : teammate.name;
        }}
        inputValue={inputValue}
        onInputChange={(_: React.SyntheticEvent, newInputValue) => {
          setInputValue(newInputValue);
        }}
        value={selectedTeammate}
        onChange={(
          _: React.SyntheticEvent,
          teammate: Teammate | null | string,
        ) => {
          if (teammate) {
            setSelectedTeammate(teammate);
            if (typeof teammate === 'object') {
              setTeammate(teammate);
            }
          } else {
            setTeammate(undefined);
          }
        }}
      />
      <div className={styles.buttonWrapper}>
        <Button
          type="submit"
          disabled={!noResults || errors.teammateName?.message ? true : false}
          variant="contained"
        >
          Add
        </Button>
      </div>
    </form>
  );
}
