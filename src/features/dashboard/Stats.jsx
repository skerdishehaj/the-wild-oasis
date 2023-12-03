import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1. Calculate the total number of bookings
  const numBookings = bookings.length;

  // 2. Calculate the total sales
  const sales = bookings.reduce((acc, booking) => {
    return acc + booking.totalPrice;
  }, 0);

  // 3. Calculate the total number of check ins
  const numCheckIns = confirmedStays.length;

  // 4. Calculate the occupancy rate
  // occupancy rate = number of check ins nights / all available nights (num of nights * num of cabins)
  const occupancyRate =
    confirmedStays.reduce((acc, stay) => {
      return acc + stay.numNights;
    }, 0) /
    (numDays * cabinCount);

  console.log(cabinCount);
  console.log(numDays);
  console.log(
    confirmedStays.reduce((acc, stay) => {
      return acc + stay.nights;
    }, 0),
  );

  return (
    <>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title='Check ins'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={numCheckIns}
      />
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100) + '%'}
      />
    </>
  );
}

export default Stats;
