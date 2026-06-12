import type { ReactNode } from 'react';

import { button, fieldInput } from '@zyplux/ui/recipes';

import { HoneypotField, useHostedForm } from './hosted-form';

export const EmailCapture = ({
  buttonLabel,
  emailLabel,
  endpoint,
  error,
  formName,
  placeholder,
  sendingLabel,
  success,
}: {
  buttonLabel: string;
  emailLabel: string;
  endpoint: string;
  error: ReactNode;
  formName: string;
  placeholder: string;
  sendingLabel: string;
  success: ReactNode;
}) => {
  const { status, submit } = useHostedForm(endpoint);

  if (status === 'sent') {
    return success;
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
          placeholder={placeholder}
          required
          type='email'
        />
        <button className={button({ size: 'md' })} disabled={status === 'sending'} type='submit'>
          {status === 'sending' ? sendingLabel : buttonLabel}
        </button>
      </div>
      {status === 'error' && error}
    </form>
  );
};
