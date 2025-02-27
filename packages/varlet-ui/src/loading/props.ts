export function typeValidator(type: string): boolean {
  return ['circle', 'wave', 'cube', 'rect', 'disappear'].includes(type)
}

export function sizeValidator(size: string): boolean {
  return ['normal', 'mini', 'small', 'large'].includes(size)
}

export const props = {
  // loading类型
  type: {
    type: String,
    default: 'circle',
    validator: typeValidator,
  },
  radius: {
    type: [String, Number],
    default: 15,
  },
  // loading尺寸
  size: {
    type: String,
    default: 'normal',
    validator: sizeValidator,
  },
  // loading颜色
  color: {
    type: String,
    default: 'currentColor',
  },
}
