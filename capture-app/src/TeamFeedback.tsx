import React from 'react'
import ExpandableSection from './components/Expandable/ExpandableSection'
import { Controller, useForm } from 'react-hook-form';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import type { Question } from './api/feedback';

type FormValues = {
  responses: Question[];
};
type ITeamFeedbackResponse = {
  questions: Question[]
}
export default function TeamFeedback({ questions }: ITeamFeedbackResponse) {
  const defaultResponses: Question[] = questions.map(question => {
    return {
      id: question.id,
      answer: {
        value: question.answer?.value,
        comment: question.answer?.comment
      },
      text: question.text
    };
  });

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      responses: defaultResponses
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const onError = (errors: any) => {
    console.log("VALIDATION BLOCKED SUBMIT", errors);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {defaultResponses.map((question, index) => (
          <ExpandableSection key={question.id} header={<Typography variant="h6" component="div">{question.text}</Typography>}>
            <Controller
              name={`responses.${index}.id`}
              control={control}
              defaultValue={question.id}
              render={({ field }) => (
                <input type="hidden" {...field} value={question.id} />
              )}
            />
            <FormControl sx={{ display: 'flex' }}>
              <Controller
                name={`responses.${index}.answer.value`}
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <FormControlLabel sx={{ color: 'black' }} value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel sx={{ color: 'black' }} value="no" control={<Radio />} label="No" />
                    <FormControlLabel sx={{ color: 'black' }} value="not_sure" control={<Radio />} label="Not Sure" />

                  </RadioGroup>
                )}
              />

            </FormControl>
            <br />

            <Controller
              name={`responses.${index}.answer.comment`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Notes (optional)"
                  multiline
                  rows={4}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </ExpandableSection>
        ))}
        <button type="submit">Save</button>

      </form>
    </div>
  )
}
