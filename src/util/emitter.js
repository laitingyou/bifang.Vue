/**
 * Created by root on 17-9-3.
 */

export default {
    methods:{
        dispatch(componentName, eventName, params) {
            var parent = this.$parent || this.$root;
            var name = parent.$options.componentName;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.componentName;
                }
            }
            console.log(this.$parent)
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
    }
}