import type { APIRequestContext, APIResponse } from '@playwright/test';

const API_BASE_URL = 'https://fakestoreapi.com';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

export interface NewProduct {
  title: string;
  price: number;
  description: string;
  category: string;
}

export interface NewUser {
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

export interface CreatedResource {
  id: number;
  title?: string;
  username?: string;
}

export class FakeStoreApi {
  constructor(private readonly request: APIRequestContext) {}

  getProduct(id: number): Promise<APIResponse> {
    return this.request.get(`${API_BASE_URL}/products/${id}`);
  }

  createProduct(product: NewProduct): Promise<APIResponse> {
    return this.request.post(`${API_BASE_URL}/products`, { data: product });
  }

  createUser(user: NewUser): Promise<APIResponse> {
    return this.request.post(`${API_BASE_URL}/users`, { data: user });
  }
}
