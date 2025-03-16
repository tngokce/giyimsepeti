#!/bin/bash

# Replace with your actual token
TOKEN="YOUR_TOKEN_HERE"

# Create a sample order
curl -X POST http://localhost:3000/api/order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "address_id": 1,
    "order_date": "2023-06-15T10:30:00Z",
    "card_no": 4111111111111111,
    "card_name": "John Doe",
    "card_expire_month": 12,
    "card_expire_year": 2025,
    "card_ccv": 123,
    "price": 299.99,
    "products": [
      {
        "product_id": 1,
        "count": 2,
        "detail": "T-shirt"
      },
      {
        "product_id": 3,
        "count": 1,
        "detail": "Jeans"
      }
    ]
  }' 