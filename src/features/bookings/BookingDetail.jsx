import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from './useDeleteBooking';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { booking, isLoading } = useBooking();

  const { status, id: bookingId } = booking || {};

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resource='booking' />;

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens='delete'>
            <Button variation='danger'>Delete</Button>
          </Modal.Open>

          <Modal.Window name='delete'>
            <ConfirmDelete
              resourceName='booking'
              disabled={isDeleting}
              onConfirm={() => {
                deleteBooking(bookingId, { onSettled: moveBack });
              }}
            />
          </Modal.Window>
        </Modal>

        {status === 'checked-in' && (
          <Button disabled={isCheckingOut} onClick={() => checkout(bookingId)}>
            Check out
          </Button>
        )}
        {status === 'unconfirmed' && <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>}
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
