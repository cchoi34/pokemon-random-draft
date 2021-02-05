import { RuleCardData } from './dataTypes';

export function modifyDataForHomeState(
  title: string,
  description: string,
  color: string,
): RuleCardData {
  return {
    title,
    description,
    color,
  };
}