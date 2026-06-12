import { SubmitErrorNote } from '@zyplux/ui/forms/hosted-form';

import { CONTACT_EMAIL, FORM_MESSAGES } from '@/content';

export const FormErrorNote = () => (
  <SubmitErrorNote>
    {FORM_MESSAGES.errorPrefix}
    <a className='text-accent hover:underline' href={`mailto:${CONTACT_EMAIL}`}>
      {CONTACT_EMAIL}
    </a>
    .
  </SubmitErrorNote>
);
