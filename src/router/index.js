import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/Index'
// import Category from '@/components/Category/Category'
// import Cart from '@/components/Cart/Cart'
// import Member from '@/components/Member/Member'
// import Order from '@/components/Order/Order'
// import Address from '@/components/Address/Address'
// import AddAddress from '@/components/Address/AddAddress'
// import Detail from '@/components/Detail/Detail'
// import OrderWait from '@/components/Order/OrderWait'
Vue.use(Router)

const Login = (resolve) => {
  import('@/components/Login/Login').then((module) => {
    resolve(module)
  })
}
const Index = (resolve) => {
  import('@/components/Index').then((module) => {
    resolve(module)
  })
}
const Category = (resolve) => {
  import('@/components/Category/Category').then((module) => {
    resolve(module)
  })
}
const Cart = (resolve) => {
  import('@/components/Cart/Cart').then((module) => {
    resolve(module)
  })
}
const Member = (resolve) => {
  import('@/components/Member/Member').then((module) => {
    resolve(module)
  })
}
const Info = (resolve) => {
  import('@/components/Member/Info').then((module) => {
    resolve(module)
  })
}
const Card = (resolve) => {
  import('@/components/Card/Card').then((module) => {
    resolve(module)
  })
}
const Order = (resolve) => {
  // import('@/components/Order/Order').then((module) => {
  //   resolve(module)
  // })
  import('@/components/Order/MyOrder').then((module) => {
    resolve(module)
  })
}
const Address = (resolve) => {
  import('@/components/Address/Address').then((module) => {
    resolve(module)
  })
}
const AddAddress = (resolve) => {
  import('@/components/Address/AddAddress').then((module) => {
    resolve(module)
  })
}
const Detail = (resolve) => {
  import('@/components/Detail/Detail').then((module) => {
    resolve(module)
  })
}
const OrderWait = (resolve) => {
  import('@/components/Order/OrderWait').then((module) => {
    resolve(module)
  })
}
const WaitPay = (resolve) => {
  import('@/components/Order/WaitPay').then((module) => {
    resolve(module)
  })
}
const WaitDeliver = (resolve) => {
  import('@/components/Order/WaitDeliver').then((module) => {
    resolve(module)
  })
}
const WaitReceive = (resolve) => {
  import('@/components/Order/WaitReceive').then((module) => {
    resolve(module)
  })
}
const OrderDown = (resolve) => {
  import('@/components/Order/OrderDown').then((module) => {
    resolve(module)
  })
}
const LogisticsStep = (resolve) => {
  import('@/components/Logistics/Step').then((module) => {
    resolve(module)
  })
}

const OrderDone = (resolve) => {
  import('@/components/Order/OrderDone').then((module) => {
    resolve(module)
  })
}
export default new Router({
//   mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Login
    },
    {
      path: '/index',
      meta: {
        requireAuth: true
      },
      component: Index
    },
    {
      path: '/category',
      meta: {
        requireAuth: true
      },
      component: Category
    },
    {
      path: '/cart',
      meta: {
        requireAuth: true
      },
      component: Cart
    },
    {
      path: '/member',
      meta: {
        requireAuth: true
      },
      component: Member
    },
    {
      path: '/info',
      meta: {
        requireAuth: true
      },
      component: Info
    },
    {
      path: '/card',
      meta: {
        requireAuth: true
      },
      component: Card
    },
    {
      path: '/order',
      meta: {
        requireAuth: true
      },
      component: Order
    },
    {
      path: '/address',
      meta: {
        requireAuth: true
      },
      component: Address
    },
    {
      path: '/addaddress',
      meta: {
        requireAuth: true
      },
      component: AddAddress
    },
    {
      path: '/detail',
      meta: {
        requireAuth: true
      },
      component: Detail
    },
    {
      path: '/orderwait',
      meta: {
        requireAuth: true
      },
      component: OrderWait
    },
    {
      path: '/waitpay',
      meta: {
        requireAuth: true
      },
      component: WaitPay
    },
    {
      path: '/waitdeliver',
      meta: {
        requireAuth: true
      },
      component: WaitDeliver
    },
    {
      path: '/waitreceive',
      meta: {
        requireAuth: true
      },
      component: WaitReceive
    },
    {
      path: '/orderdown',
      meta: {
        requireAuth: true
      },
      component: OrderDown
    },
    {
      path: '/logisticsstep',
      meta: {
        requireAuth: true
      },
      component: LogisticsStep
    },
    {
      path: '/orderdone',
      meta: {
        requireAuth: true
      },
      component: OrderDone
    }
  ]
})