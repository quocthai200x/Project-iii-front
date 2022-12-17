<template>
    <div class="bg-grey-1 q-pt-xl" :style="{ minHeight: '100vh' }">
        <div class="p-container">
            <div class="q-gutter-sm">

                <div class="text-h5 text-weight-bold">KHÁM PHÁ VĂN HÓA CÔNG TY</div>
                <div class="">Tìm hiểu văn hoá công ty và chọn cho bạn nơi làm việc phù hợp nhất.</div>
                <q-form @submit="onSubmit" class=" row  justify-start items-center ">
                    <q-input class="search-ba q-pr-sm" outlined name="text" style="width: 600px" :dense="true"
                        input-class="text-body2" bg-color="grey-3" color="negative" v-model="text"
                        placeholder="Nhập tên công ty">
                        <template v-slot:append>
                            <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
                        </template>
                    </q-input>
                    <q-btn label="Tìm" type="submit" unelevated color="negative" />
                </q-form>
                <div>
                    <q-card flat class="q-pa-md q-gutter-xs">
                        <div class="text-h6 text-weight-medium">Kết quả tìm kiếm</div>
                        <div>
                            <span>
                                Chúng tôi tìm thấy
                            </span>
                            <span class="text-warning">
                                {{ " " + count + " " }}

                            </span>
                            <span>
                                kết quả phù hợp với từ khóa
                            </span>
                            <span>
                                <strong>

                                    {{ ' "' + text + '"' }}
                                </strong>
                            </span>
                        </div>
                        <div class="row">
                            <q-card-section class="col-6 q-pr-xs" v-for="(company, index) in data"
                                :key="'company-' + index">
                                <div class="row q-gutter-md">
                                    <div class="col-3">
                                        <q-img :src="company.info.logo"></q-img>
                                    </div>
                                    <div class="col-8">
                                        <div>
                                            <router-link :to="'/cong-ty/' + company.info.name">
                                                <span class="hover cursor-pointer text-bold">{{company.info.name}}</span>
                                            </router-link>
                                        </div>
                                        <div class="text-caption">
                                            <span v-for="(area, indexArea) in company.info.workingArea" :key="'area-'+indexArea">
                                                <span v-if="indexArea<company.info.workingArea.length + 1">
                                                    {{area.name + ", "}}
                                                </span>
                                                <span v-else>
                                                    {{area.name}}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </q-card-section>
                        </div>
                    </q-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DrawerVue from '../../layouts/Drawer.vue'
import { searchCompany } from "../../apis/search"
import { useQuasar } from 'quasar'

export default {
    data() {
        return {
            text: "",
            $q: useQuasar(),
            count: 0,
            data: [],
        }
    },
    watch: {
        "$route.query.keyword"(newValue, oldValue) {
            if (newValue != oldValue) {
                this.getCompanyByKeyword();
            }
        }
    },
    created() {
        this.$emit("update:layout", DrawerVue)
        this.getCompanyByKeyword()

    },
    methods: {
        onSubmit() {
            let { keyword } = this.$route.query
            if (keyword != this.text) {
                this.$router.push(`/cong-ty?keyword=${this.text}`)
            }
        },
        getCompanyByKeyword() {
            let { keyword, pageNumber } = this.$route.query
            this.text = keyword;
            searchCompany({ keyword, pageNumber, limit: 30 }).then(companies => {
                if (companies) {

                    this.count = companies.total;
                    this.data = companies.data
                }
                this.$q.notify({
                    message: 'Tìm kiếm hoàn thành',
                    color: 'green-6',
                    position: "bottom-right",
                    icon: 'check_circle',
                })
                console.log(companies)
            })
        }
    }
}
</script>
<style lang="scss">
    .hover:hover{
        transition: all 200ms;
        color: $warning;
    }
</style>