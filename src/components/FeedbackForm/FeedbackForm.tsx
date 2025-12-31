import TabGroup from '../../components/TabGroup/TabGroup';
import TeamFeedback from '../TeamFeedback/TeamFeedback';
import { useEffect } from 'react';
import {
  type FormFeedbackCategory,
  type FormQuestion,
} from '../../api/feedback';
import { useForm } from 'react-hook-form';
import type { Teammate } from '../../api/teammates';
import useFeedackForm from './hooks/useFeedackForm';

export type FormValues = {
  responses: FormFeedbackCategory[];
};

export default function FeedbackForm({ teammate }: { teammate: Teammate }) {
  const { getData, submitFeedback, loading, refreshKey, feedbackData } =
    useFeedackForm();

  const categories = feedbackData?.feedback || [];
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      responses: categories,
    },
  });

  useEffect(() => {
    getData(teammate.id);
  }, [getData, teammate.id, refreshKey]);

  useEffect(() => {
    if (feedbackData) reset({ responses: feedbackData.feedback });
  }, [feedbackData, reset]);
  const onSubmit = async (data: FormValues) => {
    await submitFeedback(teammate.id, data.responses);
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
