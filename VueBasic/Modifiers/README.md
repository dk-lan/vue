# 事件修饰符
对事件添加一些通用的限制，比如阻止事件冒泡，Vue 对这种事件的限制提供了特定的写法，称之为修饰符
用法：v-on:事件.修饰符

```html
    <!--阻止事件冒泡.stop-->
    <div id="div1" class="stop" @click.stop="event1(1)">
    <!--使用事件捕获模式.capture-->
    <div id="div4" class="stop" @click.capture="event1(4)">
    <!--事件只作用本身.self，类似于已阻止事件冒泡-->
    <div id="div7" class="stop" @click.self="event1(7)">
    <!--阻止浏览器默认行为.prevent-->
    <a href="https://github.com/dk-lan" target="_blank" @click.prevent="prevent">dk's github</a>
    <!--只作用一次.once-->
    <a href="https://github.com/dk-lan" target="_blank" @click.once="prevent">dk's github</a>
    <!--修饰符可以串联.click.prevent.once-->
    <a href="https://github.com/dk-lan" target="_blank" @click.prevent.once="prevent">dk's github</a>
```
[事件修饰符效果预览](https://dk-lan.github.io/vue-erp/VueBasic/Modifiers/eventModifiers.html)

#按键修饰符
```html
<div id="app">
    <fieldset>
        <legend><h3>ASCII = 13 时触发</h3></legend>
        <p></p>
        <input @keyup.13="submit">  
    </fieldset>
    <fieldset>
        <legend><h3>按回车键时触发</h3></legend>
        <p></p>
        <input @keyup.enter="submit">
    </fieldset> 
    <fieldset>
        <legend><h3>自定义按键 Vue.config.keyCodes.number1 = 49</h3></legend>
        <input @keyup.number1="submit" />       
    </fieldset> 
</div>
```
[按键修饰符效果预览](https://dk-lan.github.io/vue-erp/VueBasic/Modifiers/keypress.html)

# 表单修饰符
```html
        <!-- 在 "change" 而不是 "input" 事件中更新 -->
        <input v-model.lazy="counter">  
        <!-- 自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值） -->
        <input v-model.number="counter" type="number">          
        <!-- 自动过滤用户输入的首尾空格 -->
        <input v-model.trim="counter">  
```
[表单修饰符效果预览](https://dk-lan.github.io/vue-erp/VueBasic/Modifiers/form.html)