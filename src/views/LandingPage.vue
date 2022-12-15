<template>
 <div class="bg-grey-1">
   
   <div class="col">
     
     <CarouselBannerVue :arrayImage="array"></CarouselBannerVue>
    <q-page padding>
      <h5 class="text-weight-bold">Top công ty nổi bật</h5>
      <div class="fit row justify-between items-center ">
        <q-card non-selectable class="my-card my-top-company" v-for="(item, index) in companyTop"
        :key="'top-company-' + index">
        <router-link :to="item.link">
          <span class="q-focus-helper"></span>
          <q-card-section>
            <q-img fit='cover' loading="lazy" width="200px" :ratio="16 / 9" :src="item.logo">
            </q-img>
            <div class="q-mt-sm q-mb-sm text-weight-bold text-subtitle2 text-center">
              {{ item.name }}
            </div>
          </q-card-section>
        </router-link>
      </q-card>
      
    </div>
    <h5 class="text-weight-bold">Việc làm tốt nhất</h5>
    <CarouselJob :key="keyRenderUI" :arrayJob="bestJobs" :isHot="true"></CarouselJob>
    <div id="container-carousel-top-area">
      <h5 class="text-weight-bold">Các ngành nghề trọng điểm</h5>
      <CarouselTopArea></CarouselTopArea>
      </div>
      <section id="banner">
        <router-link to="https://www.facebook.com/?ref=tn_tnmn" target="_blank">
          <q-img fit="cover" loading="lazy" width="100%" height="400px"
          src="https://intphcm.com/data/upload/banner-la-gi.jpg"></q-img>
        </router-link>
      </section>
      <h5 class="text-weight-bold">Việc làm gợi ý</h5>
      <CarouselJob :key="keyRenderUI"  :arrayJob="bestJobs" :isHot="false"></CarouselJob>
      
      <h5 class="">Việc làm nổi bật ngành
        <strong>
          <router-link to="https://www.facebook.com/?ref=tn_tnmn">
            IT- phần mềm
          </router-link>
        </strong>
      </h5>
      <CarouselJob :arrayJob="popularJobs1" :isHot="false" :key="keyRenderUI"></CarouselJob>
      
      <h5 class="">Việc làm nổi bật ngành <strong>
        <router-link to="https://www.facebook.com/?ref=tn_tnmn">
          Tư vấn
        </router-link>
      </strong> </h5>
      <CarouselJob :arrayJob="popularJobs2" :isHot="false" :key="keyRenderUI"></CarouselJob>
    </q-page>

  </div>
  </div>
</template>

<script >
import CarouselBannerVue from '@/components/CarouselBanner.vue';
import CardJobVue from '@/components/CardJobDetail.vue';
import CarouselJob from '@/components/CarouselJob.vue';
import { ref } from 'vue'
import { JobDetailEx } from "@/example/jobDetailExample"
import CarouselTopArea from "@/components/CarouselTopArea.vue"
import DrawerVue from '@/layouts/Drawer.vue';
import { searchJob } from '@/apis/search';

export default {
  components: { CardJobVue, CarouselBannerVue, CarouselJob, CarouselTopArea },
  data() {
    const array = [
      "https://loremflickr.com/1280/720/banner?lock=23423",
      'https://loremflickr.com/1280/720/banner?lock=55346',
      "https://loremflickr.com/1280/720/banner?lock=12455",
      "https://loremflickr.com/1280/720/banner?lock=75543"
    ]
    const logo = "https://inkythuatso.com/uploads/images/2021/09/logo-techcombank-inkythuatso-10-15-11-46.jpg"
    const companyTop = [
      {
        name: "MB Bank",
        logo: logo,
        link: "/about/1"
      },
      {
        name: "MB Bank",
        logo: logo,
        link: "/about/2"
      },
      {
        name: "MB Bank",
        logo: logo,
        link: "/about/3"
      },
      {
        name: "MB Bank",
        logo: logo,
        link: "/about/4"
      },
      {
        name: "MB Bank",
        logo: "https://inkythuatso.com/uploads/images/2021/09/logo-vietcombank-inkythuatso-10-10-41-18.jpg",
        link: "/about/5"
      },
      {
        name: "MB Bank",
        logo: logo,
        link: "/about/6"
      },



    ]
    return {
      array, companyTop, popularJobs1: [], popularJobs2: [], bestJobs: [], keyRenderUI: 0
    }
  },

  created() {

    this.$emit("update:layout", DrawerVue)
    this._getPopularJobs1();
    this._getPopularJobs2()
    this._getBestJobs()
  },
  methods: {
    _getSliceArr(arr){
      let new_arr = [];
      let from = 0;
      let range = 9;
      while(from < arr.length ){
        new_arr.push(arr.slice(from, from + range))
        from = from + range;
      }
      return new_arr
    },
    _getPopularJobs1() {
      searchJob({
        text: "Kỹ thuật - Công nghệ", 
        filter:{
          // "info.type.field": ""
        },
        pageNumber: 0,
        limit: 90,
      }).then(data=> {
        this.popularJobs1 = this._getSliceArr( data.data);
        this.keyRenderUI++;  
      }
      )
    },
    _getPopularJobs2() {
      searchJob({
        text: "Dịch vụ", 
        filter:{
          // "info.type.field": ""
        },
        pageNumber: 0,
        limit: 90,
      }).then(data=> {
        this.popularJobs2 = this._getSliceArr( data.data);
        this.keyRenderUI++;  
      }
      )
    },
    _getBestJobs() {
      searchJob({
        text: "", 
        filter:{},
        pageNumber: 0,
        limit: 90,
      }).then(data=> {
        this.bestJobs = this._getSliceArr(data.data);
        this.keyRenderUI++;  
      }
      )
    },
  }
}
</script>


<style lang="scss" scoped>
.my-top-company:hover {
  border-color: aquamarine;
  border-width: 1px;
}

#container-carousel-top-area {}

#banner {
  margin-top: 40px
}
</style>
