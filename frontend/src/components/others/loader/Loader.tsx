import React from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import loadingAnimation from '../../../../public/lottiefiles/loader.json'; 
import { LoaderProps, LoaderSize } from '../../../lib/types/lottie/type';

const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  fullScreen = false,
  backgroundColor = 'bg-white',
  opacity = '75',
  className = '',
  animationSpeed = 1,
}) => {
  const lottieRef = React.useRef<LottieRefCurrentProps>(null);
  
  // Size classes mapping
  const sizeClasses: Record<LoaderSize, string> = {
    xs: 'w-12 h-12',
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  // Container classes based on props
  const containerClasses = fullScreen
    ? `fixed inset-0 flex items-center justify-center ${backgroundColor} bg-opacity-${opacity} z-50 ${className}`
    : `flex items-center justify-center ${className}`;

  React.useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(animationSpeed);
    }
  }, [animationSpeed]);

  return (
    <div className={containerClasses} data-testid="loader">
      <div className={sizeClasses[size]}>
        <Lottie 
          animationData={loadingAnimation} 
          loop={true}
          autoplay={true}
          lottieRef={lottieRef}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice'
          }}
        />
      </div>
    </div>
  );
};

export default Loader;