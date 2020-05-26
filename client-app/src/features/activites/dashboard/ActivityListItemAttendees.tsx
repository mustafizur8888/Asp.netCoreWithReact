import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { IAttendee } from '../../../app/models/activity';

interface IPorps {
  attendees: IAttendee[];
}

const ActivityListItemAttendees: React.FC<IPorps> = ({ attendees }) => {
  return (
    <List horizontal>
      {attendees?.map((attendee) => (
        <List.Item key={attendee.username}>
          <Image
            size="mini"
            circular
            src={attendee.image || '/assets/user.png'}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default ActivityListItemAttendees;
