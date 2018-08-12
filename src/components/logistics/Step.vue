<template>
  <div class="page">
    <headersec tabname="物流"></headersec>
    <div class="container">
      <van-steps 
        direction="vertical" 
        :active="0" 
        active-color="#f60"
        icon="logistics"
        title="物流单号"
        description="W1231313131231">
        <van-step>
          <h3>【城市】物流状态1</h3>
          <p>2016-07-12 12:40</p>
        </van-step>
        <van-step>
          <h3>【城市】物流状态2</h3>
          <p>2016-07-11 10:00</p>
        </van-step>
        <van-step>
          <h3>快件已发货</h3>
          <p>2016-07-10 09:30</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
import Headersec from '../base/HeaderSec.vue'
import { Step, Steps } from 'vant'
export default {
  data() {
    return {
    }
  },
  components: {
    Headersec,
    [Step.name]: Step,
    [Steps.name]: Steps
  }
}
</script>