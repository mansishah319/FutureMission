import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50'
        >
          <Globe className='h-4 w-4' />
          <span className='uppercase font-medium'>{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='glass-card border-border/50'>
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={language === 'en' ? 'text-dp-teal' : ''}
        >
          <span className='mr-2'>🇬🇧</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('ar')}
          className={language === 'ar' ? 'text-dp-teal' : ''}
        >
          <span className='mr-2'>🇦🇪</span>
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
