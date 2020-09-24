/*
 * Dashboard and Chart Messages
 *
 * This contains all the text for the Dashboard and Widgets page.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.BarChart';

export default defineMessages({
  barchart_title: {
    id: `${scope}.BarChart.title`,
    defaultMessage: '부동산 흐름',
  },
  barchart_desc: {
    id: `${scope}.BarChart.desc`,
    defaultMessage: '부동산 흐름입니다.',
  },
});
