# 组件通信
本教程只讲 Vue 本身的组件通信，不涉及借用第三方如 Vuex 之类的插件。组件通信主要分为三个部分：
- 父组件向子组件通信：父组件向子组件传参或者是父组件调用子组件的方法
- 子组件向父组件通信：子组件向父组件传参或者是子组件调用父组件的方法
- 兄弟组件通信：兄弟组件之间相互传参或调用 建议不要有太深的的嵌套关系

## 父组件向子组件通信
### 父组件向子组件传参数 - props
```html
<div id="app">
    <p><label>父组件</label><input type="text" v-model="txt"/></p>
    <child1 :txt="txt"></child1>    
</div>

<script type="text/javascript">
    var vm = new Vue({
        el: '#app1',
        data: {
            txt: ""
        },
        components: {
            'child1': {
                props: ['txt'],
                template: '<h1>{{this.txt}}</h1>'
            }
        }
    })
</script>
```
[效果预览](https://dk-lan.github.io/vue-erp/VueBasic/Communication/01-父组件向子组件传参数-props.html)

### 父组件调用子组件方法 - refs
```html
<div id="app">
    <p><label>父组件</label><input type="text" v-model="txt"/></p>
    <child1 ref="c1"></child1>    
</div>

<script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        methods: {
            change: function(event){
                this.$refs.c1.childEvent(event.target.value);
            }
        },
        components: {
            'child': {
                template: '<h1>{{this.txt}}</h1>',
                data: function(){
                    return {txt: ''};
                },
                methods: {
                    childEvent: function(_txt){
                        this.txt = _txt;
                    }
                }
            }
        }
    })
</script>
```
[效果预览](https://dk-lan.github.io/vue-erp/VueBasic/Communication/02-父组件调用子组件方法-refs.html)

### 父组件调用子组件方法 - children
```html
<div id="app">
    <p><label>父组件</label><input type="text" v-model="txt"/></p>
    <child1></child1>    
</div>

<script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        methods: {
            change: function(event){
                this.$children[0].childEvent(event.target.value);
            }
        },
        components: {
            'child': {
                template: '<h1>{{this.txt}}</h1>',
                data: function(){
                    return {txt: ''};
                },
                methods: {
                    childEvent: function(_txt){
                        this.txt = _txt;
                    }
                }
            }
        }
    })
</script>
```
[效果预览](https://dk-lan.github.io/vue-erp/VueBasic/Communication/03-父组件调用子组件方法-children.html)

## 子组件向父组件通信
### 子组件调用父组件的方法 - parent.emit
父组件在组件的生命周期用 `on` 定义事件，子组件用 `this.$parent.$emit` 调用父组件的事件。
```html
<div id="app">
    <h1>父组件-{{this.txt}}</h1>
    <child></child>
</div>

<script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        data: {
            txt: ''
        },
        mounted: function(){
            this.$on('parentEvent', function(_txt){
                this.txt = _txt;
            })
        },            
        components: {
            'child': {
                template: '<p><label>子组件</label><input type="text" v-on:input="change"/></p>',
                methods: {
                    change: function(event){
                        this.$parent.$emit('parentEvent', event.target.value)
                    }
                }
            }
        }
    })
</script>        
```
[效果预览](https://dk-lan.github.io/vue-erp/VueBasic/Communication/04-子组件调用父组件的方法-parent.emit.html)

### 子组件调用父组件的方法 - emit
父组件在调用子组件时用 `v-on` 把事件传给子组件，子组件用 `this.$emit` 调用父组件传过来的事件。
```html
<div id="app">
    <h1>父组件-{{this.txt}}</h1>
    <child v-on:parentevent="changeTxt"></child>
</div>

<script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        data: {
            txt: ''
        },
        methods: {
            changeTxt: function(_txt){
                this.txt = _txt;
            }
        } ,
        components: {
            'child': {
                template: '<p><label>子组件</label><input type="text" v-on:input="change"/></p>',
                methods: {
                    change: function(event){
                        this.$emit('parentevent', event.target.value)
                    }
                }
            }
        }
    })
</script>    
```
[效果预览](https://dk-lan.github.io/vue-erp/VueBasic/Communication/05-子组件调用父组件方法-emit.html)

### 子组件调用父组件的方法 - parent
父组件在调用子组件时用 `v-on` 把事件传给子组件，子组件用 `this.$emit` 调用父组件传过来的事件。
```html
<div id="app">
    <h1>父组件-{{this.txt}}</h1>
    <child></child>
</div>

<script type="text/javascript">
    var vm = new Vue({
        el: '#app',
        data: {
            txt: ''
        },
        methods: {
            changeTxt: function(_txt){
                this.txt = _txt;
            }
        } ,
        components: {
            'child': {
                template: '<p><label>子组件</label><input type="text" v-on:input="change"/></p>',
                methods: {
                    change: function(event){
                        this.$parent.changeTxt(event.target.value);
                    }
                }
            }
        }
    })
</script>    
```
[效果预览](https://dk-lan.github.io/vue-erp/VueBasic/Communication/06-子组件调用父组件方法-parent.html)

## 兄弟组件之间通信
和上面介绍的父子之间通信是一样的，因为任何两个子组件之间，都会拥有一个共同的父级组件，所以兄弟组件之间的通信就是子1向父，然后再父向子2，这样来达到兄弟之间组件的通信。