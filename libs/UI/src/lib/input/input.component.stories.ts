import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  component: InputComponent,
  title: 'InputComponent',
};
export default meta;

type Story = StoryObj<InputComponent>;

export const Primary: Story = {
  args: {
    iconStart: 'search',
    iconEnd: 'settings',
    placeholder: 'Поиск',
  },
};
