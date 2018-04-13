### Vuex——state访问
#### 方法一、直接获取
```html
<span>{{$store.state.count}}</span>
```

#### 方法二、通过 computed 的计算属性直接赋值
```html
<span>{{count}}</span>
<script type="text/javascript">
    computed: {
        count(){
            return this.$store.state.count
        }
    } 
</script>
```

#### 方法三、通过 mapState 的计算属性直接赋值
```html
<span>{{count}}</span>
<script type="text/javascript">
    import {mapState} from 'vuex';
    computed: mapState({
        count: state => state.count
    })
</script>
```

#### 方法四、通过 mapState 的数组来赋值
```html
<span>{{count}}</span>
<script type="text/javascript">
    import {mapState} from 'vuex';
    computed: mapState(['count'])
</script>
```

#### 方法五、对象展开运算符
```html
<span>{{count}}</span>
<script type="text/javascript">
    import {mapState} from 'vuex';
    computed: {
        ...mapState({
            count: state => state.count
        })
    }
</script>
```