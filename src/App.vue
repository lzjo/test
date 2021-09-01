<template>
  <div id="app">
    <div>
      <input type="text" v-model="city" @change="getWeather" />
      <div v-for="(item, index) in weatherData" :key="index">
        {{ item.date }}--{{ item.low }}
      </div>
    </div>
  </div>
</template>

<script>
import { getCity } from './api/weather'
export default {
  data () {
    return {
      city: '',
      weatherData: []
    }
  },
  updated() {
    this.getWeather()
  },
  
  methods: {
    getWeather () {
      getCity(this.city).then(res => {
        console.log(res);
        this.weatherData = res.data.data.forecast
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
}
</script>

<style></style>
