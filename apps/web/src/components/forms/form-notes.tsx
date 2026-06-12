import { SubmitErrorNote } from '@zyplux/ui/forms';
import { inlineLink } from '@zyplux/ui/recipes';

import { CONTACT_EMAIL, FORM_MESSAGES } from '@/content';

export const FormErrorNote = () => (
  <SubmitErrorNote>
    {FORM_MESSAGES.errorPrefix}
    <a className={inlineLink()} href={`mailto:${CONTACT_EMAIL}`}>
      {CONTACT_EMAIL}
    </a>
    .
  </SubmitErrorNote>
);
