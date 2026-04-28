import React, { useEffect, useState } from 'react';
import { mockStore } from '../../data/mockStore';
import { formatTime } from '../../lib/utils';
import type { TimeSlot } from '../../data/types';

interface SlotPickerProps {
  doctorId: string;
  date: string;
  onSlotSelect: (slot: TimeSlot) => void;
  selectedSlot?: TimeSlot;
}

export const SlotPicker: React.FC<SlotPickerProps> = ({ doctorId, date, onSlotSelect, selectedSlot }) => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    const availableSlots = mockStore.getAvailableSlots(doctorId, date);
    setSlots(availableSlots);
  }, [doctorId, date]);

  if (slots.length === 0) {
    return <p className="text-gray-500">No available slots for this date.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((slot) => (
        <button
          key={slot.time}
          onClick={() => slot.isAvailable && onSlotSelect(slot)}
          disabled={!slot.isAvailable}
          className={`p-2 rounded border ${
            selectedSlot?.time === slot.time
              ? 'bg-[#A8D98A] border-[#A8D98A] text-[#1E2A6E]'
              : slot.isAvailable
              ? 'border-gray-300 hover:border-[#A8D98A] cursor-pointer'
              : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
          }`}
        >
          {formatTime(slot.time)}
        </button>
      ))}
    </div>
  );
};
