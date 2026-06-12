import { HoneypotField, SubmitSuccessNote, useHostedForm } from '@zyplux/ui/forms/hosted-form';
import { button, fieldInput } from '@zyplux/ui/recipes';

import { FORM_ENDPOINT } from '@/config';
import { AUDIT_FORM, FORM_MESSAGES } from '@/content';

import { FormErrorNote } from './form-notes';

const labelClasses = 'mb-2 block text-sm font-medium text-heading';

const TEXT_FIELDS = [
  { label: AUDIT_FORM.nameLabel, name: 'name', type: 'text' },
  { label: AUDIT_FORM.emailLabel, name: 'email', type: 'email' },
  { label: AUDIT_FORM.companyLabel, name: 'company', type: 'text' },
];

export const AuditForm = () => {
  const { status, submit } = useHostedForm(FORM_ENDPOINT);

  if (status === 'sent') {
    return <SubmitSuccessNote>{FORM_MESSAGES.auditSuccess}</SubmitSuccessNote>;
  }

  return (
    <form className='space-y-4 text-left' onSubmit={submit}>
      <input name='form' type='hidden' value='audit' />
      <HoneypotField />
      {TEXT_FIELDS.map(field => (
        <label className='block' key={field.name}>
          <span className={labelClasses}>{field.label}</span>
          <input className={fieldInput({ class: 'w-full' })} name={field.name} required type={field.type} />
        </label>
      ))}
      <label className='block'>
        <span className={labelClasses}>{AUDIT_FORM.taskLabel}</span>
        <textarea className={fieldInput({ class: 'w-full' })} name='task' rows={3} />
      </label>
      <button className={button({ class: 'w-full' })} disabled={status === 'sending'} type='submit'>
        {status === 'sending' ? FORM_MESSAGES.sending : AUDIT_FORM.button}
      </button>
      {status === 'error' && <FormErrorNote />}
    </form>
  );
};
