
<template>
    <div class="table-data">
        <div class="table-data-box">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th rowspan="3">STT</th>
                        <th style="border-right: 1px solid;" rowspan="3">Tên</th>
                        <!-- tổng hợp -->
                        <th style="border:1px solid;" colspan="3">Tổng hợp</th>
                        <!--  luyện tập -->
                        <th style="border:1px solid;" colspan="8">Luyện tập</th>
                        <!-- kiểm tra -->
                        <th style="border:1px solid;" colspan="6">Kiểm tra</th>
                    </tr>
                    <tr>
                        <!-- tổng hợp -->
                        <th style="border-left: 1px solid;" rowspan="2">Sĩ số</th>
                        <th rowspan="2">HSHĐ</th>
                        <th style="border-right: 1px solid;" rowspan="2">Thời gian</th>
                        <!--  luyện tập -->
                        <th style="border-right: 1px solid;" colspan="3">Được giao qua link</th>
                        <th style="border-right: 1px solid;" colspan="3">GV giao trong lớp</th>
                        <th style="border-right: 1px solid;" colspan="2">Tự luyện</th>
                        <!-- kiểm tra -->
                        <th style="border-left: 1px solid; border-right: 1px solid;" colspan="3">Bài trong lớp</th>
                        <th style="border-left: 1px solid; border-right: 1px solid;" colspan="3">Bài khảo thí</th>
                    </tr>
                    <tr>
                        <!--  luyện tập -->
                        <th>TLLB</th>
                        <th>Điểm TB</th>
                        <th style="border-right: 1px solid;">TGLB</th>
                        <th>TLLB</th>
                        <th>Điểm TB</th>
                        <th style="border-right: 1px solid;">TGLB</th>
                        <th>TLLB</th>
                        <th style="border-right: 1px solid;">TGLB</th>
                         <!-- kiểm tra -->
                        <th>TLLB</th>
                        <th>Điểm TB</th>
                        <th style="border-right: 1px solid;">TGLB</th>
                        <th>TLLB</th>
                        <th>Điểm TB</th>
                        <th style="border-right: 1px solid;">TGLB</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        
                        <td></td>
                        <td style="border-right: 1px solid;"></td>
                        <!-- tổng hợp -->
                        <td></td>
                        <td></td>
                        <td style="border-right: 1px solid;"></td>
                        <!--  luyện tập -->
                        <td></td>
                        <td></td>
                        <td style="border-right: 1px solid;"></td>
                        <td></td>
                        <td></td>
                        <td style="border-right: 1px solid;"></td>
                        <td></td>
                        <td style="border-right: 1px solid;"></td>
                         <!-- kiểm tra -->
                        <td></td>
                        <td></td>
                        <td style="border-right: 1px solid;"></td>
                        <td></td>
                        <td></td>
                        <td style="border-right: 1px solid;"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
    @Prop()
    type !: number;
}

</script>