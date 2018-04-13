## module
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter。

### store.js
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA = {
    state: {
        countA: 0
    },
    getters: {
        totalA: (state) => (symbol) => {
            return (symbol || '$') + state.countA
        }
    },
    mutations: {
        incrementA(state, payload){
            state.countA += (payload || 1);
        }
    }
}

const moduleB = {
    state: {
        countB: 0
    },
    getters: {
        totalB: (state) => (symbol) => {
            return (symbol || '$') + state.count
        }
    },
    mutations: {
        incrementB(state, payload){
            state.countB += (payload || 1);
        }
    }
}
const store = new Vuex.Store({
    modules: {
        moduleA,
        moduleB
    }
})

export default store
```

### component
```html
<input type="button" value="increment" @click="add()"/>
<span>{{countA}}</span>
<script>
    import {mapState, mapMutations, mapActions} from 'vuex';

    export default {
        methods: {
            ...mapMutations(['incrementA']),
            ...mapMutations({add: 'incrementA'})
        },
        computed: {
            ...mapState({
                countA: state => state.moduleA.countA
            })
        }
    }
</script>
```

### 小结
- 每个模块中的 state、mutation、action、getter 都是独立的作用域
- 不同模块间的 state、getter 的属性存在同级同名的情况下会报错
- mutation、action 等方法同名的话会所有模块一起触
- 解决以上问题，需要给每个模块再做一层作用域分离——命名空间

### 命名空间
#### store.js
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA = {
    namespaced: true,
    state: {
        count: 0
    },
    getters: {
        total: (state) => (symbol) => {
            return (symbol || '$') + state.count
        }
    },
    mutations: {
        increment(state, payload){
            state.count += (payload || 1);
        }
    }
}

const moduleB = {
    namespaced: true,
    state: {
        count: 0
    },
    getters: {
        total: (state) => (symbol) => {
            return (symbol || '$') + state.count
        }
    },
    mutations: {
        increment(state, payload){
            state.count += (payload || 1);
        }
    }
}
const store = new Vuex.Store({
    modules: {
        moduleA,
        moduleB
    }
})

export default store
```

#### 带命名空间的绑定函数
```javascript
methods: {
    ...mapMutations(['moduleA/increment']),
    ...mapMutations({add: 'moduleA/increment'})
},
computed: {
    ...mapState({
        countA: state => state.moduleA.count
    })
}
```