<template>
  <div
    class="var-select var--box"
    :class="[formDisabled || disabled ? 'var-select--disabled' : null]"
    @click="handleClick"
    v-bind="$attrs"
  >
    <div
      class="var-select__controller"
      :class="[
        isFocus ? 'var-select--focus' : null,
        errorMessage ? 'var-select--error' : null,
        formDisabled || disabled ? 'var-select--disabled' : null,
      ]"
      :style="{
        color: isFocus ? focusColor : blurColor,
      }"
    >
      <div class="var-select__icon" :class="[!hint ? 'var-select--non-hint' : null]">
        <slot name="prepend-icon" />
      </div>

      <var-menu class="var-select__menu" var-select-cover :offset-y="offsetY" v-model:show="isFocus" @blur="handleBlur">
        <div
          class="var-select__wrap"
          :class="[!hint ? 'var-select--non-hint' : null]"
          ref="wrapEl"
          @click="handleFocus"
        >
          <div
            class="var-select__select"
            :class="[
              errorMessage ? 'var-select--error' : null,
              formDisabled || disabled ? 'var-select--disabled' : null,
            ]"
            :style="{
              textAlign,
              color: textColor,
            }"
            @click="handleClick"
          >
            <div v-if="multiple">
              <div class="var-select__chips" v-if="chip">
                <var-chip
                  class="var-select__chip"
                  var-select-cover
                  closable
                  :type="errorMessage ? 'danger' : null"
                  v-for="l in labels"
                  :key="l"
                  @click.stop
                  @close="(e) => handleClose(l)"
                >
                  {{ l }}
                </var-chip>
              </div>
              <div class="var-select__values" v-else>
                {{ labels.join(separator) }}
              </div>
            </div>

            <span v-else>{{ label }}</span>

            <var-icon
              class="var-select__arrow"
              var-select-cover
              name="menu-down"
              :transition="300"
              :class="[isFocus ? 'var-select--arrow-rotate' : null]"
            />
          </div>
          <label
            class="var-select__placeholder"
            :class="[computePlaceholderState(), !hint ? 'var-select--placeholder-non-hint' : null]"
          >
            {{ placeholder }}
          </label>
          <div
            class="var-select__line"
            :class="[
              formDisabled || disabled ? 'var-select--line-disabled' : null,
              errorMessage ? 'var-select--line-error' : null,
            ]"
            :style="{ background: blurColor }"
            v-if="line"
          >
            <div
              class="var-select__dot"
              :class="[
                isFocus ? 'var-select--spread' : null,
                formDisabled || disabled ? 'var-select--line-disabled' : null,
                errorMessage ? 'var-select--line-error' : null,
              ]"
              :style="{ background: focusColor }"
            ></div>
          </div>
        </div>

        <template #menu>
          <div class="var-select__scroller">
            <slot />
          </div>
        </template>
      </var-menu>

      <div class="var-select__icon" :class="[!hint ? 'var-select--non-hint' : null]">
        <slot name="append-icon">
          <var-icon name="close-circle" size="14px" v-if="clearable" @click="handleClear" />
        </slot>
      </div>
    </div>

    <var-form-details :error-message="errorMessage" />
  </div>
</template>

<script lang="ts">
import Icon from '../icon'
import Menu from '../menu'
import Chip from '../chip'
import FormDetails from '../form-details'
import { computed, ComputedRef, defineComponent, ref, Ref, watch, nextTick } from 'vue'
import { isArray, isEmpty } from '../utils/shared'
import { props, ValidateTriggers } from './props'
import { useValidation } from '../utils/components'
import { SelectProvider, useOptions } from './provide'
import { OptionProvider } from '../option/provide'
import { useForm } from '../form/provide'
import { toPxNum } from '../utils/elements'

export default defineComponent({
  name: 'VarSelect',
  components: {
    [Icon.name]: Icon,
    [Menu.name]: Menu,
    [Chip.name]: Chip,
    [FormDetails.name]: FormDetails,
  },
  inheritAttrs: false,
  props,
  setup(props) {
    const wrapEl: Ref<HTMLElement | null> = ref(null)
    const isFocus: Ref<boolean> = ref(false)
    const multiple: ComputedRef<boolean> = computed(() => props.multiple)
    const focusColor: ComputedRef<string | undefined> = computed(() => props.focusColor)
    const label: Ref<string | number> = ref('')
    const labels: Ref<(string | number)[]> = ref([])
    const wrapWidth: ComputedRef<string> = computed(() => {
      return (wrapEl.value && window.getComputedStyle(wrapEl.value as HTMLElement).width) || '0px'
    })
    const offsetY: ComputedRef<number> = computed(() => {
      const paddingTop = (wrapEl.value && window.getComputedStyle(wrapEl.value as HTMLElement).paddingTop) || '0px'
      return toPxNum(paddingTop) * 1.5
    })
    const { bindForm, form } = useForm()
    const { length, options, bindOptions } = useOptions()
    const {
      errorMessage,
      validateWithTrigger: vt,
      validate: v,
      // expose
      resetValidation,
    } = useValidation()

    const computeLabel = () => {
      const { multiple, modelValue } = props

      if (multiple) {
        const rawModelValue = (modelValue as unknown) as any[]
        labels.value = rawModelValue.map(findLabel)
      }
      if (!multiple && !isEmpty(modelValue)) {
        label.value = findLabel(modelValue as any)
      }
      if (!multiple && isEmpty(modelValue)) {
        label.value = ''
      }
    }

    const validateWithTrigger = (trigger: ValidateTriggers) => {
      nextTick(() => {
        const { validateTrigger, rules, modelValue } = props
        vt(validateTrigger, trigger, rules, modelValue)
      })
    }

    const findValueOrLabel = ({ value, label }: OptionProvider) => {
      if (value.value != null) {
        return value.value
      }

      return label.value
    }

    const findLabel = (modelValue: string | number | any[]) => {
      let option = options.find(({ value }) => value.value === modelValue)

      if (!option) {
        option = options.find(({ label }) => label.value === modelValue)
      }

      return option!.label.value
    }

    const computePlaceholderState = () => {
      const { hint, modelValue } = props

      if (!hint && !isEmpty(modelValue)) {
        return 'var-select--placeholder-hidden'
      }
      if (hint && (!isEmpty(modelValue) || isFocus.value)) {
        return 'var-select--placeholder-hint'
      }
    }

    const handleFocus = (e: Event) => {
      const { disabled, readonly, onFocus } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      isFocus.value = true

      onFocus?.(e)
      validateWithTrigger('onFocus')
    }

    const handleBlur = (e: Event) => {
      const { disabled, readonly, onBlur } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      onBlur?.(e)
      validateWithTrigger('onBlur')
    }

    const onSelect = (option: OptionProvider) => {
      const { disabled, readonly, multiple, onChange } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      const selectedValue: any = multiple
        ? options.filter(({ selected }) => selected.value).map(findValueOrLabel)
        : findValueOrLabel(option)

      props['onUpdate:modelValue']?.(selectedValue)
      onChange?.(selectedValue)
      validateWithTrigger('onChange')

      !multiple && (isFocus.value = false)
    }

    const handleClear = () => {
      const { disabled, readonly, multiple, clearable, onClear } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly || !clearable) {
        return
      }

      const changedModelValue = multiple ? [] : undefined

      props['onUpdate:modelValue']?.(changedModelValue)
      onClear?.(changedModelValue)
      validateWithTrigger('onClear')
    }

    const handleClick = (e: Event) => {
      const { disabled, onClick } = props

      if (form?.disabled.value || disabled) {
        return
      }

      onClick?.(e)
      validateWithTrigger('onClick')
    }

    const handleClose = (text: any) => {
      const { disabled, readonly, modelValue, onClose } = props

      if (form?.disabled.value || form?.readonly.value || disabled || readonly) {
        return
      }

      const rawModelValue = (modelValue as unknown) as any[]
      const option = options.find(({ label }) => label.value === text)
      const currentModelValue = rawModelValue.filter((value) => value !== (option!.value.value ?? option!.label.value))

      props['onUpdate:modelValue']?.(currentModelValue)
      onClose?.(currentModelValue)
      validateWithTrigger('onClose')
    }

    const syncOptions = () => {
      const { multiple, modelValue } = props

      if (multiple) {
        const rawModelValue = (modelValue as unknown) as any[]
        options.forEach((option) => option.sync(rawModelValue.includes(findValueOrLabel(option))))
      } else {
        options.forEach((option) => option.sync(modelValue === findValueOrLabel(option)))
      }

      computeLabel()
    }

    // expose
    const focus = () => {
      isFocus.value = true
    }

    // expose
    const blur = () => {
      isFocus.value = false
    }

    // expose
    const validate = () => v(props.rules, props.modelValue)

    // expose
    const reset = () => {
      props['onUpdate:modelValue']?.(props.multiple ? [] : undefined)
      resetValidation()
    }

    watch(
      () => props.multiple,
      () => {
        const { multiple, modelValue } = props
        if (multiple && !isArray(modelValue)) {
          throw Error('The modelValue must be an array when multiple is true')
        }
      }
    )

    watch(() => props.modelValue, syncOptions, { deep: true })

    watch(() => length.value, syncOptions)

    const selectProvider: SelectProvider = {
      wrapWidth,
      multiple,
      focusColor,
      onSelect,
      reset,
      validate,
      resetValidation,
    }

    bindOptions(selectProvider)
    bindForm?.(selectProvider)

    return {
      wrapEl,
      offsetY,
      isFocus,
      errorMessage,
      formDisabled: form?.disabled,
      label,
      labels,
      computePlaceholderState,
      handleFocus,
      handleBlur,
      handleClear,
      handleClick,
      handleClose,
      reset,
      validate,
      resetValidation,
      focus,
      blur,
    }
  },
})
</script>

<style lang="less">
@import '../icon/icon';
@import '../menu/menu';
@import '../form-details/formDetails';
@import '../chip/chip';
@import './select';
</style>
