import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';

interface DetailParam {
  id: string;
}

export const ActivityForm: React.FC<RouteComponentProps<DetailParam>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity,
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    city: '',
    venue: '',
  });

  useEffect(() => {
    console.log(match.params.id, activity.id.length);
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }
    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    match.params.id,
    clearActivity,
    initialFormState,
    activity.id.length,
  ]);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      editActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              onChange={handleInputChange}
              name='title'
              placeholder='Title'
              value={activity.title}
            />
            <Form.TextArea
              onChange={handleInputChange}
              name='description'
              rows={2}
              placeholder='Description'
              value={activity.description}
            />
            <Form.Input
              onChange={handleInputChange}
              type='datetime-local'
              name='date'
              placeholder='Date'
              value={activity.date}
            />
            <Form.Input
              onChange={handleInputChange}
              name='category'
              placeholder='Category'
              value={activity.category}
            />
            <Form.Input
              onChange={handleInputChange}
              name='city'
              placeholder='City'
              value={activity.city}
            />
            <Form.Input
              onChange={handleInputChange}
              name='venue'
              placeholder='Venue'
              value={activity.venue}
            />
            <Button
              loading={submitting}
              floated='right'
              content='Submit'
              positive
              type='submit'
            />
            <Button
              onClick={() => history.push('/activities')}
              floated='right'
              content='Cancel'
              type='button'
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityForm);
