import React from 'react'
import ExpandableSection from './components/Expandable/ExpandableSection'
import { Controller, useForm } from 'react-hook-form';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';



const mockQuestionAnswers: QuestionResponse[] = [
  {
    id: 1,
    text: "Did you meet your performance goals for this period?",
    answer: {
      value: "yes", comment: "Achieved all my goals this period."
    }
  },
  {
    id: 2,
    text: "Did you collaborate effectively with your team?",
    answer: {
      value: "no", comment: "Need to work on communication."
    }
  },
  {
    id: 4,
    text: "Did you collaborate effectively with your team?",
    answer: {
      value: "not_sure", comment: "Some tasks were unclear."
    },
  }, {
    id: 5,
    text: "Did you seek feedback to improve your work?",
    answer: {
      value: "yes", comment: "Asked for feedback from peers."
    }
  },
  {
    id: 8,
    text: "Did you collaborate effectively with your team?",
    answer: {
      value: "yes", comment: "Aligned with company values."
    },
  }, {
    id: 9,
    text: "Did you collaborate effectively with your team?",
    answer: {
      value: "not_sure", comment: "Personal values not always relevant."
    }
  },
];
// get feedback/teamId

async function getTeammateFeedback(teamMateId: number): Promise<QuestionResponse[]> {
  const response = await fetch(`/api/feedback/${teamMateId}`);
  const data = await response.json();
  return data;
}

type QuestionResponse = {
  id: number;
  text: string;
  answer: Answer
}

type Answer = {
  value: "yes" | "no" | "not_sure";
  comment: string;
}
type FormValues = {
  responses: QuestionResponse[];
};

export default function TeamFeedback() {
  const defaultResponses: QuestionResponse[] = mockQuestionAnswers.map(a => {
    return {
      id: a.id,
      answer: {
        value: a.answer.value,
        comment: a.answer.comment
      },
      text: a.text
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
