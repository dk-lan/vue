# Vuex
在介绍 Vuex 之前，我先抛出一个问题，如下图(点击图片可查看大图) 

<img src="../imgs/001.jpg" height = "300" />
请原谅并忽略手绘图的粗糙，主要描述的结构是：

- 组件A
    - 组件B
        + 组件B1
            * 事件：Event1
            * 事件：Event2
            * 事件：Event3
        + 组件B2
            * 事件：Event1
            * 事件：Event2
            * 事件：Event3
    - 组件C
        + 组件C1
            * 事件：Event1
            * 事件：Event2
            * 事件：Event3
        + 组件C2
            * 事件：Event1
            * 事件：Event2
            * 事件：Event3
            
现在的问题要解决是组件C1或者C2要和组件B1或B2通信，前面有详细讲过 Vue 本身组件之间通信的方法，最简单的就是 `$parent` 和 `$children`，如果不知道如何使用的请回到上面看 [组件通信](https://github.com/dk-lan/vue-erp/tree/master/VueBasic/Communication)

现在用 `$parent` 和 `$children` 来上面的问题：组件C1调用组件B2的方法
```javascript
this.$parent.$parent.$children[0].$children[1].Event1()
```
代码写到这问题解决了，但是如果再多几层的组件嵌套关系，又或者组件层级关系因需求发生了改变，那上面的代码又得重新改变。

为了解决这样的问题，有人想到了把为何不把所有组件的方法统一到一个公共对象，因为对象是一个无序属性集合，而且还是引用类型，然后把这个对象放到最外层，这样不管组件嵌套多少级，都能调用到对应的方法。

那上面的案例就可以生成如下面这种结构的对象了
```javascript
    var obj = {
        A: {},
        B: {},
        B1: {
            Event1: function(){},
            Event2: function(){},
            Event3: function(){}
        },
        B2: {
            Event1: function(){},
            Event2: function(){},
            Event3: function(){}
        },        
        C: {},
        C1: {
            Event1: function(){},
            Event2: function(){},
            Event3: function(){}
        },
        C2: {
            Event1: function(){},
            Event2: function(){},
            Event3: function(){}
        },         
    }
```


## 跨组件通信之——公共对象
场景：在组件 home 里面使用组件 counter，在 home 组件中实现计数，在组件 counter 同步显示当前计数。
#### common.js
```javascript
export default {
    state: {
        count: 0
    }
}
```

#### countercomponent
```html
<template>
    <div>
        <h3>count-{{common.state.count}}</h3>
    </div>
</template>

<script>
    import common from '../../common/common.js'
    export default {
        data(){
            return {
                common
            }
        }
    }
</script>
```

#### homecomponent
```html
<template>
    <div>
        <fieldset>
            <legend><h3>home</h3></legend>
            <div>
                <input type="button" value="increment" @click="increment"/>
                <span>{{common.state.count}}</span>
            </div>
        </fieldset>
        <fieldset>
            <legend><h3>counter</h3></legend>
            <counter></counter>
        </fieldset>
        
    </div>
</template>

<script>
    import common from '../../common/common.js'
    import counter from '../counter/counter.vue'

    export default {
        data(){
            return {
                common
            }
        },
        components: {
            datagrid,
            counter
        },
        methods: {
            increment(){
                this.common.state.count += 1;
            }
        }
    }
</script>
```

上面的案例是通过公共对象解决了简单的跨组件通信的问题，但如果组件 counter 也想能可以实现计数，那最简单的实现方法就是在组件 counter 当中也写一个事件 increment，但这样一来，事件就重复了。

封装实现就是把事件 increment 也放到 common.js 对象中去，然后组件都调用这个公共的方法。
```javascript
let state = {
    count: 0
}

let mutations = {
    increment(){
        state.count += 1;
    }
}
export default {
    state,
    mutations
};
```

看似解决了问题，但是如果场景更复杂，组件层级更深，组件间要通信的信息更多，组件间存在同名属性同名方法但不同逻辑等，目前这种方法就解决不了，需要进行更深层次的封装。

Vuex 就是上面这种解决方案的更深层次的实现。

## 跨组件通信之——Vuex
#### store.js
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
    count: 0
}

let mutations = {
    increment(){
        state.count += 1;
    },
    decrement(){
        state.count -= 1;
    }
}

const store = new Vuex.Store({
    state,
    mutations
})

export default store
```

#### app.js
```javascript
import Vue from 'vue'
import store from './vuex/store'

import homeComponent from './components/home/home.vue'

new Vue({
    el: '#app',
    store,
    render:h => h(homeComponent)
})
```

#### homecomponent

```html
<input type="button" value="increment" @click="increment"/>
<span>{{$store.state.count}}</span>
<script type="text/javascript">
    methods: {
        increment(){
            this.$store.commit('increment');
        }
    }    
</script>
```

#### countercomponent
```html
<span>{{$store.state.count}}</span>
```

#### 小结
- Vuex 实例 store，添加到 Vue 实例化当中去，然后整个 Vue 实例都能通过 $store 获取到公共对象 store。
- 用 `this.$store.commit('increment');` 触发 mutations 的 increment 方法
- state 是通过 mutations 来改变
- 用`$store.state.count`获取 store 的 state。