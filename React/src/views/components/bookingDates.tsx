import react from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

interface BoookingDateProps {
    checkInDate: Dayjs;
    checkOutDate: Dayjs;
    setCheckInDate: (date: Dayjs) => void;
    setCheckOutDate: (date: Dayjs) => void;
}
const BoookingDate: React.FC<BoookingDateProps> = function({ checkInDate, checkOutDate, setCheckInDate, setCheckOutDate }){
    const currentDate = dayjs();
    return(
        <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex flex-row gap-4">
                {/* Check-in Date Picker */}
                <div className="w-1/2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Check-in</label>
                    <DateCalendar
                    value={checkInDate}
                    defaultValue={currentDate}
                    onChange={(date)=>setCheckInDate(date as Dayjs)}
                    views={['year', 'month', 'day']}
                    />
                </div>
                
                {/* Check-out Date Picker */}
                <div className="w-1/2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Check-out</label>
                    <DateCalendar
                    value={checkOutDate}
                    defaultValue={currentDate}
                    onChange={(date)=>setCheckOutDate(date as Dayjs)}
                    views={['year', 'month', 'day']}
                    />
                </div>
            </div>
        </LocalizationProvider>
        </>
    )
}
export default BoookingDate