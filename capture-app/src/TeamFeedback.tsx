import React from 'react'
import ExpandableSection from './components/Expandable/ExpandableSection'
import { Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { type FeedbackCategory } from './api/feedback';

type ITeamFeedbackProps = {
  category: FeedbackCategory;
  catIdx?: number;
  control?: any;
};

export default function TeamFeedback({ category, control, catIdx }: ITeamFeedbackProps) {
  return (

    <div>
      {category.questions.map((question, qIdx) => (
        <ExpandableSection key={question.id} header={<Typography variant="h6" component="div">{question.text}</Typography>}>
          <Controller
            name={`responses.${catIdx}.questions.${qIdx}.id`}
            control={control}
            defaultValue={question.id}
            render={({ field }) => (
              <input type="hidden" {...field} value={question.id} />
            )}
          />
          <FormControl sx={{ display: 'flex' }}>
            <Controller
              name={`responses.${catIdx}.questions.${qIdx}.answer.value`}
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
            name={`responses.${catIdx}.questions.${qIdx}.answer.comment`}
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

    </div>
  );
}
