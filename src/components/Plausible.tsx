'use client';

import { useEffect } from 'react';

export default function Plausible() {
  useEffect(() => {
    import('@plausible-analytics/tracker').then(({ init }) => {
      init({
        domain: 'hydrodactyl.dev',
      });
    });
  }, []);

  return null;
}
