// goal of this file is to read JSON from the fake data, 
//      then write it to the DB files in mock db
import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import { filenames, writeJSONToFile } from '@/lib/db/db-utils'

export const resetDB = async () => {
    // failsafe against resetting production db!
    const safeToReset = process.env.NODE_ENV === "test" || process.env.CYPRESS;
    if(!safeToReset){
        console.log("WARNING: database reset unavailable outside test environment!");
        return;
    }

    const { fakeShows, fakeBands, fakeUsers, fakeReservations } = await readFakeData();
    // overwrite data in files
    await Promise.all([
        writeJSONToFile(filenames.bands, fakeBands),
        writeJSONToFile(filenames.shows, fakeShows),
        writeJSONToFile(filenames.users, fakeUsers),
        writeJSONToFile(filenames.reservations, fakeReservations),
    ]);

}