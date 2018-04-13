### Vuex——Mutation
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件，每个 mutation 的方法都会有一个 state 的参数在 commit 的时候当回调形参传过来，该形参就是 store.state

```javascript
let mutations = {
    increment(_state){
        _state.count += 1;
    },
}
```

#### Mutation 传参数——提交载荷（Payload）
可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）：
```javascript
let mutations = {
    increment(_state){
        _state.count += 1;
    },
}

this.$store.commit('increment', 10);
```

大多数情况下要传多个参数，但是 mutation 的方法最多只有两个参数，一个是 state，另一个是 payload，所以参数可以用对象的方式去传。

#### Mutation 触发之 mapMutations 篇
```html
<input type="button" value="increment" @click="increment(10)"/>
<script type="text/javascript">
    import {mapMutations} from 'vuex';
    methods: mapMutations(['increment'])
</script>
```

#### Mutation 触发之 mapMutations 别名篇
```html
<input type="button" value="increment" @click="add(10)"/>
<script type="text/javascript">
    import {mapMutations} from 'vuex';
    methods: mapMutations({
        add: 'increment'
    })
</script>
```

#### Mutation 触发之对象展开运算符篇
```html
<input type="button" value="increment" @click="increment(10)"/>
<script type="text/javascript">
    import {mapMutations} from 'vuex';
    methods: {
        ...mapMutations(['increment']),
    }
</script>
```

#### Mutation 触发之对象展开运算符别名篇
```html
<input type="button" value="increment" @click="add(10)"/>
<script type="text/javascript">
    import {mapMutations} from 'vuex';
    methods: {
        ...mapMutations({
            add: 'increment'
        }),
    }
</script>
```

## 小结
官方文档说 mutation 必须是同步函数，于个人而言，这个观点不成立。在 mutation 中同步只是为了能用 devtools 追踪状态变化。

当然对于开发者来说，用别人的框架，遵守别人的框架规则最起码是没有问题的。