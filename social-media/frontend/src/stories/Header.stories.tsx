import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Header, HeaderProps } from './Header';

export default {
  title: 'Example/Atoms/Header',
  component: Header,
  parameters: {
    fileName: __filename
  }
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
