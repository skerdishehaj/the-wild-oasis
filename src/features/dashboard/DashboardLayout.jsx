import styled from 'styled-components';
import Stats from './Stats';
import { useRecentBookings } from './useRecentsBookings';
import { useRecentStays } from './useRecentStays';
import { useCabins } from '../cabins/useCabins';
import Spinner from '../../ui/Spinner';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isBookingsLoading } = useRecentBookings();
  const {
    confirmedStays,
    isLoading: isStaysLoading,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isCabinsLoading } = useCabins();

  if (isBookingsLoading || isStaysLoading || isCabinsLoading)
    return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
