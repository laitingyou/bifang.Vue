/**
 * Created by root on 17-9-1.
 */
const Myplugin={
    install(Vue, options){
        Vue.mixin({
            created(){

            },
            methods:{
                lsit:function(){
                    console.log('I am lsit')
                },
                say:function(){
                    console.log('I am mixin say')
                }
            }
        });
        Vue.prototype.$con=()=>{
            console.log(213213213)
        };
    }

}
export default Myplugin;

