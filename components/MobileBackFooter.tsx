'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

interface MobileBackFooterProps {
  className?: string;
}

export default function MobileBackFooter({ className = '' }: MobileBackFooterProps) {
  const [shouldShow, setShouldShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // HOOK 1: Main logic effect - always called
  useEffect(() => {
    // Check if mobile and set state
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    // Initial check
    checkMobile();

    // Check navigation source
    const checkNavigation = () => {
      let fromMainPage = false;

      // Check sessionStorage
      try {
        const navigationSource = sessionStorage.getItem('honestfarming-navigation-source');
        if (navigationSource === 'main-page') {
          fromMainPage = true;
        }
      } catch {
        // Silently handle sessionStorage errors
      }

      // Check referrer as fallback
      if (!fromMainPage) {
        const referrer = document.referrer;
        const currentOrigin = window.location.origin;
        
        fromMainPage = referrer === currentOrigin || 
                      referrer === `${currentOrigin}/` ||
                      (referrer.includes(currentOrigin) && 
                       !referrer.includes('/garden') && 
                       !referrer.includes('/truthexchange') &&
                       !referrer.includes('/api'));
      }
      
      // TEMPORARY: Always show on mobile for testing
      setShouldShow(isMobile);
      // setShouldShow(isMobile && fromMainPage);
    };

    // Run checks
    checkNavigation();

    // Listen for resize
    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // HOOK 2: Body padding effect - always called
  useEffect(() => {
    if (shouldShow) {
      document.body.style.paddingBottom = '70px';
    } else {
      document.body.style.paddingBottom = '';
    }

    return () => {
      document.body.style.paddingBottom = '';
    };
  }, [shouldShow]);

  // Conditional rendering AFTER all hooks
  if (!shouldShow) {
    return null;
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-stone-100 dark:bg-stone-800 border-t-2 border-stone-800 dark:border-stone-600 shadow-lg transition-all duration-300 ${className}`}>
        <div className="container mx-auto px-4 py-3">
          <Link 
            href="/"
            className="flex items-center justify-center space-x-3 text-stone-700 dark:text-stone-300 hover:text-green-700 dark:hover:text-green-400 transition-all duration-300 font-semibold hover:scale-105 active:scale-95"
            onClick={() => {
              try {
                sessionStorage.removeItem('honestfarming-navigation-source');
              } catch {
                // Silently fail if sessionStorage is not available
              }
            }}
          >
            <ArrowLeft size={20} className="flex-shrink-0" />
            <Home size={20} className="flex-shrink-0" />
            <span className="text-sm sm:text-base">Back to Honest Farming</span>
          </Link>
        </div>
      </div>
  );
}