import React, { useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../app/common/form/TextInput';
import TextAreaInput from '../../app/common/form/TextAreaInput';
import { IUpdateProfile } from '../../app/models/profile';
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { isRequired, combineValidators } from 'revalidate';

interface IProps {
  setEditProfile: (isEdit: boolean) => void;
  profile: IUpdateProfile;
}

const ProfileEditForm: React.FC<IProps> = ({ setEditProfile, profile }) => {
  const validate = combineValidators({
    displayName: isRequired('Display Name'),
    bio: isRequired('Bio'),
  });

  const rootStore = useContext(RootStoreContext);
  const { updateProfile, loadingEditProfile } = rootStore.profileStore;
  const handleFormSubmit = (values: any) => {
    var profile = {
      bio: values.bio,
      displayName: values.displayName,
    };
    updateProfile(profile).then(() => setEditProfile(false));
  };
  return (
    <FinalForm
      initialValues={profile}
      onSubmit={handleFormSubmit}
      validate={validate}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit}>
          <Field
            name="displayName"
            placeholder="Display Name"
            value={profile.displayName}
            component={TextInput}
          />
          <Field
            name="bio"
            component={TextAreaInput}
            placeholder="Bio"
            value={profile.bio}
            rows={3}
          />

          <Button
            floated="right"
            content="Submit"
            positive
            type="submit"
            loading={loadingEditProfile}
            disabled={loadingEditProfile || invalid || pristine}
          />
          <Button
            floated="right"
            content="Cancel"
            type="Button"
            onClick={() => setEditProfile(false)}
            disabled={loadingEditProfile}
          />
        </Form>
      )}
    ></FinalForm>
  );
};

export default observer(ProfileEditForm);
