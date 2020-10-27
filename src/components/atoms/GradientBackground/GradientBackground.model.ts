export type GradientType = {
  angle?: string;
  colors: string[];
};

export interface IProps {
  background: string;
  children?: JSX.Element[] | JSX.Element;
  className?: string;
  gradient?: GradientType;
}
