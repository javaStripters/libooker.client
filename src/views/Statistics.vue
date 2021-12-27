<template>
  <div class="statistics">
    <Container
      class="statistics__container"
    >
      <div class="statistics__title">СТАТИСТИКА</div>
      <div class="statistics__main">
        <div class="statistics__time">
          <div class="statistics__header">
            <div class="statistics__filters">
              <div 
                class="statistics__filter"
                v-for="filter in 3"
                :key="filter"
                v-html="filter"
              >

              </div>
            </div>
            <button class="statistics__download-btn">
              <img :src="require('@/assets/icons/download-icon.svg')" alt="">
            </button>
          </div>
          <div class="statistics__body">
            <div class="statistics__card">
              <div>
                <div>{{}}</div>
                <div>Время всех комп-ов</div>
              </div>
              <div>
                <div>{{}}</div>
                <div>Кол-во посетивших</div>
              </div>
              <div>
                <div>{{}}</div>
                <div>Ср. время 1 комп-а</div>
              </div>
              <div>
                <div>{{}}</div>
                <div>Кол-во отмен. записей</div>
              </div>
            </div>
            <div class="statistics__card">
              <div style="padding: 16px; font-weight: 700">График посещения людей</div>
              <ApexCharts 
                type="bar" 
                width="100%"
                :options="data.chartOptions" 
                :series="data.series"
              />
            </div>
            <div class="statistics__card">
              <div style="padding: 16px; font-weight: 700">Максимальная загруженность зала</div>
              <ApexCharts 
                type="bar" 
                width="100%"
                :options="data.chartOptions" 
                :series="data.series"
              />
            </div>
          </div>
        </div>
        <div class="statistics__computers">
          <div class="statistics__header">
            <div class="statistics__filters">
              <div 
                class="statistics__filter"
                v-for="filter in 3"
                :key="filter"
                v-html="filter"
              >

              </div>
            </div>
            <SearchBox />
          </div>
          <div class="statistics__body">
            <div class="statistics__card"></div>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>


<script>
import Container from '@/components/Container.vue'
import SearchBox from '@/components/SearchBox.vue'
import ApexCharts from 'vue-apexcharts'
export default {
  data: () => ({
    data: {
          
          series: [{
            name: 'Inflation',
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
          }],
          chartOptions: {
            chart: {
              height: 250,
              type: 'bar',
            },
            plotOptions: {
              bar: {
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
            },
            legend: {
              show: false
            },
            dataLabels: {
              enabled: false,
              formatter: function (val) {
                return val + "%";
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },
            
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              position: 'top',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              // crosshairs: {
              //   fill: {
              //     type: 'gradient',
              //     gradient: {
              //       colorFrom: '#D8E3F0',
              //       colorTo: '#BED1E6',
              //       stops: [0, 100],
              //       opacityFrom: 0.4,
              //       opacityTo: 0.5,
              //     }
              //   }
              // },
              tooltip: {
                enabled: true,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: true,
                formatter: function (val) {
                  return val + "%";
                }
              }
            
            },
            // title: {
            //   text: 'Monthly Inflation in Argentina, 2002',
            //   floating: true,
            //   offsetY: 330,
            //   align: 'center',
            //   style: {
            //     color: '#444'
            //   }
            // }
          },
          
          
        },
  }),
  components: {
    Container,
    SearchBox,
    ApexCharts
  }
}
</script>

<style scoped>
.statistics__container {
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.statistics__title {
  font-size: 18px;
  font-weight: 700;
}
.statistics__main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.statistics__time, .statistics__computers {
  background: #FBFBFB;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 16px 32px;
}
.statistics__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.statistics__filters {
  display: flex;
  gap: 20px;
  align-items: center;
}
.statistics__filter {
  min-width: 120px;
  height: 24px;
  padding: 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  columns: #868686;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
}
.statistics__body {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  overflow-x: auto;
  overflow-y: hidden;

}
.statistics__body::-webkit-scrollbar {
  display: none;
}
.statistics__card {
  padding: 16px;
  background: #FEFEFE;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  width: 100%;
}
.statistics__time .statistics__body .statistics__card:nth-child(1) {
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  gap: 20px;
  align-items: center;
  justify-items: center;
  text-align: center;
}
.statistics__time .statistics__body .statistics__card:nth-child(1) div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.statistics__time .statistics__body .statistics__card:nth-child(1) div div:nth-child(1) {
  font-size: 24px;
  font-weight: 700;
}
.statistics__time .statistics__body .statistics__card:nth-child(1) > div:nth-child(4) {
  color: #A51010;
}
.statistics__time .statistics__body .statistics__card:nth-child(1) > div:nth-child(2) {
  color: #013B2B;
}
.statistics__time .statistics__body .statistics__card:nth-child(2) {
  display: flex;
  flex-direction: column;
  padding: 0;
  min-width: 300px;
}
.statistics__time .statistics__body .statistics__card:nth-child(3) {
  display: flex;
  flex-direction: column;
  padding: 0;
  min-width: 300px;
}
</style>