<template >
    <div class="q-mx-lg q-my-sm row q-gutter-lg justify-between">
        <div class="text-h5 q-mb-xs">Về chúng tôi</div>
        <div class="q-mb-xs">
            <span class="text-justify">{{ companyData.info.desc }}</span>
        </div>
        <div class="row justify-around fit">
            <div v-for="(location, index) in companyData.info.location" :key="'company-location-' + index"
                class="card-item   q-ma-md ">
                <div class="row justify-center q-mb-sm">
                    <q-icon name="location_on" color="black" size="40px" class="q-mr-sm " />
                </div>
                <div>
                    <div v-if="location.isHeadquarter" class="text-weight-bold text-center"><span>Trụ sở chính</span></div>
                    <div v-else class="text-weight-bold text-center"><span>Chi nhánh</span></div>
                </div>
                <div class="text-center ">
                    <span>{{ location.address + ", " }}</span>
                    <span>{{ location.ward + ", " }} </span>
                    <span>{{ location.district + ", " }}</span>
                    <span>{{ location.province }}</span>
                </div>
            </div>
            <div class="card-item   q-ma-md ">
                <div class="row justify-center q-mb-sm">
                    <q-icon name="people" color="black" size="40px" class="q-mr-sm " />
                </div>
                <div class="text-weight-bold text-center"><span>Quy mô</span></div>
                <div class="text-center">
                    <span>{{ companyData.info.size + " nhân viên" }}</span>
                    
                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    props: {
        jobDetail: Object,
        companyData: Object,
        loading: Boolean
    },
    data() {

        return {
            jobDetail: this.jobDetail, companyData: this.companyData, loading: this.loading
        }
    }
}
</script>
<style lang="scss">
    .card-item{
        
        inline-size: 300px;
        overflow-wrap: break-word;
    }
</style>