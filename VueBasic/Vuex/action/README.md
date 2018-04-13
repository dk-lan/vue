## Action
先引用官方文档的说法

Action 类似于 mutation，不同在于：
- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

实现上是没问题，action 调用 mutation，但关于异步要放到 action 的说法，个人观点是没有这个必要，在 mutation 的小结中有说到过，mutation 只做同步也不是制性的

在使用 Action 前先与 Mutation 做个小结
- action 并不是必须的，项目中完全可以不需要 action
- 异步操作可放 mutation 和 action，只要开发时方便，都没有影响
- 关于官方说 action 异步，mutation 同步的说法只是为了能用 devtools 追踪状态变化。
- action 中的方法和 mutation 一样，最多只有两个形参，第一个为 context，可以理解为 store，第二个为手动传的参数
- action 用 commit() 来触发 mutation
- view 层通过 store.dispath 来分发 action

### 简单使用
在 action 
#### store.js
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
    count: 0
}

let getters = {
    total: (state) => (symbol) => {
        return (symbol || '$') + state.count;
    }
}

let mutations = {
    increment(_state, n){
        console.log(arguments)
        _state.count += n || 1;
    },
    decrement(){
        state.count -= 1;
    }
}

let actions = {
    increment(context, n){
        context.commit('increment', n)
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store
```

#### 分发 action
```html
<input type="button" value="increment" @click="$store.dispatch('increment', 5)"/>
```

#### mapActions
和 mutation 的使用方法基本一样
```javascript
methods: {
    ...mapActions(['increment']),
    ...mapActions({add: 'increment'})
}
```