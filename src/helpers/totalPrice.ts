export const totalPrice = (amount: number) => {

  const discounted = amount * 0.75;
  const tax = discounted * 0.1;
  const shipping = 0;
  const total = discounted + shipping + tax;

  return { discounted, tax, shipping, total };
};
