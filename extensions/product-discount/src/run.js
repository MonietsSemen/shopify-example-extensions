import { DiscountApplicationStrategy } from "../generated/api";

var EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

export function run(input) {
 // var config = BULK_DISCOUNTS;
  var config = input.shop.metafield && JSON.parse(input.shop.metafield.value);


  var targets = input.cart.lines
    .filter((line) => line.merchandise.__typename == 'ProductVariant')
    .map((line) => {
      var variant = line.merchandise;
      var meta = line.merchandise.product.metafield && line.merchandise.product.metafield.value;

      console.log('line.merchandise', meta)

      return {
        productVariant: {
          id: variant.id
        }
      }
    });

  var cartLinesQuantityTotal = input.cart.lines.reduce((total, line) => {
    total += line.quantity;
    return total;
  }, 0);

  var bulkDiscountActive = config.reduce((activeDiscount, bulkDiscount) => (
    cartLinesQuantityTotal >= bulkDiscount.quantity &&
    (!activeDiscount || bulkDiscount.quantity > activeDiscount.quantity)
      ? bulkDiscount
      : activeDiscount
  ), null);

  // var bulkDiscountActive = config.find((bulkDiscount) => {
  //   console.log(bulkDiscount.quantity)
  //   return cartLinesQuantityTotal <= bulkDiscount.quantity;
  // });


  if (!bulkDiscountActive) {
    console.error('No cart lines qualify for this discount.');
    return EMPTY_DISCOUNT;
  }

  return {
    discounts: [
      {
        targets,
        value: {
          percentage: {
            value: bulkDiscountActive.discount
          }
        },
        message: bulkDiscountActive.message
      }
    ],
    discountApplicationStrategy: DiscountApplicationStrategy.First,
  };
};
