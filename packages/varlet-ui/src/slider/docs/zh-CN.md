# Slider 滑块

### 介绍

用于在给定范围内取值

### 引入

```js
import { createApp } from 'vue'
import { Slider } from '@varlet/ui'

createApp().use(Slider)
```

### 基本使用

```html
<var-slider v-model="value" />
```

```javascript
import { ref } from 'vue'

export default {
  setup() {
    const value = ref(3)

    return {
      value
    }
  }
}
```

### 指定步长

通过`step`属性来设置步进增量

```html
<var-slider v-model="value" step="10" />
```

### 双滑块

通过`range`属性开启双滑块模式，确保`value`的值是一个**数组**。

```html
<var-slider v-model="value" range @change="handleChange" />
```

```javascript
import { ref } from 'vue'

export default {
  setup() {
    const value = ref([3, 50])

    const handleChange = (value) => {
      console.log(value)
    }

    return {
      value
    }
  }
}
```

### 禁用

```html
<var-slider v-model="value" disabled />
```

### 只读

```html
<var-slider v-model="value" readonly />
```

### 不同大小

通过`track-height` 和 `thumb-size` 控制slider的大小

```html
<var-slider v-model="value" track-height="6" thumb-size="20" range />
```

### 自定义样式

```html
<var-slider
  v-model="value"
  label-color="purple"
  active-color="#e0732c"
  track-color="#3a68b4"
  thumb-color="#e25241"
  label-text-color="#ededed"
/>
```

### 显示标签
通过 `label-visible` 属性控制标签的显示

```html
<var-slider v-model="value" label-visible="never" />
<var-slider v-model="value1" />
<var-slider v-model="value2" label-visible="always" />
```

### 值的校验

通过`rules`属性对值进行校验。

<span style="font-size: 12px">`rules`是一个可以接受 `function`、`boolean` 和 `string` 的数组。 函数传递输入值作为参数，必须返回 `true` / `false` 或包含错误消息的 `string` ， 如果函数返回 (或数组包含的任何值) `false`或`string`，输入字段将输入错误状态。</span>

```html
<var-slider v-model="value" :rules="[(v) => v > 35 || 'error message']" />
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| ----- | -------------- | -------- | ---------- |
| `v-model` | 当前进度值 | _number \| [number, number]_ | `0` |
| `step`| 步长，取值为`1 ~ 100`间的整数 | _string \| number_ | `1` |
| `range`| 是否启用双滑块 | _boolean_ | `false` |
| `label-visible` | 是否显示标签，可选值为`always, normal, never` | _string_ | `normal` |
| `label-text-color` | 标签文字颜色 | _string_ | `#fff` |
| `track-height` | slider的高度 | _string \| number_ | `2` |
| `thumb-size` | 滑块的大小 | _string \| number_ | `12` |
| `disabled`| 是否禁用 | _boolean_  | `false` |
| `readonly`| 是否只读 | _boolean_  | `false` |
| `rules`| 校验规则 | _array_  | `-` |


### 事件

| 事件名 | 说明 | 回调参数 |
| ----- | -------- | -------- |
| `change` | 	值改变时触发| value: 当前进度|
| `start` | 开始拖动时触发 | `-` |
| `end` | 结束拖动时触发 | value: 当前进度 |

### 主题变量
#### 以下less变量可通过构建时进行变量覆盖从而修改主题样式

| 变量名 | 默认值 |
| --- | --- |
| `@slider-error-color` | `@color-danger` |
| `@slider-track-background` | `#bdbdbd` |
| `@slider-track-fill-background` | `@color-primary` |
| `@slider-thumb-block-background` | `@color-primary` |
| `@slider-thumb-ripple-background` | `@color-primary` |
| `@slider-thumb-label-background` | `@color-primary` |
| `@slider-thumb-label-font-size` | `@font-size-sm` |
