import React, { useContext, useState } from 'react';
import { Tab, Grid, Header, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import ProfileEditForm from './ProfileEditForm';
import { observer } from 'mobx-react-lite';

const ProfileDescription = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isCuurentUser,
    getUpdateProfileInfo,
  } = rootStore.profileStore;
  const [editProfile, setEditProfile] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ padingBottom: 0 }}>
          <Header
            icon="user"
            floated="left"
            content={'About ' + profile?.displayName}
          />
          {isCuurentUser && (
            <Button
              basic
              floated="right"
              onClick={() => setEditProfile(!editProfile)}
              content={editProfile ? 'Cancel' : 'Edit'}
            />
          )}
        </Grid.Column>
        {!editProfile && (
          <Grid.Column width={16}>
            <p>{profile?.bio} </p>
          </Grid.Column>
        )}

        {editProfile && isCuurentUser && (
          <Grid.Column width={16}>
            <ProfileEditForm
              setEditProfile={setEditProfile}
              profile={getUpdateProfileInfo()}
            />
          </Grid.Column>
        )}
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileDescription);
