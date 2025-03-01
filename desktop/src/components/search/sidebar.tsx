import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { SearchInput } from "./search_input"
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useId, useState } from "react";

type FilterOption = { value: string; label: string };

type FilterConfig = {
  id: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'radio' | 'checkbox' | 'range';
  options?: FilterOption[];
  defaultValue?: string | number;
  min?: number;
  max?: number;
  description?: string;
}

export function AppSidebar() {
  const filters: FilterConfig[] = [
    {
      id: 'filetypes',
      label: 'Filetypes',
      placeholder: '.txt, .csv ...',
      type: 'text',
    },
    {
      id: 'date-range',
      label: 'Date Range',
      placeholder: '01/04/2021 - 01/05/2021',
      type: 'text',
    },
    {
      id: 'size',
      label: 'File Size',
      placeholder: '< 10MB',
      type: 'text',
    },
    {
      id: 'content-type',
      label: 'Content Type',
      type: 'radio',
      options: [
        { value: 'any', label: 'Any content' },
        { value: 'documents', label: 'Documents only' },
        { value: 'media', label: 'Media only' },
      ],
      defaultValue: 'any'
    },
    {
      id: 'language-complexity',
      label: 'Language Complexity',
      type: 'radio',
      options: [
        { value: 'simple', label: 'Simple' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'advanced', label: 'Advanced' },
      ],
      defaultValue: 'moderate',
    },
    {
      id: 'ai-generation-source',
      label: 'AI Generation Source',
      type: 'checkbox',
      options: [
        { value: 'chatgpt', label: 'ChatGPT' },
        { value: 'claude', label: 'Claude' },
        { value: 'gemini', label: 'Gemini' },
        { value: 'native', label: 'Human-written' },
        { value: 'unknown', label: 'Unknown' },
      ],
    },
    {
      id: 'semantic-relevance',
      label: 'Semantic Relevance',
      type: 'range',
      min: 0,
      max: 100,
      defaultValue: 70,
    },
    {
      id: 'domain-expertise',
      label: 'Domain Expertise Level',
      type: 'radio',
      options: [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'expert', label: 'Expert' },
      ],
      defaultValue: 'intermediate',
    },
    {
      id: 'factuality',
      label: 'Factuality Score',
      type: 'range',
      min: 0,
      max: 100,
      defaultValue: 80,
    }
  ];

  const [filterValues, setFilterValues] = useState<Record<string, any>>(() => {
    const defaults: Record<string, any> = {};
    filters.forEach(filter => {
      if (filter.defaultValue !== undefined) {
        defaults[filter.id] = filter.defaultValue;
      } else if (filter.type === 'checkbox') {
        defaults[filter.id] = [];
      }
    });
    return defaults;
  });

  const handleFilterChange = (id: string, value: any) => {
    setFilterValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const renderFilter = (filter: FilterConfig) => {
    const inputId = useId();
    
    switch (filter.type) {
      case 'text':
        return (
          <div key={filter.id} className="group relative w-full mb-4">
            <label
              htmlFor={`${inputId}-${filter.id}`}
              className="bg-background text-xs text-sidebar-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 font-normal group-has-disabled:opacity-50"
            >
              {filter.label}
            </label>
            <Input 
              id={`${inputId}-${filter.id}`}
              className="text-xs h-8" 
              placeholder={filter.placeholder} 
              value={filterValues[filter.id] || ''}
              onChange={(e) => handleFilterChange(filter.id, e.target.value)}
            />
          </div>
        );
      
      case 'radio':
        return (
          <div key={filter.id} className="w-full mb-4">
            <div className="relative w-full">
              <span className="bg-background text-xs text-sidebar-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 font-normal">
                {filter.label}
              </span>
              <div className="border rounded-md px-3 pb-2 pt-3 space">
                <RadioGroup 
                  value={filterValues[filter.id] || filter.defaultValue}
                  onValueChange={(value) => handleFilterChange(filter.id, value)}
                >
                  {filter.options?.map(option => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem
                        id={`${inputId}-${filter.id}-${option.value}`}
                        value={option.value}
                      />
                      <Label className="text-xs" htmlFor={`${inputId}-${filter.id}-${option.value}`}>
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 'range':
        return (
          <div key={filter.id} className="w-full mb-4">
            <div className="relative w-full mb-1">
              <span className="bg-background text-xs text-sidebar-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 font-normal">
                {filter.label}
              </span>
              <div className="border rounded-md p-3 pt-2">
                <Slider
                  id={`${inputId}-${filter.id}`}
                  defaultValue={[filterValues[filter.id] || filter.defaultValue]}
                  min={filter.min}
                  max={filter.max}
                  step={1}
                  onValueChange={(value) => handleFilterChange(filter.id, value[0])}
                />
                <div className="flex justify-between text-xs mt-2">
                  <span>{filter.min}</span>
                  <span>{filterValues[filter.id] || filter.defaultValue}</span>
                  <span>{filter.max}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SearchInput />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="pt-4">
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col items-start w-full">
              {filters.map(renderFilter)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
