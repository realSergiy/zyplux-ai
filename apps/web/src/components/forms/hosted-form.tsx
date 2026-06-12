import type { ReactNode, SubmitEvent } from 'react';

import { useState } from 'react';

import { FORM_ENDPOINT } from '@/config';
import { CONTACT_EMAIL, FORM_MESSAGES } from '@/content';

const HONEYPOT_FIELD = 'website';

export type FormName = 'agent-updates' | 'audit' | 'insights-updates';

type SubmitStatus = 'error' | 'idle' | 'sending' | 'sent';

export const useHostedForm = () => {
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const deliver = async (fields: FormData) => {
    try {
      const response = await fetch(FORM_ENDPOINT, {
        body: fields,
        headers: { Accept: 'application/json' },
        method: 'POST',
      });
      setStatus(response.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    if (fields.get(HONEYPOT_FIELD)) {
      setStatus('sent');
      return;
    }
    fields.delete(HONEYPOT_FIELD);
    setStatus('sending');
    void deliver(fields);
  };

  return { status, submit };
};

export const HoneypotField = () => (
  <input aria-hidden autoComplete='off' className='hidden' name={HONEYPOT_FIELD} tabIndex={-1} type='text' />
);

export const SubmitSuccessNote = ({ children }: { children: ReactNode }) => (
  <p className='rounded-xl border border-success/30 bg-success/10 p-6 text-success' role='status'>
    {children}
  </p>
);

export const SubmitErrorNote = () => (
  <p className='text-sm text-muted' role='alert'>
    {FORM_MESSAGES.errorPrefix}
    <a className='text-accent hover:underline' href={`mailto:${CONTACT_EMAIL}`}>
      {CONTACT_EMAIL}
    </a>
    .
  </p>
);
