import { HoneypotField, SubmitSuccessNote, useHostedForm } from '@zyplux/ui/forms';
import { button, fieldInput, fieldLabel } from '@zyplux/ui/recipes';

import { FORM_ENDPOINT } from '@/config';
import { FORM_MESSAGES } from '@/site';

import { FormErrorNote } from './form-notes';

export type AuditFormCopy = {
  button: string;
  companyLabel: string;
  emailLabel: string;
  nameLabel: string;
  taskLabel: string;
};

export const AuditForm = ({ button: buttonLabel, companyLabel, emailLabel, nameLabel, taskLabel }: AuditFormCopy) => {
  const { status, submit } = useHostedForm(FORM_ENDPOINT);

  if (status === 'sent') {
    return <SubmitSuccessNote>{FORM_MESSAGES.auditSuccess}</SubmitSuccessNote>;
  }

  const textFields = [
    { label: nameLabel, name: 'name', type: 'text' },
    { label: emailLabel, name: 'email', type: 'email' },
    { label: companyLabel, name: 'company', type: 'text' },
  ];

  return (
    <form className='space-y-4 text-left' onSubmit={submit}>
      <input name='form' type='hidden' value='audit' />
      <HoneypotField />
      {textFields.map(field => (
        <label className='block' key={field.name}>
          <span className={fieldLabel()}>{field.label}</span>
          <input className={fieldInput({ class: 'w-full' })} name={field.name} required type={field.type} />
        </label>
      ))}
      <label className='block'>
        <span className={fieldLabel()}>{taskLabel}</span>
        <textarea className={fieldInput({ class: 'w-full' })} name='task' rows={3} />
      </label>
      <button className={button({ class: 'w-full' })} disabled={status === 'sending'} type='submit'>
        {status === 'sending' ? FORM_MESSAGES.sending : buttonLabel}
      </button>
      {status === 'error' && <FormErrorNote />}
    </form>
  );
};
