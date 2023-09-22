import { render, screen } from '@testing-library/react';
import { UserReservations } from '@/components/user/UserReservations';
import { fakeUserReservations } from '../__mocks__/fakeData/userReservations';

test('user reservations has a purchase button with correct text', async() => {
    render(<UserReservations userId={1} />);

    const button = await screen.findByRole("button", {
        name: /purchase more tickets/i,
    });
    expect(button).toBeInTheDocument();

});