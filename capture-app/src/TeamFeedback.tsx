import React from 'react'
import ExpandableSection from './components/Expandable/ExpandableSection'
import { Controller, useForm } from 'react-hook-form';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';

const questions = [
  { id: 1, text: "What is your name?" },
  { id: 2, text: "What is your favorite color?" },
  { id: 4, text: "Describe your experience." },
  { id: 5, text: "Describe your experience." },
  { id: 8, text: "Describe your experience." }
]

export default function TeamFeedback() {

  type QuestionResponse = {
    questionId: number;
    decision: "yes" | "no" | "not_sure";
    note: string;
    // date: string;
  }
  type FormValues = {
    responses: QuestionResponse[];
  };

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      responses: questions.map(q => ({
        questionId: q.id,
        decision: "not_sure",
        note: ""
      }))
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  const onError = (errors: any) => {
  console.log("❌ VALIDATION BLOCKED SUBMIT", errors);
};
  return (
    <div className="questions-list">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {questions.map((question, index) => (
          <ExpandableSection key={question.id} header={<>{question.text}</>}>
            {/* Ensure questionId is always included */}
            <Controller
              name={`responses.${index}.questionId`}
              control={control}
              defaultValue={question.id}
              render={({ field }) => (
                <input type="hidden" {...field} value={question.id} />
              )}
            />
            <FormControl>
              <FormLabel>Did you complete the task?</FormLabel>

              <Controller
                name={`responses.${index}.decision`}
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
              name={`responses.${index}.note`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                />
              )}
            />


          </ExpandableSection>
        ))}
        <button type="submit">Submit Review</button>

      </form>
    </div>
  )
}
