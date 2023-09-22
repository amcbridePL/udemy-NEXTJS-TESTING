import { render, screen } from '@testing-library/react';

import BandComponent from '@/pages/bands/[bandId]';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';

test("band component display correct band information", async() => {
    const { fakeBands } = await readFakeData();
    render(<BandComponent error={null} band={fakeBands[0]} />);

    const heading = screen.getByRole('heading', { name: /the wandering bunnies/i });
    expect(heading).toBeInTheDocument();
    
});

test("band component displays an error if no band is provided", () => {
    render(<BandComponent error={'Trouble finding a band'} band={null} />);

    const errorHeading = screen.getByRole('heading', { name: /trouble finding a band/i });
    expect(errorHeading).toBeInTheDocument();
});