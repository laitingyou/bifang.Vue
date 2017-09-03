<template>
    <div :class="[
    type === 'textarea' ? 'el-textarea' : 'el-input',
    size ? 'el-input--' + size : '',
    {
      'is-disabled': disabled,
      'el-input-group': $slots.prepend || $slots.append,
      'el-input-group--append': $slots.append,
      'el-input-group--prepend': $slots.prepend
    }
  ]">
        <template v-if="type !== 'textarea'">
            <!-- 前置元素 -->
            <div class="el-input-group__prepend" v-if="$slots.prepend">
                <slot name="prepend"></slot>
            </div>
            <!-- input 图标 -->
            <slot name="icon">
                <i class="el-input__icon"
                   :class="[
            'el-icon-' + icon,
            onIconClick ? 'is-clickable' : ''
          ]"
                   v-if="icon"
                   @click="handleIconClick">
                </i>
            </slot>
            <input
                    v-if="type !== 'textarea'"
                    class="el-input__inner"
                    v-bind="$props"
                    :autocomplete="autoComplete"
                    :value="currentValue"
                    ref="input"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
            >
            <i class="el-input__icon el-icon-loading" v-if="validating"></i>
            <!-- 后置元素 -->
            <div class="el-input-group__append" v-if="$slots.append">
                <slot name="append"></slot>
            </div>
        </template>
        <textarea
                v-else
                class="el-textarea__inner"
                :value="currentValue"
                @input="handleInput"
                ref="textarea"
                v-bind="$props"
                :style="textareaStyle"
                @focus="handleFocus"
                @blur="handleBlur">
    </textarea>
    </div>
</template>
<script>
    import emitter from './../../../util/emitter';
    export default{
        name:'BInput',
        componentName:'BInput',
        data() {
            return {
                currentValue: this.value,
                textareaCalcStyle: {}
            };
        },
        mixins:[emitter],
        props: {
            value: [String, Number],
            placeholder: String,
            size: String,
            resize: String,
            readonly: Boolean,
            autofocus: Boolean,
            icon: String,
            disabled: Boolean,
            type: {
                type: String,
                default: 'text'
            },
            name: String,
            autosize: {
                type: [Boolean, Object],
                default: false
            },
            rows: {
                type: Number,
                default: 2
            },
            autoComplete: {
                type: String,
                default: 'off'
            },
            form: String,
            maxlength: Number,
            minlength: Number,
            max: {},
            min: {},
            step: {},
            validateEvent: {
                type: Boolean,
                default: true
            },
            onIconClick: Function
        },
        watch:{
              'value'(newdata,olddata){
                  this.setCurrentValue(newdata);
              }
        },
        computed:{
            validating() {
                return this.$parent.validateState === 'validating';
            },
        },
        methods:{
            setCurrentValue(value) {
                if (value === this.currentValue) return;
//                this.$nextTick(_ => {
//                    this.resizeTextarea();
//                });
                this.currentValue = value;
                if (this.validateEvent) {
                    this.dispatch('ElFormItem', 'el.form.change', [value]);
                }
            },
            handleInput(val){
                console.log(this.validating)
                let value = event.target.value;
                this.setCurrentValue(value);
                this.$emit('change',value);
            },
            handleIconClick(){
                if(this.onIconClick){
                    this.onIconClick(this.currentValue);
                }
            },
            handleFocus(e){
                this.$emit('focus', event);
            },
            handleBlur(e){
                this.$emit('blur', event);
                if (this.validateEvent) {
                    this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue]);
                }
            }
        }

    }
</script>