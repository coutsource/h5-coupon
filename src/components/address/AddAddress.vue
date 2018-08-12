<template>

  <div class="page">
    <headersec tabname="添加地址"></headersec>
      <transition :name="slidename">
        <div class="container" v-show="mainarea">
          <van-address-edit
            :area-list="addressList"
            :address-info="addressInfo"
            show-postal
            :show-delete="isShowDelete"
            show-set-default
            show-search-result
            :search-result="searchResult"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
          />
        </div>
      </transition>
  </div>

</template>

<script>
import { AddressEdit } from 'vant'
import Headersec from '../base/HeaderSec.vue'
import initCityPicker from '../../../static/js/area.js'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      searchResult: [],
      addressList: {},
      addressInfo: {},
      isShowDelete: false,
      province: '',
      city: '',
      area: '',
      addressText: '请选择',
      activeProvince: 0,
      activeCity: 0,
      activeArea: 0,
      mainarea: false,
      slidename: 'slide-go'
    }
  },
  components: {
    Headersec,
    [AddressEdit.name]: AddressEdit
  },
  computed: {
    ...mapGetters([
      'this.$store.state.comname',
      'this.$store.state.address'
    ])
  },
  mounted() {
    const vm = this
    vm.mainarea = true
    vm.addressList = initCityPicker
    vm.setComname('addressadd')
    if (vm.$route.query.index !== undefined) {
      vm.$store.state.address.forEach((item) => {
        if (item.id === vm.$route.query.index) {
          vm.addressInfo = item
        }
      })
      vm.isShowDelete = true
    }
  },
  methods: {
    /* 保存地址 */
    onSave(content) {
      if (this.$route.query.index !== undefined) {
        this.editAddress(content)
      } else {
        content.id = this.$store.state.address.length + 1
        this.setAddress(content)
      }
      if (content.is_default === true) {
        const space = ' '
        const defaultAddress = content.province + space + content.city + space + content.county + space + content.address_detail
        setDefaultAddress(defaultAddress)
      }
      this.$router.back()
    },
    ...mapMutations({
      setAddress: 'SET_ADDRESS',
      delAddress: 'DEL_ADDRESS',
      editAddress: 'EDIT_ADDRESS',
      setDefaultAddress: 'SET_DEFAULTADDRESS',
      setComname: 'SET_COMNAME'
    }),
    onDelete() {
      this.delAddress(this.$route.query.index)
      this.$router.back()
    },
    onChangeDetail(val) {
      if (val) {
        console.log(val)
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
    @import '../../../static/less/variable.less';
    .addressBox {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 5.1rem;
        z-index: 9;
        background: #f5f5f5;
        display: block!important;
    }

    .addressBox ul {
        width: 33%;
        height: 5.1rem;
        background: @base_color;
        overflow-y: scroll;
        overflow-x: auto;
    }

    .addressBox li {
        font-size: .26rem;
        height: 0.62rem;
        line-height: 0.62rem;
        color: @base_textColor;
        text-align: left;
        padding-left: .5rem;
    }

    .cityBox {
        position: absolute;
        top: 0;
        left: 33%;
        width: 100%;
        height: 5.1rem;
        display: none;
        overflow-y: scroll;
        z-index: 19;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
    }

    .cityBox ul {
        width: 100%;
        height: 5.1rem;
    }

    .cityBox li {
        padding-left: 0.17rem;
        text-align: left;
        border-bottom: 0.01rem solid #e6e6e6;
    }

    .areaBox {
        position: absolute;
        top: 0;
        left: 33%;
        width: 33%;
        height: 5.1rem;
        display: none;
        overflow-y: scroll;
        z-index: 9999;
        -webkit-overflow-scrolling: touch;
    }

    .model-content {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: .15rem;
        margin: auto;
        background-color: #ffffff;
        text-align: center;
    }

    input {
        font-size: 0.32rem;
        width: 100%;
        text-align: center;
        margin-top: .3rem;
        border: 1px solid #ccc;
    }
    /*点击省份，出现城市*/

    .addressBox .active {
        background: @theme_background;
        color: @base_color;
    }

    .addressBox .active .cityBox {
        display: block;
    }
    /*点击城市，出现区域*/

    .cityBox .active {
        background: @theme_background;
    }

    .cityBox .active .areaBox {
        display: block;
    }

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
</style>
