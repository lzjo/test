<template>
  <div class="component-b">
    <p>1. template 中不使用data的数据，无法触发updated生命周期函数</p>
    <p>2. template 中使用data的数据，触发updated中的声明周期</p>
    <p>3. updated中不可以更新data数据，否则触发死循环</p>
    <p>4. updated中是可以调用api的，如果api会更新data，而template中绑定了data属性，则会死循环</p>
    <p>5. updated的设计本身就不是用来调用api的，而是<b>检测由于data更新后的视图;是否存在某些dom未更新</b>，如果未更新，手动更新(echarts)</p>
    <!-- 尝试注释下一行以验证1的真实性，就算使用条件渲染v-if也一样会死循环 -->
    <p v-if="state > 3000">{{state}}</p>
    <div>
      <button @click="handleClick">更新data， 触发updated</button>
    </div>
    <div>
      <button @click="handleRequest1">请求api，触发updated，不更新data</button>
    </div>
    <div>
      <button @click="handleRequest2">请求api，触发updated，更新data</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'component-b',
    data () {
      return {
        state: 0
      }
    },
    methods: {
      handleClick () {
        console.log(this.state)
        this.state+=1
      },
      async handleRequest1 () {
        const res = await fetch('/api/mock.json').then(res => res.json())
        if (res && res.code === 1) {
          console.log(res)
        }
      },
      async handleRequest2 () {
        const res = await fetch('/api/mock.json').then(res => res.json())
        if (res && res.code === 1) {
          console.log(res)
          // 请求api后触发了data更新
          this.handleClick()
        }
      }
    },
    updated () {
      console.log(this.state)
      // 预判死循环，alert提醒用户并在窗口关闭后刷新网页
      if (this.state >= 3000) {
        alert('如你所见，死循环了，将自动刷新网页')
        window.location.reload()
      }
      this.handleClick()
    }
  }
</script>