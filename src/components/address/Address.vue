<template>
  <div class="page">
    <headersec tabname="我的地址"></headersec>
    <transition :name="slidename">
      <div class="container" v-show="mainarea">
        <div v-show="havePage">
          <van-address-list
            v-model="chosenAddressId"
            :list="list"
            @add="onAdd"
            @edit="onEdit"
            @select="onSelect"
          />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { AddressList } from 'vant'
import Headersec from '../base/HeaderSec.vue'
import Nopage from '../base/NoPage.vue'
import { mapGetters, mapMutations } from 'vuex'

const formatAddresses = (data) => {
  let addresses = []
  addresses = data.map((item) => {
    return {
      id: item.id,
      province: item.province,
      city: item.city,
      county: item.district,
      address_detail: item.address,
      area_code: item.area_code,
      postal_code: item.zip,
      name: item.contact_name,
      tel: item.contact_phone
    }
  })
  return addresses
}

export default {
  data() {
    return {
      havePage: true,
      mainarea: false,
      slidename: 'slide-go',
      chosenAddressId: 1
    }
  },
  components: {
    Headersec,
    Nopage,
    [AddressList.name]: AddressList
  },
  computed: {
    ...mapGetters([
      'this.$store.state.address',
      'this.$store.state.chooseaddress',
      'this.$store.state.ischoose',
      'this.$store.state.comname'
    ]),
    list() {
      const list = []
      const space = ' '
      this.$store.state.address.forEach((item) => {
        list.push({
          id: item.id,
          name: item.name,
          tel: item.tel,
          address: item.province + space + item.city + space + item.county + space + item.address_detail
        })
      })
      return list
    }
  },
  mounted() {
    const that = this
    that.mainarea = true
    /* 判断动画是进还是出 */
    if (this.$store.state.comname === 'addressadd') {
      this.slidename = 'slide-back'
    } else {
      this.slidename = 'slide-go'
    }
    this.setComname('address')
    this.getAddresses();
  },
  methods: {
    ...mapMutations({
      setChooseaddress: 'SET_CHOOSEADDRESS',
      setIschoose: 'SET_ISCHOOSE',
      setComname: 'SET_COMNAME'
    }),
    getAddresses() {
      const that = this
      this.$http.get('/api/addresses', {
        headers: {
          'Authorization': this.$store.state.authtoken
        }
      }).then(function(res) {
        that.$store.state.address = formatAddresses(res.data)
      })
        .catch(function(error) {
          console.log(error)
        })
    },
    onAdd() {
      this.$router.push('./addaddress')
    },
    onEdit(item, index) {
      this.$router.push({ path: './addaddress', query: { index: item.id }})
    },
    /* 选择地址 */
    onSelect(item, index) {
      this.setChooseaddress(item.address)
    }
  }
}
</script>

<style lang="less" scoped>
    @import '../../../static/less/variable.less';
    .pageBottom {
        position: fixed;
        bottom: 0;
        background: @theme_background;
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        color: @base_color;
        font-size: .28rem;
        text-align: center;
    }

    .address-item {
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: .28rem;
        text-align: center;
        border-bottom: 1px solid #ccc;
    }
    .van-radio .van-icon-checked {
      color: #06bf04 !important;
    }
    .van-address-list__add .van-icon-add {
      color: #06bf04 !important;
    }
</style>
