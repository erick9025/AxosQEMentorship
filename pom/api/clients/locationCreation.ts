import type { APIRequestContext, APIResponse } from '@playwright/test';

const PLACES_ENDPOINT =
  'https://rahulshettyacademy.com/maps/api/place';

export type LocationPayload = {
  location: {
    lat: number;
    lng: number;
  };
  accuracy: number;
  name: string;
  phone_number: string;
  address: string;
  types: string[];
  website: string;
  language: string;
};

const API_KEY = process.env.MAPS_API_KEY ?? 'qaclick123';

export class LocationCreation {
  constructor(private readonly request: APIRequestContext) {}

  createLocation(location: LocationPayload): Promise<APIResponse> {
    return this.request.post(`${PLACES_ENDPOINT}/add/json`, {
      params: { key: API_KEY },
      data: location,
    });
  }

  getLocation(placeId: string): Promise<APIResponse> {
    return this.request.get(`${PLACES_ENDPOINT}/get/json`, {
      params: {
        key: API_KEY,
        place_id: placeId,
      },
    });
  }
}