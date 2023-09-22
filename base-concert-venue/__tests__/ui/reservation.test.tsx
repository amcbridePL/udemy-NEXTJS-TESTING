import { render, screen } from '@testing-library/react';
import { Reservation } from '@/components/reservations/Reservation';
import { UserReservations } from '@/components/user/UserReservations';


test('reservation page shows correct number of seats', async () => {
    // show id does not matter, because the handler does not take
    //   a show id as an argument
    render(<Reservation showId={0} submitPurchase={jest.fn()} />);

    const seatCountText = await screen.findByText(/10 seats left/i);
    expect(seatCountText).toBeInTheDocument();
    
});

test('reservation page shows "sold out" message and NO purchase button if there are no seats available', async () => {
    render(<Reservation showId={1} submitPurchase={jest.fn()} />);

    const soldOutText = await screen.findByText(/sold out/i);
    expect(soldOutText).toBeInTheDocument();

    // use "queryBy..." when you expect it NOT to be in the document
    // don't need to await again, already awaited once
    const purchaseButton = screen.queryByRole('button', { name: /purchase/i});
    expect(purchaseButton).not.toBeInTheDocument();
});

it('reservation page shows "purchase tickets" when no user with no reservations is logged in', async() => {
    render(<UserReservations userId={0} />);

    const purchaseButton = await screen.findByRole('button', { name: /purchase tickets/i});
    expect(purchaseButton).toBeInTheDocument();

    const ticketsHeading = screen.queryByRole('heading', { name: /your tickets/i });
    expect(ticketsHeading).not.toBeInTheDocument();
});