<<<<<<< HEAD
<<<<<<< HEAD
import { useCallback, useState } from 'react';
=======
import React, { useCallback, useState } from 'react';
>>>>>>> c7ad6e7 (create useFeedbackForm hook)
=======
import { useCallback, useState } from 'react';
>>>>>>> 43bf292 (create useTeammateSelector hook)
import {
  getTeammateFeedback,
  submitTeammateFeedback,
  type FormFeedbackCategory,
  type TeammateFeedback,
} from '../../../api/feedback';
import { useAlert } from '../../../context/alert-context';
function useFeedackForm() {
  const [feedbackData, setFeedbackData] = useState<TeammateFeedback | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();
  const [refreshKey, setRefreshKey] = useState(0);

  const getData = useCallback(
    async (teammateId: number) => {
      setLoading(true);
      const result = await getTeammateFeedback(teammateId);
      setLoading(false);
      if (!result.success) {
        setAlert(
          `Couldn't load feedback. ${result.error?.message ?? ''}`,
          true,
        );
        return null;
      }

      setFeedbackData(result.data);
      return result.data;
    },
    [setAlert],
  );

  const submitFeedback = useCallback(
    async (teammateId: number, responses: FormFeedbackCategory[]) => {
      setLoading(true);

      const response = await submitTeammateFeedback({
        teammateId: teammateId,
        feedback: responses,
      });

      if (!response.success) {
        setAlert(
          `Couldn't submit feedback. ${response.error?.message ?? ''}`,
          true,
        );
        setLoading(false);
      }

      setAlert('Feedback submitted!');
      setRefreshKey((k) => k + 1);

      setLoading(false);
    },
    [setAlert],
  );
  return { getData, submitFeedback, feedbackData, loading, refreshKey };
}
export default useFeedackForm;
