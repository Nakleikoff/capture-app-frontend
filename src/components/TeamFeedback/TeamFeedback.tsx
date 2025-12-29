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
import { type FormFeedbackCategory } from '../../api/feedback';
import type { FormValues } from '../FeedbackForm/FeedbackForm';

type ITeamFeedbackProps = {
  category: FormFeedbackCategory;
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
                defaultValue={question.answer?.value ?? undefined}
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    row
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const v =
                        e.target.value === '' ? null : Number(e.target.value);
                      field.onChange(v);
                    }}
                  >
                    <FormControlLabel
                      className={styles.radioOption}
                      value="1"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      className={styles.radioOption}
                      value="-1"
                      control={<Radio />}
                      label="No"
                    />
                    <FormControlLabel
                      className={styles.radioOption}
                      value="0"
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
              rules={
                watchedQuestions?.[qIdx]?.answer?.value == null
                  ? {}
                  : {
                      required:
                        "Please add a comment about your teammate's performance.",
                    }
              }
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  disabled={watchedQuestions?.[qIdx]?.answer?.value == null}
                  label="Notes"
                  multiline
                  rows={4}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  helperText={fieldState.error?.message}
                  error={!!fieldState.error?.message}
                />
              )}
            />
          </div>
        </ExpandableSection>
      ))}
    </div>
  );
}
