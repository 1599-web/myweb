<template>
    <div class="game-area">
      <div class="game-header">
        <button class="back-btn" @click="$emit('back')">
          <i class="fas fa-arrow-left"></i> 返回
        </button>
        <h2>贪吃蛇</h2>
      </div>
      <div class="game-content">
        <div class="game-div">
          <div class="game-min">
            <div v-for="(e, i) in frame" :key="i" class="row">
              <p v-for="(b, j) in e" :key="j" class="element" :style="{ background: b.bg }"></p>
            </div>
          </div>
          <div class="right-div">
            <div class="score-item">
              <p>得分</p>
              <p>{{ score }}</p>
            </div>
            <div class="score-item">
              <p>等级</p>
              <p>{{ level }}</p>
            </div>
            <div class="score-item">
              <p>吃</p>
              <p>{{ times }}</p>
            </div>
            <div class="ztks" @click="autMove">暂停/开始</div>
          </div>
        </div>
        <div class="control">
          <p @click="moveTop">向上</p>
          <div class="lr">
            <p @click="moveLeft">向左</p>
            <p @click="moveRight">向右</p>
          </div>
          <p @click="moveBottom">向下</p>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onUnmounted, onMounted } from 'vue'
import { color } from '@/utils/ykdata'
// 原有的贪吃蛇游戏代码
const row = ref(20)
const col = ref(20)
const frame = ref([])
const bg = ref('#eee')
const snake = ref({})
const food = ref({})
const colorList = color[0]
const over = ref(false)
const timer = ref(null)
const speed = ref(600)
const fx = ref(0)
const times = ref(0)
const level = ref(1)
const score = ref(0)
const site = ref([0, 0])

// 定义emit
const emit = defineEmits(['back'])

//初始化游戏
onMounted(() => {
  initGame()
})
// 初始化游戏框架
function gameFrame() {
  frame.value = []  // 确保先清空
  for (let i = 0; i < row.value; i++) {
    let a = []
    for (let j = 0; j < col.value; j++) {
      a.push({ bg: bg.value })
    }
    frame.value.push(a)
  }
}

// 初始化蛇
function initSnake() {
  snake.value = {
    site: [9, 8, 9, 9, 9, 10],
    color: colorList[6],
  }
  if (frame.value.length > 0) {
    renderBlock(snake.value, frame.value, 1)
  }
}

// 渲染方块
function renderBlock(a, b, n) {
  const c = a.site
  if (!c || !b) return
  
  if (n === 1) {
    for (let i = 0; i < c.length; i += 2) {
      if (c[i] >= 0 && c[i] < row.value && c[i + 1] >= 0 && c[i + 1] < col.value) {
        b[c[i]][c[i + 1]].bg = a.color
      }
    }
  } else if (n === 0) {
    for (let i = 0; i < c.length; i += 2) {
      if (c[i] >= 0 && c[i] < row.value && c[i + 1] >= 0 && c[i + 1] < col.value) {
        b[c[i]][c[i + 1]].bg = bg.value
      }
    }
  }
}

// 初始化食物
function initFood() {
  if (!frame.value.length) return
  sfood()
  const siteVal = site.value
  const foodColor = colorList[Math.floor(Math.random() * 7)]
  food.value = { site: siteVal, color: foodColor }
  renderBlock(food.value, frame.value, 1)
}

// 食物位置生成
function sfood() {
  site.value = [Math.floor(Math.random() * row.value), Math.floor(Math.random() * col.value)]
  const snakeSite = snake.value.site
  for (let i = 0; i < snakeSite.length; i += 2) {
    if (snakeSite[i] === site.value[0] && snakeSite[i + 1] === site.value[1]) {
      sfood()
    }
  }
}

// 蛇身移动
function move() {
  const site = snake.value.site
  for (let i = site.length - 1; i > 1; i -= 2) {
    site[i] = site[i - 2]
    site[i - 1] = site[i - 3]
  }
}

// 各方向移动函数
function moveLeft() {
  if (!over.value && fx.value !== 1) {
    fx.value = 0
    clearInterval(timer.value)
    startInterval('left')
  }
}

function moveRight() {
  if (!over.value && fx.value !== 0) {
    fx.value = 1
    clearInterval(timer.value)
    startInterval('right')
  }
}

function moveTop() {
  console.log("Bb")
  if (!over.value && fx.value !== 3) {
    fx.value = 2
    clearInterval(timer.value)
    startInterval('top')
  }
}

function moveBottom() {
  if (!over.value && fx.value !== 2) {
    fx.value = 3
    clearInterval(timer.value)
    startInterval('bottom')
  }
}

// 自动移动定时器
function startInterval(direction) {
  if (!frame.value.length) return
  
  timer.value = setInterval(() => {
    if (!snake.value || !frame.value.length) {
      clearInterval(timer.value)
      return
    }
    
    renderBlock(snake.value, frame.value, 0)
    const headX = snake.value.site[0]
    const headY = snake.value.site[1]

    if (direction === 'left') {
      eat(headX, headY - 1)
      move()
      snake.value.site[1]--
    } else if (direction === 'right') {
      eat(headX, headY + 1)
      move()
      snake.value.site[1]++
    } else if (direction === 'top') {
      eat(headX - 1, headY)
      move()
      snake.value.site[0]--
    } else if (direction === 'bottom') {
      eat(headX + 1, headY)
      move()
      snake.value.site[0]++
    }

    checkCollision()
    renderBlock(snake.value, frame.value, 1)
  }, speed.value)
}

// 撞墙或撞自己检测
function checkCollision() {
  const x = snake.value.site[0]
  const y = snake.value.site[1]

  if (x < 0 || x >= row.value || y < 0 || y >= col.value) {
    console.log('撞墙了')
    over.value = true
    clearInterval(timer.value)
    return
  }

  for (let i = 2; i < snake.value.site.length; i += 2) {
    if (snake.value.site[i] === x && snake.value.site[i + 1] === y) {
      console.log('碰到自己了')
      over.value = true
      clearInterval(timer.value)
      return
    }
  }
}

// 吃食物
function eat(i, j) {
  const foodSite = food.value.site
  if (i === foodSite[0] && j === foodSite[1]) {
    snake.value.site.unshift(foodSite[0], foodSite[1])
    initFood()

    times.value++
    const lev = Math.floor(times.value / 10) + 1

    if (lev > level.value) {
      level.value = lev
      if (level.value < 15) {
        speed.value = 600 - (level.value - 1) * 40
      } else {
        speed.value = 30
      }
      clearInterval(timer.value)
      autMove()
    }
    score.value += level.value * 100
  }
}

// 自动移动控制
function autMove() {
  console.log("Aa")
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  } else {
    if (fx.value === 0) moveLeft()
    else if (fx.value === 1) moveRight()
    else if (fx.value === 2) moveTop()
    else moveBottom()
  }
}

const initGame = () => {
  gameFrame()
  initSnake()
  initFood()
  startInterval('right')
}

// 组件卸载时清理定时器
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})

</script>

<style scoped>
.game-area {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.game-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-btn {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 20px;
}

.back-btn:hover {
  background: #45a049;
}

.game-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.game-div {
  display: flex;
  gap: 20px;
}

.game-min {
  border: 2px solid #333;
  background: #fff;
}

.row {
  display: flex;
}

.element {
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
}

.right-div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.score-item {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.ztks {
  background: #4CAF50;
  color: white;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
}

.control {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.lr {
  display: flex;
  gap: 20px;
}

.control p {
  background: #4CAF50;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0;
}

.control p:hover {
  background: #45a049;
}
</style>