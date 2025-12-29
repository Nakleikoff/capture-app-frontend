import TabGroup from '../../components/TabGroup/TabGroup';
import TeamFeedback from '../TeamFeedback/TeamFeedback';
import { useEffect, useState } from 'react';
import {
  getTeammateFeedback,
  submitTeammateFeedback,
  type FormFeedbackCategory,
  type FormQuestion,
  type TeammateFeedback,
} from '../../api/feedback';
import { useForm } from 'react-hook-form';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { Teammate } from '../../api/teammates';
import { useAlert } from '../../context/alert-context';

export type FormValues = {
  responses: FormFeedbackCategory[];
};

export default function FeedbackForm({ teammate }: { teammate: Teammate }) {
  const [feedbackData, setFeedbackData] = useState<TeammateFeedback | null>(
    null,
  );
  const [refreshKey, setRefreshKey] = useState(0);

  const categories = feedbackData?.feedback || [];
  const [loading, setLoading] = useState(false);
  const { setAlert } = useAlert();
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      responses: categories,
    },
  });

  useEffect(() => {
    async function getData() {
      const result = await getTeammateFeedback(teammate.id);
      if (result.success) {
        setFeedbackData(result.data);
        reset({ responses: result.data.feedback });
      }
    }
    getData();
  }, [reset, teammate, refreshKey]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await submitTeammateFeedback({
        teammateId: teammate.id,
        feedback: data.responses,
      });
      setAlert('Feedback submitted!');
      setRefreshKey((k) => k + 1);
    } catch {
      setAlert(`Submission failed.`, true);
    } finally {
      setLoading(false);
    }
  };

  const renderQuestionsAnswered = (questions: FormQuestion[]) => {
    const answered = questions.reduce((accumulator, question) => {
      return (
        accumulator +
        (question.answer && question.answer.value !== null ? 1 : 0)
      );
    }, 0);

    return `${answered}/${questions.length}`;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TabGroup
        items={categories.map((category, catIdx) => ({
          panelChildren: (
            <TeamFeedback
              category={category}
              control={control}
              catIdx={catIdx}
            />
          ),
          title: `${category.category.name} ${renderQuestionsAnswered(
            category.questions,
          )}`,
        }))}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
