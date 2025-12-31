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

  const [teammates, setTeammates] = useState<Teammate[]>([]);
  const [selectedTeammate, setSelectedTeammate] = useState<Teammate | string>(
    '',
  );
  const [inputValue, setInputValue] = useState('');
  const { setAlert } = useAlert();
  const filtered = teammates.filter((teammate) =>
    teammate.name.toLowerCase().includes(inputValue.toLowerCase()),
  );
  const noResults = filtered.length === 0;

  const handleAddTeammate = async () => {
    if (inputValue && noResults) {
      const response = await createTeammate(inputValue.trimEnd());
      if (response.success) {
        setAlert('Teammate Added.');
        const updatedTeammatesResponse = await getTeammates();
        if (updatedTeammatesResponse.success) {
          setTeammates(updatedTeammatesResponse.data.teammates);
        } else {
          setAlert(
            updatedTeammatesResponse.error?.message ??
              "Couldn't refresh teammates.",
            true,
          );
        }
        setTeammate(response.data.teammate);
        setInputValue(response.data.teammate.name ?? '');
      } else {
        setAlert(response.error?.message ?? "Couldn't add teammate.", true);
      }
    }
  };

  useEffect(() => {
    async function getData() {
      const res = await getTeammates();
      if (res.success) {
        const list = res.data.teammates ?? [];
        setTeammates(list);
        if (list.length > 0) {
          setTeammate(list[0]);
          setInputValue(list[0].name ?? '');
        } else {
          setTeammate(undefined);
          setInputValue('');
        }
      } else {
        setAlert(`Failed to load teammates. ${res.error?.message ?? ''}`, true);
      }
    }

    getData();
  }, [setTeammate]);

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
