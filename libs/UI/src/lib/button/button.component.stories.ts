import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'ButtonComponent',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined'],
    },
    theme: {
      control: { type: 'select' },
      options: ['green', 'white'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'select' },
      options: ['simple', 'small'],
    },
  },
};
export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'filled',
    theme: 'green',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <n-button
        [variant]="variant"
        [theme]="theme"
        [disabled]="disabled"
        [size]="size"
      >
        Клик
      </n-button>`,
  }),
};
