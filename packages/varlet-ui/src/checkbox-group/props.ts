import { PropType } from 'vue'

export type ValidateTriggers = 'onChange'

export function directionValidator(direction: string) {
  return ['horizontal', 'vertical'].includes(direction)
}

export const props = {
  modelValue: {
    type: Array as PropType<Array<any>>,
    default: [],
  },
  max: {
    type: [String, Number],
  },
  direction: {
    type: String,
    default: 'horizontal',
  },
  validateTrigger: {
    type: Array as PropType<Array<ValidateTriggers>>,
    default: ['onChange'],
  },
  rules: {
    type: Array as PropType<Array<(value: any) => any>>,
  },
  onChange: {
    type: Function as PropType<(value: Array<any>) => void>,
  },
  'onUpdate:modelValue': {
    type: Function as PropType<(value: Array<any>) => void>,
  },
}
