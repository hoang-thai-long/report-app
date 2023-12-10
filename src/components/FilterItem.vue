<template>
    <div class="rt-filter-item">
        <label for="name">
            <slot></slot>
        </label>
        <multiselect :preselect-first="selectFirst" :name="name" v-model="value" deselect-label="Bỏ chọn"
            select-label="Chọn" :placeholder="placeholder" label="name" track-by="id" :options="options"
            :multiple="multiple" :taggable="true" :close-on-select="!multiple" :hide-selected="hideSelected"
            @close="close"
            :disabled="selectFirst"
            ></multiselect>
    </div>
</template>
<script lang="ts">
import VueMultiselect from 'vue-multiselect'
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
@Component({
    components: { 'multiselect': VueMultiselect }
})
export default class FilterItem extends Vue {
    @Prop()
    public hideSelected !: boolean;
    @Prop()
    public selectFirst !: boolean;
    @Prop()
    public name !: string;
    @Prop()
    public multiple !: boolean
    @Prop()
    public placeholder !: string
    @Prop()
    public options !: [{ id: string, name: string }] | null;
    public value: { id: string, name: string } | null = null;

    @Emit('on-change')
    onChange<type>(value: type | null) {
        // console.log(value);
        return value;
    }

    @Emit("close")
    close(){
        return this.value;
    }

    @Watch("options")
    watchOptions(newValue:{ id: string, name: string } | null, oldValue: { id: string, name: string } | null){
        if(newValue != oldValue){
            this.value = null;
        }
    }

    @Watch("value")
    wacthValue(newValue: { id: string, name: string } | null, oldValue: { id: string, name: string } | null) {
        // console.log(newValue,oldValue);
        if (newValue != oldValue) {
            if (newValue != null) {
                this.onChange(newValue);
            }
            else {
                this.onChange(null);
            }
        }
    }
    @Watch("options")
    wathOptions(n:{ id: string, name: string}[]| null , o:{ id: string, name: string}[]|null){
        if(n != o){
            // console.log(n,o, this.value, this.selectFirst);
            if(n && n.length > 0){
                if(this.value == null && this.selectFirst){
                    this.value = n[0];
                    this.close();
                }
            }
            // console.log(n,o, this.value);
        }
    }

    mounted() {
    //  console.log(this.options,this.value,this.selectFirst);   
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.multiselect{
    min-height: 36px;
}
.multiselect__input, .multiselect__single{
    margin-bottom: 2px;
}
.multiselect__placeholder{
    margin-bottom: 0;
}
.multiselect__select{
    height: 36px;
}
.multiselect__tags{
    min-height: 36px;
    padding: 4px 40px 0 8px;
}
</style>