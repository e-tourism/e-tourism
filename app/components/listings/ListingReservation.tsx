'use client';

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  dateRange: Range,
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  onChangeLogement:(value: boolean) => void;
  onChageEvenement:(value: string) => void; 
}

const ListingReservation: React.FC<
  ListingReservationProps
> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  onChangeLogement,
  onChageEvenement,
}) => {
  return ( 
    <div 
      className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
    >
      <div className="
      flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
         
        </div>
        <div className="font-light text-neutral-600">
          night
        </div>
      </div>
      <hr />
      <div className="
      flex flex-col gap-1 p-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">evenements</label>
        <select onChange={(e)=>onChageEvenement(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value='evene 1'>
            evene 1
          </option>
          <option value='evene 2'>
            evene 2
          </option>
        </select>
        
      </div>
      <div className="
      flex flex-row items-center gap-1 p-4">
        <input  type="checkbox" />
        <label className="block text-sm font-medium text-gray-900 dark:text-white">voulez vous un logement ?</label>
        
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => 
          onChangeDate(value.selection)}
      />
      
      <div className="p-4">
        <Button 
          disabled={disabled} 
          label="Reserve" 
          onClick={onSubmit}
        />
      </div>
      <hr />
      <div 
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>
          Total
        </div>
        <div>
          $ {totalPrice}
        </div>
      </div>
    </div>
   );
}
 
export default ListingReservation;