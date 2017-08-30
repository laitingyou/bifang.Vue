<template>
    <pre>
        <textarea>

               {{content}}


        </textarea>
    </pre>
</template>
<script>
    export default{
        data(){
            return {

            }
        },
        props:{
            content:{
                default:''
            }
        }
    }
</script>