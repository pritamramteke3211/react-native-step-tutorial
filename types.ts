import {ViewStyle} from 'react-native';

export type TutorialStep = {
  description: string;
  layout?: ViewStyle;
  renderHighlight?: (layout: ViewStyle) => JSX.Element; // optional custom render for that step
};
