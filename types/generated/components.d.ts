import type { Schema, Attribute } from '@strapi/strapi';

export interface ArtworkAvailability extends Schema.Component {
  collectionName: 'components_artwork_availabilities';
  info: {
    displayName: 'Availability';
  };
  attributes: {
    isAvailable: Attribute.Boolean;
    availability: Attribute.Enumeration<
      ['Available', 'Unavailable', 'Sold', 'On Loan', 'On Consignment']
    > &
      Attribute.DefaultTo<'Available'>;
  };
}

export interface ArtworkDimensions extends Schema.Component {
  collectionName: 'components_artwork_dimensions';
  info: {
    displayName: 'Dimensions';
    description: '';
  };
  attributes: {
    height: Attribute.Integer;
    width: Attribute.Integer;
    depth: Attribute.Decimal & Attribute.DefaultTo<2>;
    dimensions: Attribute.String;
  };
}

export interface ArtworkPrice extends Schema.Component {
  collectionName: 'components_artwork_prices';
  info: {
    displayName: 'Price';
  };
  attributes: {
    price: Attribute.Decimal;
    formattedPrice: Attribute.String;
  };
}

export interface LocationAddress extends Schema.Component {
  collectionName: 'components_location_addresses';
  info: {
    displayName: 'Address';
  };
  attributes: {
    adressLineOne: Attribute.String;
    addressLineTwo: Attribute.String;
    City: Attribute.String;
    state: Attribute.String;
    zip: Attribute.String;
    label: Attribute.String;
  };
}

export interface LocationLocation extends Schema.Component {
  collectionName: 'components_location_locations';
  info: {
    displayName: 'Location';
  };
  attributes: {
    location: Attribute.String;
    locationDetail: Attribute.String;
    dateMoved: Attribute.Date;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'artwork.availability': ArtworkAvailability;
      'artwork.dimensions': ArtworkDimensions;
      'artwork.price': ArtworkPrice;
      'location.address': LocationAddress;
      'location.location': LocationLocation;
    }
  }
}
