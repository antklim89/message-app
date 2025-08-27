import { Button, Card, Heading } from '@chakra-ui/react';

import { useAppForm } from '@/shared/lib/react-form';
import { ProfileEditForm, profileEditFormOptions } from './profile-edit-form';
import { useProfileUpdateMutation } from '../api/hooks/use-profile-update-mutation';
import type { ProfileEditType } from '../model/types';

export function ProfileUpdate({ profileEditValues }: { profileEditValues: ProfileEditType }) {
  const profileUpdateMutation = useProfileUpdateMutation();

  const profileEditForm = useAppForm({
    ...profileEditFormOptions,
    defaultValues: profileEditValues,
    async onSubmit({ value, formApi }) {
      const result = await profileUpdateMutation.mutateAsync(value);

      if (result.fail) {
        formApi.setErrorMap({
          onSubmit: { fields: result.error.issues ?? {}, form: result.error.message },
        });
      }
    },
  });

  return (
    <Card.Root>
      <Card.Header asChild>
        <Heading fontSize="2xl" textAlign="center">
          Profile Update
        </Heading>
      </Card.Header>
      <Card.Body>
        <ProfileEditForm form={profileEditForm} />
      </Card.Body>
      <Card.Footer justifyContent="end">
        <Button variant="ghost" onClick={() => profileEditForm.reset()}>
          Cancel
        </Button>
        <Button
          loadingText="Saving..."
          loading={profileUpdateMutation.isPending}
          onClick={profileEditForm.handleSubmit}
        >
          Save
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
