
<template>
    <div class="filter-tab">
        <label class="label-tab-filter sm-hidden md-hidden" :for="name">{{ text }}</label>
        <ul class="ul-filter" :name="name">
            <li class="li-filter" :class="value==item.id?'active':''" v-for="(item, key) in props.data" :key="key" @click="ChoiseValue(item)">{{ item.name }}</li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value = ref("0");
const props = defineProps(['data','name','text'])
const emits = defineEmits(['on-select'])
const ChoiseValue = (item: { id: string; name: string; }) => {
    value.value = item.id;
    emits('on-select', item);
}
</script>
<style lang="scss" scoped>
.filter-tab{    
    margin: 5px 0;
}
.label-tab-filter{
    display: flex;
    padding: 5px 10px;
}
.ul-filter {
    width: calc(100% - 180px);
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .li-filter {
        flex: 0 0 115px;
        padding: 5px 10px;
        border: 0.5px solid #dedede;
        border-radius: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
        color: #dedede;
        cursor: pointer;
        &:hover, &.active{
            box-shadow: 0 0 10px #ccc;
            border: 0.5px solid #ccc;
            color: #000;
        }
        &.active{
            background: transparent;
        }
    }
}
@media only screen and (max-width: 1200px){
}
@media only screen and (max-width: 900px){
    .md-hidden{display: none;}
    .ul-filter{
        width: 100%;
    }
    .filter-group .filter-item { flex:0 0 100%; }
}
@media only screen and (max-width: 600px){
    .sm-hidden{display: none;}
    .ul-filter{
        width: 100%;
        justify-content: center;
        .li-filter{
            flex:0 0 auto;
        }
    }
    .filter-group .filter-item { flex:0 0 100%; }
}
</style>