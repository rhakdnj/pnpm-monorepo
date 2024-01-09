import { ping } from 'tcp-ping';

describe('Health Check', () => {
    test('reservation', async () => {
        const response = await fetch('http://reservation:3000');
        expect(response.ok).toBeTruthy();
    });

    test('auth', async () => {
        const response = await fetch('http://auth:3001');
        expect(response.ok).toBeTruthy();
    });

    test('payment', (done) => {
        ping({ address: 'payment', port: 3003 }, (err) => {
            if (err) {
                fail();
            }
            done();
        });
    });

    test('notification', (done) => {
        ping({ address: 'notification', port: 3004 }, (err) => {
            if (err) {
                fail();
            }
            done();
        });
    });
});
