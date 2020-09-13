/*
 * Dashboard and Widgets Messages
 *
 * This contains all the text for the Dashboard and Widgets page.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Card';

export default defineMessages({
  see_detail: {
    id: `${scope}.Post.see_detail`,
    defaultMessage: 'See Detail',
  },
  add_cart: {
    id: `${scope}.Post.add_cart`,
    defaultMessage: 'Add to cart',
  },
});
