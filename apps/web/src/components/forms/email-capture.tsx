import { FORM_MESSAGES } from '@/content';
import { button, fieldInput } from '@/styles';

import type { FormName } from './hosted-form';

import { HoneypotField, SubmitErrorNote, SubmitSuccessNote, useHostedForm } from './hosted-form';

export const EmailCapture = ({
  button: buttonLabel,
  emailLabel,
  formName,
}: {
  button: string;
  emailLabel: string;
  formName: FormName;
}) => {
  const { status, submit } = useHostedForm();

  if (status === 'sent') {
    return <SubmitSuccessNote>{FORM_MESSAGES.captureSuccess}</SubmitSuccessNote>;
  }

  return (
    <form className='space-y-3' onSubmit={submit}>
      <input name='form' type='hidden' value={formName} />
      <HoneypotField />
      <div className='flex flex-col gap-3 sm:flex-row'>
        <label className='sr-only' htmlFor={`${formName}-email`}>
          {emailLabel}
        </label>
        <input
          className={fieldInput({ class: 'flex-1' })}
          id={`${formName}-email`}
          name='email'
          placeholder='you@company.com'
          required
          type='email'
        />
        <button className={button({ size: 'md' })} disabled={status === 'sending'} type='submit'>
          {status === 'sending' ? FORM_MESSAGES.sending : buttonLabel}
        </button>
      </div>
      {status === 'error' && <SubmitErrorNote />}
    </form>
  );
};
