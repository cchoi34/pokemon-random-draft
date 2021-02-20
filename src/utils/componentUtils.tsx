import { RuleCardData } from './dataTypes';

export const POKEBALL_ANIMATION_DELAY = 1200;
export const MAX_SELECTED_DRAFT_POKEMON = 10;

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

export function generateFormErrorMessage(message: string) {
  return <p className="error-message">{message}</p>;
}

export function capitalizeFirstLetter(text: string) {
  const first = text.substr(0, 1);
  const others = text.substr(1);
  return first.toUpperCase().concat(others);
}