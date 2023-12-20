<template>
  <div style="text-align: center;">
    <!-- số lượng học sinh hoạt động -->
    <canvas style="max-height: 400px;" id="tylehocsinhhoatdong"></canvas>
    <!-- kết quả kiểm tra -->
    <canvas style="max-height: 400px;" id="ketquakiemtra"></canvas>
    <canvas style="max-height: 400px;" id="ketquakhaothi"></canvas>
    <!-- kiểm tra trung bình, trung vị -->
    <canvas style="max-height: 400px;" id="trungbinhtrungvi"></canvas>
    <!-- giao bài -->
  </div>
</template>
<script lang="ts">
import { Bar , Line} from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement, BubbleDataPoint, ChartConfiguration, ChartConfigurationCustomTypesPerDataset, ChartTypeRegistry, Point} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement)

import { Component, Vue, Watch } from "vue-property-decorator";
import { stack } from '@/utils/model';
import { computed } from 'vue';
import store from '@/store';
@Component({
  props: ['labels', 'datasets'],
  components: { Bar , Line}
})

export default class ChartReport extends Vue {

  listCharts: { [key: string]: ChartJS | null } = {};
  labels !: string[];
  datasets !: stack[];

  chartData = {
    labels: this.labels,
    datasets: this.datasets
  }
  chartOptions = {
    responsive: true,
    // scales: {
    //   x: {
    //     stacked: true,
    //   },
    //   y: {
    //     stacked: true
    //   }
    // }
  }

  loading = computed(() => store.state.loadding)


  @Watch("loading")
  createChart(n: number, _o: number) {
    console.log(_o);
    if (n == 0) {
      const data = this.caculatorDataChart();

      const optionsTyLe :  ChartConfiguration<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> | ChartConfigurationCustomTypesPerDataset<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> = {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: data.tyleHoatDong
        },
        options: {
          interaction: {
            intersect: false,
            mode: 'index',
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || '';

                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    if (context.parsed.y > 0)
                      label += context.parsed.y.toFixed(1) + "%";
                    else
                      label += "---";
                  }
                  return label;
                }
              }
            },
            title: {
              display: true,
              text: 'tỷ lệ hoạt động của học sinh'
            },
          },
          responsive: true,
        }
      };
      const optionsKiemTra :  ChartConfiguration<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> | ChartConfigurationCustomTypesPerDataset<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> = {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: data.diemKiemTra
        },
        options: {
          interaction: {
            intersect: false,
            mode: 'index',
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || '';

                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    if (context.parsed.y > 0)
                      label += context.parsed.y.toFixed(1);
                    else
                      label += "---";
                  }
                  return label;
                }
              }
            },
            title: {
              display: true,
              text: 'Kết quả kiểm tra'
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            }
          }
        }
      };
      const optionsKhaothi :  ChartConfiguration<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> | ChartConfigurationCustomTypesPerDataset<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> = {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: data.diemKhaoThi
        },
        options: {
          interaction: {
            intersect: false,
            mode: 'index',
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || '';

                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    if (context.parsed.y > 0)
                      label += context.parsed.y.toFixed(1);
                    else
                      label += "---";
                  }
                  return label;
                }
              }
            },
            title: {
              display: true,
              text: 'Kết quả khảo thí'
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            }
          }
        }
      };
      const optionsTBTV : ChartConfiguration<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> | ChartConfigurationCustomTypesPerDataset<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> = {
        type: 'bar',
        data: {
          labels: data.labelsPoints,
          datasets: data.diems
        },
        options: {
          interaction: {
            intersect: false,
            mode: 'index',
          },
          plugins: {
            title : {
                display: true,
                text: 'Điểm trung bình: ' + data.avg + ", Trung vị: " + data.tv,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || '';

                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    if (context.parsed.y > 0)
                      label += context.parsed.y.toFixed(1);
                    else
                      label += "---";
                  }
                  return label;
                }
              }
            }
          },
          responsive: true,
        }
      };

      this.createChartTyle("tylehocsinhhoatdong", optionsTyLe);
      this.createChartTyle("ketquakiemtra", optionsKiemTra);
      this.createChartTyle("ketquakhaothi", optionsKhaothi);
      this.createChartTyle("trungbinhtrungvi", optionsTBTV);

    }
    if (n > 0) {
      this.listCharts["my-chart-id"]?.destroy();
    }
  }


  createChartTyle(id: string, opts: ChartConfiguration<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> | ChartConfigurationCustomTypesPerDataset<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>) {
    if (this.listCharts && this.listCharts[id]) {
      this.listCharts[id]?.destroy();
    }
    this.listCharts[id] = new ChartJS(id, opts);
  }

  caculatorDataChart() {
    const arrayLabels = Array.from(store.state.FilterTable);
    const luyentapLink = Array.from(store.state.LuyenTap.Link);
    const luyentapClass = Array.from(store.state.LuyenTap.Class);
    const luyentapTuLuyen = Array.from(store.state.LuyenTap.TuLuyen);
    const kiemTraClass = Array.from(store.state.kiemTra.Class);
    const kiemTraExam = Array.from(store.state.kiemTra.Exam);

    const dataChartTotal: number[] = [];
    const dataChartLink: number[] = [];
    const dataChartLuyenTap: number[] = [];
    const dataChartSelf: number[] = [];
    const dataChartKiemTra: number[] = [];
    const dataChartKhaoThi: number[] = [];

    const dataPointKetQuaKiemTra: number[] = [];
    const dataPointKetQuaKhaoThi: number[] = [];

    const listPointKiemTra: number[][] = [];
    const listPointKhaoThi: number[][] = [];

    const allPoints :number[] = [];

    const count = arrayLabels.length;
    for (let i = 0; i < count; i++) {
      const item = arrayLabels[i];
      const link = luyentapLink.find(o => o.classID == item.id);
      const luyenTap = luyentapClass.find(o => o.classID == item.id);
      const self = luyentapTuLuyen.find(o => o.id == item.id);
      const kiemTra = kiemTraClass.find(o => o.classID == item.id);
      const khaoThi = kiemTraExam.find(o => o.classID == item.id);

      let studentActives: string[] = [];
      let siso = 0;
      if (link) {
        if (siso == 0) {
          siso = link.siSo;
        }
        if (link.studentIDs && link.studentIDs.length > 0) {
          studentActives = studentActives.concat(link.studentIDs);
          dataChartLink.push(link.studentIDs.length * 100 / link.siSo);
        }
        else {
          dataChartLink.push(0)
        }
      }
      if (luyenTap) {
        if (siso == 0) {
          siso = luyenTap.siSo;
        }
        if (luyenTap.studentIDs && luyenTap.studentIDs.length > 0) {
          studentActives = studentActives.concat(luyenTap.studentIDs);
          dataChartLuyenTap.push(luyenTap.studentIDs.length * 100 / luyenTap.siSo);
        }
        else {
          dataChartLuyenTap.push(0)
        }
      }
      if (self) {
        if (siso == 0) {
          siso = self.siso;
        }
        if (self.hstg && self.hstg.length > 0) {
          studentActives = studentActives.concat(self.hstg);
          dataChartSelf.push(self.hstg.length * 100 / self.siso);
        }
        else {
          dataChartSelf.push(0)
        }
      }
      if (kiemTra) {
        if (siso == 0) {
          siso = kiemTra.siSo;
        }
        if (kiemTra.studentIDs && kiemTra.studentIDs.length > 0) {
          studentActives = studentActives.concat(kiemTra.studentIDs);
          dataChartKiemTra.push(kiemTra.studentIDs.length * 100 / kiemTra.siSo);

          dataPointKetQuaKiemTra.push(kiemTra.points)
          if (kiemTra.details) {
            const pointKiemTra: number[] = [];
            kiemTra.details.forEach(o => {
              if (o.tyLeThamGia > 0) {
                pointKiemTra.push(...o.points);
                allPoints.push(...o.points);
              }
            })
            if (pointKiemTra.length > 0) {
              listPointKiemTra.push(pointKiemTra)
            }
          }
          else {
            listPointKiemTra.push([]);
          }

        }
        else {
          listPointKiemTra.push([]);
          dataChartKiemTra.push(0)
          dataPointKetQuaKiemTra.push(0)
        }

      }
      else {
        dataPointKetQuaKiemTra.push(0);
      }
      if (khaoThi) {
        if (siso == 0) {
          siso = khaoThi.siSo;
        }
        if (khaoThi.studentIDs && khaoThi.studentIDs.length > 0) {
          studentActives = studentActives.concat(khaoThi.studentIDs);
          dataChartKhaoThi.push(khaoThi.studentIDs.length * 100 / khaoThi.siSo);
          dataPointKetQuaKhaoThi.push(khaoThi.points)

          if (khaoThi.details) {
            const pointKhaoThi: number[] = [];
            khaoThi.details.forEach(o => {
              if (o.tyLeThamGia > 0) {
                pointKhaoThi.push(...o.points);
                allPoints.push(...o.points);
              }
            })
            if (pointKhaoThi.length > 0) {
              listPointKhaoThi.push(pointKhaoThi)
            }
          }
          else {
            listPointKhaoThi.push([]);
          }

        }
        else {
          listPointKhaoThi.push([]);
          dataChartKhaoThi.push(0)
          dataPointKetQuaKhaoThi.push(0);
        }
      }
      else {
        dataPointKetQuaKhaoThi.push(0);
      }
      studentActives = Array.from(new Set(studentActives.filter(o => o && o.length > 10)));
      dataChartTotal.push(studentActives.length * 100 / siso);

    }
    const numbers :number[] = [];
    const labelsPoints = Array.from(new Set(allPoints)).sort((a, b)=> a-b);
    if(labelsPoints.length > 0){
      labelsPoints.forEach(p=>{
        numbers.push(allPoints.filter(o=>o==p).length);
      });
    }

    console.log(listPointKhaoThi);
    return {
      labelsPoints : labelsPoints.map(o=>o.toFixed(2)),
      labels: arrayLabels.map(o => o.name),
      tv: this.trungVi(allPoints),
      avg : this.caculatorAvg(allPoints),
      diems:[
        {
          label:"điểm",
          data:numbers
        }
      ],
      diemKhaoThi: [
        {
          label: "0->3.9",
          data: listPointKhaoThi.map(o => o.filter(x => x < 4).length),
          borderColor: "#f3b8b1",
          backgroundColor: "#f3b8b1"
        },
        {
          label: "4->4.9",
          data: listPointKhaoThi.map(o => o.filter(x => x >= 4 && x < 5).length),
          borderColor: "#f3d2ac",
          backgroundColor: "#f3d2ac"
        },
        {
          label: "5->6.9",
          data: listPointKhaoThi.map(o => o.filter(x => x >= 5 && x < 7).length),
          borderColor: "#cae9e0",
          backgroundColor: "#cae9e0"
        },
        {
          label: "7->7.9",
          data: listPointKhaoThi.map(o => o.filter(x => x >= 7 && x < 8).length),
          borderColor: "#90dac5",
          backgroundColor: "#90dac5"
        },
        {
          label: "8->10",
          data: listPointKhaoThi.map(o => o.filter(x => x >= 8).length),
          borderColor: "#7dcbca",
          backgroundColor: "#7dcbca"
        }
      ],
      diemKiemTra: [
        {
          label: "0->3.9",
          data: listPointKiemTra.map(o => o.filter(x => x < 4).length),
          borderColor: "#f3b8b1",
          backgroundColor: "#f3b8b1"
        },
        {
          label: "4->4.9",
          data: listPointKiemTra.map(o => o.filter(x => x >= 4 && x < 5).length),
          borderColor: "#f3d2ac",
          backgroundColor: "#f3d2ac"
        },
        {
          label: "5->6.9",
          data: listPointKiemTra.map(o => o.filter(x => x >= 5 && x < 7).length),
          borderColor: "#cae9e0",
          backgroundColor: "#cae9e0"
        },
        {
          label: "7->7.9",
          data: listPointKiemTra.map(o => o.filter(x => x >= 7 && x < 8).length),
          borderColor: "#90dac5",
          backgroundColor: "#90dac5"
        },
        {
          label: "8->10",
          data: listPointKiemTra.map(o => o.filter(x => x >= 8).length),
          borderColor: "#7dcbca",
          backgroundColor: "#7dcbca"
        }
      ],
      tyleHoatDong: [
        {
          label: "tổng hợp",
          data: dataChartTotal,
          backgroundColor: "#AEB6BF",
          borderColor: "#AEB6BF"
        },
        {
          label: "Được giao qua link",
          data: dataChartLink,
          backgroundColor: "#EDBB99",
          borderColor: "#EDBB99"
        },
        {
          label: "Được GV giao trong lớp",
          data: dataChartLuyenTap,
          backgroundColor: "#F9E79F",
          borderColor: "#F9E79F"
        },
        {
          label: "Tự luyện",
          data: dataChartSelf,
          backgroundColor: "#ABEBC6",
          borderColor: "#ABEBC6"
        },
        {
          label: "Bài kiểm tra trong lớp",
          data: dataChartKiemTra,
          backgroundColor: "#AED6F1",
          borderColor: "#AED6F1"
        },
        {
          label: "Bài kiểm tra trên khảo thí",
          data: dataChartKhaoThi,
          backgroundColor: "#D7BDE2",
          borderColor: "#D7BDE2"
        }
      ],
    }

  }
  trungVi(data:number[]){
    if(data && data.length > 0){
      data = data.sort((a,b)=> a-b);
      if(data.length%2 == 0){
        const index = data.length / 2;
        const nextIndex = index+1;
        return ((data[index]+data[nextIndex])/2).toFixed(1);
      }
      else{
        const index = (data.length + 1)/2;
        return data[index];
      }
    }
    return "---";
  }
  caculatorAvg(data:number[]){
    if(data && data.length > 0){
      const avg = data.reduce((a,b)=> a+b)/data.length;
      return Math.round(avg*10)/10;
    }

    return "---";
  }
}

</script>