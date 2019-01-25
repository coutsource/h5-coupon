<template>

  <div class="page">
    <headersec tabname="添加地址"></headersec>
      <transition :name="slidename">
        <div class="container" v-show="mainarea">
          <van-address-edit
            :area-list="addressList"
            :address-info="addressInfo"
            :show-postal=false
            :show-delete="isShowDelete"
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

const formatAddress = (item) => {
  return {
    id: item.id,
    province: item.province,
    city: item.city,
    district: item.county,
    address: item.address_detail,
    area_code: item.area_code,
    zip: '000000',
    contact_name: item.name,
    contact_phone: item.tel
  }
}

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
          console.log(item)
          vm.addressInfo = item
        }
      })
      vm.isShowDelete = true
    }
  },
  methods: {
    /* 保存地址 */
    onSave(content) {
      const that = this
      if (this.$route.query.index !== undefined) {
        this.$http.put('/api/address/' + this.$route.query.index, formatAddress(content), {
          headers: {
            'Authorization': this.$store.state.authtoken
          }
        }).then(function(res) {
          that.editAddress(content)
        })
          .catch(function(error) {
            console.log(error)
          })
      } else {
        content.postal_code = '000000'
        this.$http.post('/api/address/store', content, {
          headers: {
            'Authorization': this.$store.state.authtoken
          }
        }).then(function(res) {
          content.id = res.data.id
          this.setAddress(content)
        })
          .catch(function(error) {
            console.log(error)
          })
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
    onDelete(content) {
      this.$http.delete('/api/address/' + content.id, {
        headers: {
          'Authorization': this.$store.state.authtoken
        }
      }).then(function(res) {
      })
        .catch(function(error) {
          console.log(error)
        })
      this.delAddress(content.id)
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
        font-size: 0.42rem;
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
