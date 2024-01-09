describe('reservation', () => {
    beforeAll(async () => {
        const user = {
            email: 'testUser@gmail.com',
            password: 'StrongPassword!@',
        };
        const response = await fetch('http://auth:3001/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(user),
        });
        // TODO: set-cookie 담기지 않음
        console.log(response.headers);
    });

    test('reservation', async () => {
        const response = await fetch('http://reservation:3000');
        expect(response.ok).toBeTruthy();
    });
});
