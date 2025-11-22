// components/layout/NavigationBar.tsx

import React from 'react';
import { getCategories } from '@/lib/api';
import NavigationMenu from './NavigationMenu';

interface NavigationBarProps {
  activeCategory?: string;
}

const NavigationBar = async ({ activeCategory }: NavigationBarProps) => {
  const categories = await getCategories();

  return <NavigationMenu categories={categories} activeCategory={activeCategory} />;
};

export default NavigationBar;