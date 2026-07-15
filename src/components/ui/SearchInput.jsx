import { forwardRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from './Input';

export const SearchInput = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/50" />
      <Input
        ref={ref}
        className="pl-10"
        type="search"
        {...props}
      />
    </div>
  );
});
SearchInput.displayName = 'SearchInput';
