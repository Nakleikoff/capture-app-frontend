import styles from './TeamFeedback.module.scss';
import ExpandableSection from '../Expandable/ExpandableSection';
import { Controller, useWatch, type Control } from 'react-hook-form';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { type FeedbackCategory } from '../../api/feedback';
import type { FormValues } from '../FeedbackForm/FeedbackForm';

type ITeamFeedbackProps = {
  category: FeedbackCategory;
  catIdx: number;
  control?: Control<FormValues>;
};

export default function TeamFeedback({
  category,
  control,
  catIdx,
}: ITeamFeedbackProps) {
  const watchedQuestions = useWatch({
    control,
    name: `responses.${catIdx}.questions`,
  });
  return (
    <div>
      {category.questions.map((question, qIdx) => (
        <ExpandableSection
          key={question.id}
          header={
            <Typography variant="h6" component="div">
              {question.text}
            </Typography>
          }
        >
          <div className={styles.inputsContainer}>
            <Controller
              name={`responses.${catIdx}.questions.${qIdx}.id`}
              control={control}
              defaultValue={question.id}
              render={({ field }) => (
                <input type="hidden" {...field} value={question.id} />
              )}
            />
            <FormControl className={styles.radioControllerWapper}>
              <Controller
                name={`responses.${catIdx}.questions.${qIdx}.answer.value`}
                defaultValue={question.answer?.value ?? null}
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      className={styles.radioOption}
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      className={styles.radioOption}
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                    <FormControlLabel
                      className={styles.radioOption}
                      value="not_sure"
                      control={<Radio />}
                      label="Not Sure"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            <Controller
              name={`responses.${catIdx}.questions.${qIdx}.answer.comment`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled={!watchedQuestions?.[qIdx]?.answer?.value}
                  label="Notes (optional)"
                  multiline
                  rows={4}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </div>
        </ExpandableSection>
      ))}
    </div>
  );
}
