<template>
    <div class=" q-gutter-md">
        <div class="text-weight-bold text-h6 ">
            Việc làm của tôi
        </div>
        <q-card>
            <q-tabs outside-arrows v-model="tab" dense class="text-grey" active-color="negative"
                indicator-color="negative" align="left" narrow-indicator>
                <q-tab class="q-mt-xs" name="job-apply" label="Ứng tuyển" />
                <q-tab class="q-mt-xs" name="job-invite" label="Lời mời phỏng vấn" />
                <q-tab class="q-mt-xs" name="job-pending" label="Đang chờ" />
                <q-tab class="q-mt-xs" name="job-in-process" label="Chấp thuận phỏng vấn" />
                <q-tab class="q-mt-xs" name="job-offer" label="Lời mời làm việc" />
                <q-tab class="q-mt-xs" name="job-working" label="Đang làm việc" />
                <q-tab class="q-mt-xs" name="job-reject" label="Từ chối" />

            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="job-apply" class="tab-panel-container">
                    <JobApply v-model:applicationList="applicationList"></JobApply>
                </q-tab-panel>

                <q-tab-panel name="job-invite">
                    <div class="tab-panel-container">
                       <JobInvite  v-model:applicationList="applicationList"></JobInvite>
                    </div>
                </q-tab-panel>
                <q-tab-panel name="job-pending">
                    <div class="tab-panel-container">
                        <JobPending  v-model:applicationList="applicationList"></JobPending>
                    </div>
                </q-tab-panel>

                <q-tab-panel name="job-in-process">
                    <div class="tab-panel-container">
                        <JobInProcess  v-model:applicationList="applicationList"></JobInProcess>
                    </div>
                </q-tab-panel>
                <q-tab-panel name="job-offer">
                    <div class="tab-panel-container">
                        <JobOffer  v-model:applicationList="applicationList"></JobOffer>
                    </div>
                </q-tab-panel>
                <q-tab-panel name="job-working">
                    <div class="tab-panel-container">
                        <JobWorking v-model:applicationList="applicationList"></JobWorking>
                    </div>
                </q-tab-panel>

                <q-tab-panel name="job-reject">
                    <div class="tab-panel-container">
                       <JobDenied v-model:applicationList="applicationList" ></JobDenied>
                    </div>
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </div>

</template>
<script>
import { useUserStore } from '@/stores/userStore';
import JobApply from '@/components/AccountJob/JobApply.vue';
import JobInvite from '@/components/AccountJob/JobInvite.vue';
import JobInProcess from '@/components/AccountJob/JobInProcess.vue';
import JobPending from '@/components/AccountJob/JobPending.vue';
import JobOffer from '@/components/AccountJob/JobOffer.vue';
import JobWorking from '@/components/AccountJob/JobWorking.vue';
import JobDenied from '@/components/AccountJob/JobDenied.vue';

import { getAllApplicationIn_User } from '@/apis/application';


export default {
    components:{
        JobApply,
        JobInvite,
        JobInProcess,
        JobPending,
        JobOffer,
        JobDenied,
        JobWorking,
    },

    data() {
        return {
            tab: 'job-apply',
            applicationList: [],
            userStore : useUserStore()
        }
    },
    watch: {
        "userStore.getUserState._id"(newValue, oldValue) {
            if (newValue) {
                this.init()
            }
        },
    },
    created() {
        this.init()
    },
    methods: {

        init() {
            getAllApplicationIn_User().then(data=>{
                if(data){
                    this.applicationList = data.map(ele=>{
                        ele.isLoading= false;
                        return (ele)
                    })
                }
            })
        },
     
    }
}
</script>
<style lang="">
    
</style>