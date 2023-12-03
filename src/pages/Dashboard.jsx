import DashboardFilter from '../features/dashboard/DashboardFilter';
import DashboardLayout from '../features/dashboard/DashboardLayout';
import { useRecentStays } from '../features/dashboard/useRecentStays';
import { useRecentBookings } from '../features/dashboard/useRecentsBookings';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Spinner from '../ui/Spinner';

/**
 * Bookings are the actual reservations made by customers. (sales)
 *
 * Stays are the actual check-ins of guests as they arrive for their bookings.
 * We can identify stays by their start date together with the check-in or check-out status.
 */

function Dashboard() {
  const { bookings, isLoading: isBookingsLoading } = useRecentBookings();
  const { stays, confirmedStays, isLoading: isStaysLoading } = useRecentStays();
  if (isBookingsLoading || isStaysLoading) return <Spinner />;
  console.log(bookings);
  console.log(stays);
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
