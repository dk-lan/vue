## getter
getters 可以理解为 vuex 中的 computed，和 vue 中的 computed 类似，都是用来计算 state 然后生成新的数据 ( 状态 ) 的。

在上面的案例当中，如果想得到的 state 最终为一个带了币种的金额，只要给一个统一的出口，返回统一的数据模式。

#### 简单实现
##### store.js
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
    count: 0
}

let getters = {
    total: state => {
        return '$' + state.count;
    }
}

let mutations = {
    increment(_state, n){
        _state.count += n || 1;
    },
    decrement(){
        state.count -= 1;
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations
})

export default store
```

#### getter 通过属性访问
```html
<h3>count-{{$store.getters.total}}</h3>
```

#### getter 通过方法访问
如果上面的方法想改变货币符号，那就要通过传参方式来解决
```javascript
let getters = {
    total: (state) => (symbol) => {
        return (symbol || '$') + state.count;
    }
}
```
```html
<h3>count-{{$store.getters.total('￥')}}</h3>
```

#### mapGetters 辅助函数
```html
<template>
    <div>
        <h3>count-{{total('￥')}}</h3>
    </div>
</template>

<script>
    import common from '../../common/common.js'
    import {mapState, mapMutations, mapGetters} from 'vuex';
    export default {
        computed: {
            ...mapGetters([
                'total'
            ])
        }
    }
</script>
```

#### mapGetters 辅助函数之别名
```html
<template>
    <div>
        <h3>count-{{amount('￥')}}</h3>
    </div>
</template>

<script>
    import common from '../../common/common.js'
    import {mapState, mapMutations, mapGetters} from 'vuex';
    export default {
        computed: {
            ...mapGetters({
                amount: 'total'
            })
        }
    }
</script>
```