import axios from 'axios';

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});

describe('GET /users', () => {
  it('should return 403 status for not logged user', async () => {
    try {
      await axios.get('/api/users');
    } catch (e) {
      expect(e.response.status).toBe(403);
    }
  });
});

describe('User logged in', () => {
  let jwtToken: string;
  beforeEach(async () => {
    const response = await axios.post('/api/auth/login', {
      username: 'user',
      password: '123Password!',
    });
    ({ access_token: jwtToken } = response.data);
  });

  describe('GET /api/users', () => {
    it('should return 403 status for logged user', async () => {
      try {
        await axios.get('/api/users', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
      } catch (e) {
        expect(e.response.status).toBe(403);
      }
    });
  });
});

describe('Admin logged in', () => {
  let jwtToken: string;
  beforeEach(async () => {
    const response = await axios.post('/api/auth/login', {
      username: 'admin',
      password: '123Password!',
    });
    ({ access_token: jwtToken } = response.data);
  });

  describe('GET /api/users', () => {
    it('should return 200 status for logged admin', async () => {
      const res = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      expect(res.status).toBe(200);
    });
    it('should return empty(or not) list for logged admin', async () => {
      const res = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      expect(res.data instanceof Array).toBeTruthy();
    });
  });
});
