
export type LoaderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface LoaderProps {
  size?: LoaderSize;
  fullScreen?: boolean;
  backgroundColor?: string;
  opacity?: string;
  className?: string;
  animationSpeed?: number;
}