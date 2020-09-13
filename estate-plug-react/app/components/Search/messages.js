/*
 * Dashboard and Widgets Messages
 *
 * This contains all the text for the Dashboard and Widgets page.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Search';

export default defineMessages({
  placeholder: {
    id: `${scope}.Post.placeholder`,
    defaultMessage: 'Search Post',
  },
  result: {
    id: `${scope}.Post.result`,
    defaultMessage: 'Results',
  },
});
