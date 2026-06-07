import { noInferrableReturnType, type NoInferrableReturnTypeRule } from './no-inferrable-return-type.ts';
import { noCommentsExceptPattern, type NoCommentsExceptPatternRule } from './no-comments-except-pattern.ts';

export const customRules: {
  readonly 'no-inferrable-return-type': NoInferrableReturnTypeRule;
  readonly 'no-comments-except-pattern': NoCommentsExceptPatternRule;
} = {
  'no-inferrable-return-type': noInferrableReturnType,
  'no-comments-except-pattern': noCommentsExceptPattern,
} as const;
