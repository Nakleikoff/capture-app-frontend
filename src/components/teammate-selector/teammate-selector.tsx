import { useEffect, useState } from 'react';
import styles from './teammate-selector.module.css';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  createTeammate,
  getTeammates,
  type Teammate,
} from '../../api/teammates';

type Inputs = {
  teammateName: string;
};

type AutocompleteOption = {
  id: number;
  label: string;
};

export default function TeammateSelector({
  setTeammateId,
}: {
  setTeammateId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const [teammates, setTeammates] = useState<AutocompleteOption[]>([]);
  const [selectedTeammate, setSelectedTeammate] = useState<
    AutocompleteOption | null | string
  >(null);
  const [inputValue, setInputValue] = useState('');

  const handleAddTeammate = async () => {
    if (
      inputValue &&
      !teammates.some((teammate) => teammate.label === inputValue)
    ) {
      const trimmedInput = inputValue.trimEnd();
      const createResponse = await createTeammate({
        name: trimmedInput,
      });
      if (createResponse.success) {
        const updatedTeammatesResponse = await getTeammates();
        if (updatedTeammatesResponse.success) {
          hydrateAutoCompleteOptions(updatedTeammatesResponse.data.teammates);
        }
        setInputValue(trimmedInput);
      }
    }
  };

  const filtered = teammates.filter((teammate) =>
    teammate.label.toLowerCase().includes(inputValue.toLowerCase()),
  );
  const noResults = filtered.length === 0;

  const hydrateAutoCompleteOptions = (teammates: Teammate[]) => {
    const options: AutocompleteOption[] = teammates.map(({ id, name }) => {
      return { id, label: name };
    });
    setTeammates(options);
  };

  useEffect(() => {
    async function getData() {
      const res = await getTeammates();
      if (res.success) {
        hydrateAutoCompleteOptions(res.data.teammates);
      }
    }

    getData();
  }, []);

  return (
    <form
      className={styles.selectorWrapper}
      onSubmit={handleSubmit(handleAddTeammate)}
    >
      <Autocomplete
        disablePortal
        freeSolo
        options={teammates}
        sx={{ width: 300 }}
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
        inputValue={inputValue}
        onInputChange={(_: React.SyntheticEvent, newInputValue) => {
          setInputValue(newInputValue);
        }}
        value={selectedTeammate}
        onChange={(
          _: React.SyntheticEvent,
          newValue: AutocompleteOption | null | string,
        ) => {
          setSelectedTeammate(newValue);
          setTeammateId(
            newValue && typeof newValue === 'object' ? newValue.id : 0,
          );
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
