const request = require('supertest');
const app = require('../app');

let authToken;

beforeAll(async () => {
  // Get authentication token
  const response = await request(app)
    .post('/api/auth/login')
    .send({
      username: 'admin',
      password: 'password123'
    });
  
  authToken = response.body.token;
});

describe('Product API Tests', () => {
  test('should get all products', async () => {
    const response = await request(app)
      .get('/api/products');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should create a new product', async () => {
    const product = {
      name: 'Test Product',
      description: 'Test Description',
      price: 99.99,
      imageUrl: 'https://example.com/image.jpg'
    };

    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send(product);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(product.name);
  });

  test('should return 401 for unauthorized product creation', async () => {
    const product = {
      name: 'Test Product',
      description: 'Test Description',
      price: 99.99,
      imageUrl: 'https://example.com/image.jpg'
    };

    const response = await request(app)
      .post('/api/products')
      .send(product);
    
    expect(response.status).toBe(401);
  });

  test('should return 400 for invalid product data', async () => {
    const invalidProduct = {
      name: 'Test Product',
      // Missing required fields
    };

    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send(invalidProduct);
    
    expect(response.status).toBe(400);
  });
}); 