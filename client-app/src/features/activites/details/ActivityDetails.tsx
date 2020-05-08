import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityStor from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivitydetailedSidebar from './ActivitydetailedSidebar';

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStor);
  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial && !activity)
    return <LoadingComponent content="Loading activity..." />;

  if (!activity) return <h2>Activity not found</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivitydetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivityDetails);
