# Radio

### Install

```js
import { createApp } from 'vue'
import { Radio, RadioGroup } from '@varlet/ui'

createApp().use(RadioGroup).use(Radio)
```

### Basic Usage

```html
<var-radio v-model="value">Current value: {{ value }}</var-radio>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(false)

    return {
      value
    }
  }
}
```

### Set State value

```html
<var-radio
  :unchecked-value="0"
  :checked-value="1"
  v-model="value"
>
  Current value: {{ value }}
</var-radio>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(0)

    return {
      value
    }
  }
}
```

### Modify the icon and color

```html
<var-radio
  unchecked-color="#e99eb4"
  checked-color="#f44336"
  v-model="value"
>
  <template #unchecked-icon>
    <var-icon name="heart-half-full" size="24px"/>
  </template>
  <template #checked-icon>
    <var-icon name="heart" size="24px"/>
  </template>
  <template #default>
    Current value: {{ value }}
  </template>
</var-radio>
```

### Disabled

```html
<var-radio disabled v-model="value">Current value: {{ value }}</var-radio>
```

### Readonly

```html
<var-radio readonly v-model="value">Current value: {{ value }}</var-radio>
```

### RadioGroup

In the radio group, you must set the `checked-value` to identify the `radio`,
The radio group bind group checked identifiers.

```html
<var-radio-group v-model="value">
  <var-radio :checked-value="0">Eat</var-radio>
  <var-radio :checked-value="1">Sleep</var-radio>
</var-radio-group>
```

```js
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(0)

    return {
      value
    }
  }
}
```

### Radio validation

```html
<var-radio
  v-model="value"
  :rules="[v => v || 'Please check your choice']"
>
  Current value: {{ value }}
</var-radio>
```

### RadioGroup validate

```html
<var-radio-group
  v-model="value"
  :rules="[v => v === 0 || 'Please check eat']"
>
  <var-radio :checked-value="0">Eat</var-radio>
  <var-radio :checked-value="1">Sleep</var-radio>
</var-radio-group>
```


## API

### Props

### RadioGroup Props

| Prop | Description | Type | Default | 
| --- | --- | --- | --- | 
| `v-model` | The value of the binding | _any_ | `-` |
| `direction` | The layout direction，Optional value is `horizontal` `vertical` | _string \| number_ | `horizontal` |
| `rules` | The validation rules，Returns `true` to indicate that the validation passed，The remaining values are converted to text as user prompts | _Array<(value: any) => any>_ | `-` |

### Radio Props

| Prop | Description | Type | Default | 
| --- | --- | --- | --- | 
| `v-model` | The value of the binding | _any_ | `false` |
| `checked-value` | Checked value | _any_ | `true` |
| `unchecked-value` | Unchecked value | _any_ | `false` |
| `checked-color` | Checked color | _any_ | `-` |
| `unchecked-color` | Unchecked color | _any_ | `-` |
| `icon-size` | Icon size | _string \| number_ | `-` |
| `readonly` | Whether the readonly | _boolean_ | `false` |
| `disabled` | Whether the disabled | _boolean_ | `false` |
| `ripple` | Whether to open ripple | _boolean_ | `true` |
| `rules` | The validation rules，Returns `true` to indicate that the validation passed，The remaining values are converted to text as user prompts | _Array<(value: any) => any>_ | `-` |

### Methods

### RadioGroup Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `validate` | Trigger validate | `-` | `valid: Promise<boolean>` |
| `resetValidation` | Clearing validate messages | `-` | `-` |
| `reset` | Clear the value of the binding(set to `undefined`) and validate messages | `-` | `-` |

### Radio Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `validate` | Trigger validate | `-` | `valid: Promise<boolean>` |
| `resetValidation` | Clearing validate messages | `-` | `-` |
| `reset` | Clear the value of the binding(set to `unchecked-value`) and validate messages | `-` | `-` |
| `toggle` | Toggle the checked state, pass `checked-value` to check, `unchecked-value` to uncheck, do not pass or other cases to reverse | `value: any` | `-` |

### Events

### RadioGroup Events

| Event | Description | Arguments |
| --- | --- | --- |
| `change` | Trigger on change | `value: any` |

### Radio Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Triggered on Click | `e: Event` |
| `change` | Trigger on change | `value: any` |

### Slots

### RadioGroup Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `default` | Radio group content | `-` |

### Radio Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `checked-icon` | Checked icon | `-` |
| `unchecked-icon` | Unchecked icon | `-` |
| `default` | Displayed text | `-` |

### Theme Variables
#### The following LESS variables can be overridden at build time to modify the theme style

### Radio Variables

| Variable | Default |
| --- | --- |
| `@radio-checked-color` | `@color-primary` |
| `@radio-unchecked-color` | `#555` |
| `@radio-disabled-color` | `#aaa` |
| `@radio-error-color` | `@color-danger` |
| `@radio-action-padding` | `6px` |
| `@radio-icon-size` | `24px` |