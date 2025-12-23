import TabGroup from '../../components/TabGroup/TabGroup';
import TeamFeedback from '../team-feedback/TeamFeedback';
import { useEffect, useState } from 'react';
import {
  getTeammateFeedback,
  submitTeammateFeedback,
  type FeedbackCategory,
  type Question,
  type TeammateFeedback,
} from '../../api/feedback';
import { useForm } from 'react-hook-form';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export type FormValues = {
  responses: FeedbackCategory[];
};

export default function FeedbackForm({ teammateId }: { teammateId: number }) {
  const [feedbackData, setFeedbackData] = useState<TeammateFeedback | null>(
    null,
  );

  const categories = feedbackData?.feedback || [];
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      responses: categories,
    },
  });

  useEffect(() => {
    async function getData() {
      const result = await getTeammateFeedback(teammateId);
      if (result.success) {
        setFeedbackData(result.data);
        reset({ responses: result.data.feedback });
      }
    }
    getData();
  }, [reset, teammateId]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await submitTeammateFeedback({
        teammateId: teammateId,
        feedback: data.responses,
      });
      setToastMsg('Feedback submitted!');
      setToastOpen(true);
    } catch {
      setToastMsg('Submission failed.');
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const renderQuestionsAnswered = (questions: Question[]) => {
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
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
    </form>
  );
}
