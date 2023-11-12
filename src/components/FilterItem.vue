<template>
    <div class="filter-item">
        <label for="name">
            <slot></slot>
        </label>
        <multiselect :preselect-first="selectFirst" :name="name" v-model="value" deselect-label="Bỏ chọn"
            select-label="Chọn" :placeholder="placeholder" label="name" track-by="id" :options="options"
            :multiple="multiple" :taggable="true" :close-on-select="!multiple" :hide-selected="hideSelected"
            @close="close"
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
    public value: [{ id: string, name: string }] | null = null;

    mounted() {
        console.log(this.options)
    }

    @Emit('on-change')
    onChange(value: [{ id: string, name: string }] | null) {
        return value;
    }

    @Emit("close")
    close(){
        return this.value;
    }

    @Watch("options")
    watchOptions(newValue:[{ id: string, name: string }] | null, oldValue: [{ id: string, name: string }] | null){
        if(newValue != oldValue){
            this.value = null;
        }
    }

    @Watch("value")
    wacthValue(newValue: [{ id: string, name: string }] | null, oldValue: [{ id: string, name: string }] | null) {
        // console.log(newValue,oldValue);
        if (newValue != oldValue) {
            if (newValue != null && newValue.length > 0) {
                this.onChange(newValue);
            }
            else {
                this.onChange(null);
            }
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>