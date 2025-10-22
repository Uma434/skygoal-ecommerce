import DOMPurify from 'dompurify';

export const sanitizeInput = (input: string): string => {
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
  }
  return input;
};

export const validateName = (name: string): boolean => {
  const regex = /^[a-zA-Z0-9\s]+$/;
  return regex.test(name);
};

export const validatePrice = (price: number): boolean => {
  return price > 0;
};

export const validateQuantity = (quantity: number): boolean => {
  return Number.isInteger(quantity) && quantity > 0;
};

export const validateSKU = (sku: string, existingProducts: any[]): boolean => {
  return !existingProducts.some((product) => product.sku === sku);
};

export const formatPrice = (price: number | string): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numPrice)) {
    return '$0.00';
  }
  return `$${numPrice.toFixed(2)}`;
};
