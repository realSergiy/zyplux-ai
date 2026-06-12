import { EmailCapture as EmailCaptureForm } from '@zyplux/ui/forms';
import { SubmitSuccessNote } from '@zyplux/ui/forms';

import { FORM_ENDPOINT } from '@/config';
import { FORM_MESSAGES } from '@/content';

import { FormErrorNote } from './form-notes';

export type FormName = 'agent-updates' | 'audit' | 'insights-updates';

export const EmailCapture = ({
  button,
  emailLabel,
  formName,
}: {
  button: string;
  emailLabel: string;
  formName: FormName;
}) => (
  <EmailCaptureForm
    buttonLabel={button}
    emailLabel={emailLabel}
    endpoint={FORM_ENDPOINT}
    error={<FormErrorNote />}
    formName={formName}
    placeholder={FORM_MESSAGES.emailPlaceholder}
    sendingLabel={FORM_MESSAGES.sending}
    success={<SubmitSuccessNote>{FORM_MESSAGES.captureSuccess}</SubmitSuccessNote>}
  />
);
