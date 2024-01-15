import {
  extension,
  Banner,
  ProductThumbnail,
  Button,
  Image,
  Text,
  InlineStack,
  InlineLayout,
  View,
  Checkbox,
  TextField,
  BlockStack,
  Disclosure,
  Pressable,
  BlockSpacer,
  Heading,
  Divider,
  ChoiceList,
  Choice
} from "@shopify/ui-extensions/checkout";

/*const checkoutBlockRender = extension("purchase.checkout.block.render", (root, api) => customExtension(root, api));

export {checkoutBlockRender}

const checkoutShippingOptionList = extension("purchase.checkout.shipping-option-list.render-after", (root, api) => customExtension(root, api));

export {checkoutShippingOptionList}

const checkoutThankYouBlock = extension("purchase.thank-you.block.render", (root, api) => customExtension(root, api));

export {checkoutThankYouBlock}*/


//customExtensionLineItem
const checkoutLineItem = extension("purchase.checkout.cart-line-list.render-after", (root, api) =>  {
 /* const { extension, i18n} = api;
  const settings = api.settings.current;
  const variantId = settings.variant_reference || 'gid://shopify/ProductVariant/47608535023897';
  const cartLines = api.lines.subscribe();
  const applyCartLines = api.applyCartLinesChange;
  var isChecked = false;
  async function ChangeCartItem (isSelected) {
    if (isSelected) {
      console.log('TRUE')
      const queryResult = await api.applyCartLinesChange({
        type: "addCartLine",
        quantity: 1,
        merchandiseId: variantId,
      })

      console.log(queryResult)
    }
  }

  async function getVariantData() {
    if (!variantId) return null;

    const {query} = api;
    const queryResult = await query(`{
     node(id: "${variantId}") {
     ... on ProductVariant {
       title
       price {
         amount
         currencyCode
        }
       image {
        url
        altText
       }
       product {
        title
        featuredImage {
          url
          altText
        }
        }
       }
     }
    }`);

    const productVariant = queryResult.data.node;
    const heading = root.createComponent(Heading, {level:"2"}, 'Other Products You May Like');
    const divider = root.createComponent(Divider);
    const space = root.createComponent(BlockSpacer, {spacing: 'base'},);
    const pressableComponent =
      root.createComponent(Pressable, {onPress: () => {
        isChecked = !isChecked
          ChangeCartItem(isChecked)
          console.log(isChecked)
      }}, [
        root.createComponent(InlineLayout,
          {
            columns: [20, 80, 'fill'],
            spacing: ['base', 'base'],
            blockAlignment:'center',
            padding: 'base'
          },
          [
            root.createComponent(
              Checkbox,
              {
                id: 'checkbox',
                name: 'checkbox',
                checked: isChecked,
              },
            ),
            root.createComponent(Image, {
              source:
                productVariant.image?.url || productVariant.product.featuredImage?.url,
              accessibilityDescription:
                productVariant.image?.altText || productVariant.product.featuredImage?.altText,
              cornerRadius: 'base',
              border: 'base',
              borderWidth: 'base'
            }),
            root.createComponent(BlockStack, undefined, [
              root.createComponent(Text, {size: 'small'}, `${ productVariant.product.title} - ${ productVariant.title}`),
              root.createComponent(Text, {size: 'small'}, `${ productVariant.price.amount} ${ productVariant.price.currencyCode}`),
            ])
          ],
        )
      ]);


    root.appendChild(divider);
    root.appendChild(space);
    root.appendChild(heading);
    root.appendChild(pressableComponent);
  }


  getVariantData();*/
});

export {checkoutLineItem}


/*const shippingRenderBefore = extension("purchase.checkout.shipping-option-list.render-before", (root, api ) => inputDescriptionFields(root, api));
export {shippingRenderBefore};

function customExtension(root, api) {
  const { extension, i18n } = api;
  const settings = api.settings.current;
  const title =  settings.banner_title ?? "Custom banner";

  const customBanner = root.createComponent(
    Banner,
    { title: `${title}` },
    i18n.translate('welcome', {target: extension.target})
  )

  const customButton = root.createComponent(
    Button,
    {onPress: () => {
        console.log('onPress event1')
        alert("Hello")
      }},
    'Pay now',
  )

  const image = root.createComponent(Image, {
    source:
      'https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/w/o/WOPA160517_D056-resized.jpg?crop=864%2C0%2C1728%2C2304&wid=600&hei=800&scl=2.88',
  });

  //root.appendChild(image);

  if (settings.show_button) {
    //root.appendChild(customButton);
  } else {
    //root.appendChild(customBanner);
  }
}*/

// function customExtensionLineItem(root, api) {}

/*function inputDescriptionFields(root, api) {
   function onCheckboxChange(isChecked) {
    const testMeta = api.appMetafields.subscribe({
      key: 'customer_text_field',
      namespace: 'checkout-shipping',
      valueType: 'string',
      type: 'customer'
    })
  }


  const disclosure = root.createComponent(Disclosure, {}, [
    root.createComponent(
      Checkbox,
      {id: "show_text_field",
        name: "custom_checkbox",
        toggles: 'one',
        onChange: (value) => {
          console.log(api)
         onCheckboxChange();
          console.log(`onChange event with value ${value}`, typeof value);
        }
      },
      'Save this information for next time ',
    ),
    root.createComponent(
      View,
      {border: 'base', padding: 'base', id: 'one'},
      root.createComponent(
        TextField,
        {label: 'Your message',
          name: "custom_text_field",
          value:"",
          onChange: (value) => {

            console.log(`onChange event with  value ${value}`, root);
          }
        }
      )
    ),
  ]);

  // root.createComponent(
  //   View,
  //   {border: 'base', padding: 'base', id: 'one'},
  //   'Content',
  // ),

  // const disclosure = root.createComponent(
  //   Disclosure,
  //   {
  //     defaultOpen: 'one',
  //     onToggle: (open) =>
  //       console.log('onToggle event', open),
  //   },
  //   [customCheckbox, customTextField],
  // );


  // const showInputCheckbox = root.createComponent(
  //   Checkbox,
  //   {id: "show_text_field",
  //     name: "custom_checkbox",
  //     onChange: (value) => {
  //
  //     if (value === true) {
  //       root.appendChild(showInputTextField);
  //     }
  //
  //       console.log(`onChange event with value ${value}`);
  //     }
  //   },
  //   'Save this information for next time',
  //
  // )
  //
  // const showInputTextField = root.createComponent(
  //   TextField,
  //   {label: 'Your message',
  //     name: "custom_text_field",
  //     onChange: (value) => {
  //
  //       console.log(`onChange event with value ${value}`);
  //     }
  //   }
  //
  // )



  root.appendChild(disclosure);
}*/




// checked: () => {
//   console.log(121212121333)
// }


// const cartLines = api.lines();
// const applyCartLineChange = api.applyCartLinesChange();
// var isSelected = false;
// function ChangeCartItem () {
//   if (isSelected) {
//     applyCartLineChange({
//       type: "addCartLine",
//       quality: 1,
//       merchandiseId: variantId,
//     })
//   } else {
//     const cartLineID = cartLines.find(
//       cartLine => cartLine.merchandise.id === variantId
//     )?.id
//
//     if (cartLineID) {
//       applyCartLineChange({
//         type: "removeCartLine",
//         id: cartLineID,
//         quantity: 1,
//       })
//     }
//   }
// }
