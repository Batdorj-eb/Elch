// components/layout/NavigationBar.tsx

import React from 'react';
import { getCategories } from '@/lib/api';
import NavigationMenu from './NavigationMenu';

const NavigationBar = async () => {
  const categories = await getCategories();

  return <NavigationMenu categories={categories} />;
};

export default NavigationBar;