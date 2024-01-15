import {useEffect, useState } from "react";
import {
  Disclosure,
  Button,
  View,
  TextField,
  Icon,
  Banner,
  Image,
  Text,
  InlineLayout,
  Checkbox,
  BlockStack,
  BlockSpacer,
  Heading,
  Divider,
  Pressable,
  useApi,
  useCartLines,
  useApplyCartLinesChange,
  useCustomer,
  useNote,
  useApplyNoteChange,
  reactExtension,
} from '@shopify/ui-extensions-react/checkout';
import {extension} from "@shopify/ui-extensions/checkout";

// export default reactExtension(
//   'purchase.checkout.cart-line-list.render-after',
//   () => <Extension />,
// );

const checkoutLineItem = reactExtension(
  'purchase.checkout.cart-line-list.render-after',
  () => <ExtensionCartLineList />,
)

function ExtensionCartLineList() {
  const { extension, settings, query } = useApi();
  const variantId = settings.variant_reference || 'gid://shopify/ProductVariant/47608535023897';
  const [variantData, setVariant] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const cartLines = useCartLines();
  const applyCartLinesChange = useApplyCartLinesChange();

  useEffect(()=>{
    async function getVariantData() {
      if (!variantId) return null;

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
      }`)

      if (queryResult.data) {
        setVariant(queryResult.data.node);

      }
    }

    if (variantId) getVariantData();
  }, [])

  useEffect(()=> {
    if (isSelected) {
      applyCartLinesChange({
        type: "addCartLine",
        quantity: 1,
        merchandiseId: variantId,
      });
    } else {
      const cartLineId = cartLines.find(
        (cartLine) => cartLine.merchandise.id === variantId
      )?.id

      if (cartLineId) {
        applyCartLinesChange({
          type: "removeCartLine",
          quantity: 1,
          id: cartLineId,
        });
      }
    }
  },[isSelected])

  if (!variantData) return null;

  return (
    <>
      <Divider/>
      <BlockSpacer spacing='base'></BlockSpacer>
      <Heading level={2}>Other Products You May Like</Heading>

      <Pressable
        onPress={()=> setIsSelected(!isSelected)}
      >
        <InlineLayout columns={[20, 80, 'fill']} spacing={['base', 'base']} blockAlignment='center' padding='base'>
          <Checkbox id='checkbox' name='checkbox' checked={isSelected}></Checkbox>

          <Image
            cornerRadius='base'
            border='base'
            borderWidth='base'
            source={`${variantData.image?.url || variantData.product.featuredImage?.url}`}
            accessibilityDescription={`${variantData.image?.altText || variantData.product.featuredImage?.altText}`}></Image>

          <BlockStack>
            <Text size='small'>
              { variantData.product.title} - { variantData.title}
            </Text>

            <Text size='small'>
              { variantData.price.amount} { variantData.price.currencyCode}
            </Text>
          </BlockStack>
        </InlineLayout>
      </Pressable>
    </>
  )
}

export {checkoutLineItem}

const checkoutShippingOptionList = reactExtension("purchase.checkout.shipping-option-list.render-after",
  () => <ExtensionShippingOptionList />,
)

function ExtensionShippingOptionList() {
  const { settings, query } = useApi();
  const [isOpen, setIsOpen] = useState(false);
  const [Message, setMessage] = useState(null);
  const customer = useCustomer();
  const useOrderNote = useNote();
  const changeOrderNote = useApplyNoteChange();

  console.log("customer, useOrderNote, changeOrderNote", customer, useOrderNote, changeOrderNote)

  useEffect(()=>{
    changeOrderNote({
      type: "updateNote",
      note: Message,
    }, [Message]);
  })


  return (
    <>
      <Divider />
      <BlockSpacer spacing='base'></BlockSpacer>
      <Disclosure defaultOpen="false">
        <Pressable
          minInlineSize="100%"
          maxInlineSize="fill"
          toggles="one"
          onPress={()=> setIsOpen(!isOpen)}>
          <InlineLayout
            blockAlignment="center"
            spacing="base"
            columns={["auto", "fill", "auto"]}
          >
            <Icon
              source="pen"
              appearance="subdued"
            ></Icon>
            <Text size='base'>
              Add Note
            </Text>
            <Icon
              source={isOpen ? 'chevronUp' : 'chevronDown' }
              appearance="subdued"
            ></Icon>

          </InlineLayout>
        </Pressable>

        <BlockSpacer spacing='base'></BlockSpacer>
        <View id="one">
          <TextField
            onChange={setMessage}
            value={useOrderNote ? useOrderNote : null}
            label="Your messsage"></TextField>
        </View>
      </Disclosure>

    </>
  )
}

export {checkoutShippingOptionList}



