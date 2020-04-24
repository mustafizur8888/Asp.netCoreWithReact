import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityStor from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
interface IPros {
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}
const ActivityDetails: React.FC<IPros> = ({
  setEditMode,
  setSelectedActivity,
}) => {
  const activityStore = useContext(ActivityStor);
  const { selectedActivity: activity } = activityStore;
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            color="blue"
            content="Edit"
          ></Button>
          <Button
            basic
            onClick={() => setSelectedActivity(null)}
            color="grey"
            content="Cancel"
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
export default observer(ActivityDetails);
