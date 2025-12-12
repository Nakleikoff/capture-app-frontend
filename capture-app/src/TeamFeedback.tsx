import React from 'react'
import ExpandableSection from './components/Expandable/ExpandableSection'
import { Controller, useForm } from 'react-hook-form';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';


const questions = [
  { id: 1, text: "Did you meet your performance goals for this period?" },
  { id: 2, text: "Did you collaborate effectively with your team?" },
  { id: 4, text: "Did you take initiative on new tasks or projects?" },
  { id: 5, text: "Did you seek feedback to improve your work?" },
  { id: 8, text: "Did you support company values in your daily work?" },
  { id: 9, text: "Did you support personal values in your daily work?" },
];

const mockAnswers: QuestionResponse[] = [
  { questionId: 1, decision: "yes", note: "Achieved all my goals this period." },
  { questionId: 2, decision: "no", note: "Need to work on communication." },
  { questionId: 4, decision: "not_sure", note: "Some tasks were unclear." },
  { questionId: 5, decision: "yes", note: "Asked for feedback from peers." },
  { questionId: 8, decision: "yes", note: "Aligned with company values." },
  { questionId: 9, decision: "not_sure", note: "Personal values not always relevant." },
];

type QuestionResponse = {
  questionId: number;
  decision: "yes" | "no" | "not_sure";
  note: string;
}
type FormValues = {
  responses: QuestionResponse[];
};

export default function TeamFeedback() {
  const defaultResponses: QuestionResponse[] = questions.map(q => {
    const answer = mockAnswers.find(a => a.questionId === q.id);
    return {
      questionId: q.id,
      decision: answer ? answer.decision : "not_sure",
      note: answer ? answer.note : ""
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
        {questions.map((question, index) => (
          <ExpandableSection key={question.id} header={<Typography variant="h6" component="div">{question.text}</Typography>}>
            <Controller
              name={`responses.${index}.questionId`}
              control={control}
              defaultValue={question.id}
              render={({ field }) => (
                <input type="hidden" {...field} value={question.id} />
              )}
            />
            <FormControl sx={{ display: 'flex' }}>
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
