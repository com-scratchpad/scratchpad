"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useSearchStore from "@/stores/searchStore"

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  // const [date, setDate] = React.useState<DateRange | undefined>({
  //   from: new Date(2022, 0, 20),
  //   to: addDays(new Date(2022, 0, 20), 20),
  // })
  const searchStore = useSearchStore((state) => state);

  return (
    <div className={cn("w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"ghost"}
            className={cn(
              "w-full justify-start text-xs h-0 pt-3 pl-0",
            )}
          >
            <CalendarIcon />
            {searchStore.dateRange?.from ? (
              searchStore.dateRange.to ? (
                <>
                  {format(searchStore.dateRange.from, "LLL dd, y")} -{" "}
                  {format(searchStore.dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(searchStore.dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={searchStore.dateRange?.from}
            selected={searchStore.dateRange}
            onSelect={(range) => searchStore.setDateRange(range)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
