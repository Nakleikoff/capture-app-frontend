import { useCallback, useEffect, useState } from 'react';
import {
  createTeammate,
  getTeammates,
  type Teammate,
} from '../../../api/teammates';
import { useAlert } from '../../../context/alert-context';

function useTeammateSelector() {
  const [teammates, setTeammates] = useState<Teammate[]>([]);
  const [defaultName, setDefaultName] = useState('');
  const [teammate, setTeammate] = useState<Teammate>();
  const { setAlert } = useAlert();

  const addTeammate = useCallback(
    async (teammateName: string) => {
      const response = await createTeammate(teammateName.trimEnd());
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
        setDefaultName(response.data.teammate.name ?? '');
      } else {
        setAlert(response.error?.message ?? "Couldn't add teammate.", true);
      }
    },
    [setAlert],
  );

  useEffect(() => {
    const initialize = async () => {
      const res = await getTeammates();
      if (res.success) {
        const list = res.data.teammates ?? [];
        setTeammates(list);
        if (list.length > 0) {
          setTeammate(list[0]);
          setDefaultName(list[0].name ?? '');
        } else {
          setTeammate(undefined);
          setDefaultName('');
        }
      } else {
        setAlert(`Failed to load teammates. ${res.error?.message ?? ''}`, true);
      }
    };

    initialize();
  }, [setAlert]);

  return { addTeammate, setTeammate, teammates, defaultName, teammate };
}

export default useTeammateSelector;
