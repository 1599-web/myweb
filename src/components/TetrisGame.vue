<template>
    <div class="tetris-container">
      <div class="game-header">
        <h2>俄罗斯方块</h2>
        <button @click="toggleGame">{{ running ? '暂停' : '开始' }}</button>
      </div>
      <div class="game-area">
        <div class="board">
          <div
            v-for="(row, y) in board"
            :key="y"
            class="row"
          >
            <div
              v-for="(cell, x) in row"
              :key="x"
              class="cell"
              :style="{ background: cell ? colors[cell] : '#eee' }"
            ></div>
          </div>
        </div>
        <div class="info">
          <p>得分: {{ score }}</p>
          <p>等级: {{ level }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
//   import moveSound from '@/assets/move.wav'
//   import rotateSound from '@/assets/rotate.wav'
//   import clearSound from '@/assets/clear.wav'
//   import gameoverSound from '@/assets/gameover.wav'
  
  const width = 10
  const height = 20
  const board = ref([])
  const running = ref(false)
  const timer = ref(null)
  const current = ref(null)
  const pos = ref({ x: 3, y: 0 })
  const score = ref(0)
  const level = ref(1)
  
  const colors = [null, '#f66', '#6f6', '#66f', '#ff6', '#6ff', '#f6f']
  
  const tetrominos = [
    [[1, 1, 1, 1]],
    [[2, 2], [2, 2]],
    [[0, 3, 0], [3, 3, 3]],
    [[4, 4, 0], [0, 4, 4]],
    [[0, 5, 5], [5, 5, 0]],
    [[6, 6, 6], [6, 0, 0]],
    [[7, 7, 7], [0, 0, 7]]
  ]
  
  const playSound = (sound) => {
    const audio = new Audio(sound)
    audio.play()
  }
  
  const generateBoard = () => {
    board.value = Array.from({ length: height }, () => Array(width).fill(0))
  }
  
  const spawn = () => {
    current.value = tetrominos[Math.floor(Math.random() * tetrominos.length)]
    pos.value = { x: 3, y: 0 }
    if (collides(current.value, pos.value)) {
      running.value = false
      clearInterval(timer.value)
      playSound(gameoverSound)
      alert('游戏结束！')
    }
  }
  
  const merge = () => {
    current.value.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          board.value[pos.value.y + y][pos.value.x + x] = value
        }
      })
    })
  }
  
  const collides = (shape, offset) => {
    return shape.some((row, y) => {
      return row.some((value, x) => {
        if (!value) return false
        const ny = offset.y + y
        const nx = offset.x + x
        return (
          ny >= height ||
          nx < 0 ||
          nx >= width ||
          (ny >= 0 && board.value[ny][nx])
        )
      })
    })
  }
  
  const rotate = () => {
    const rotated = current.value[0].map((_, i) => current.value.map(row => row[i]).reverse())
    if (!collides(rotated, pos.value)) {
      current.value = rotated
      playSound(rotateSound)
    }
  }
  
  const move = (dx, dy) => {
    const newPos = { x: pos.value.x + dx, y: pos.value.y + dy }
    if (!collides(current.value, newPos)) {
      pos.value = newPos
      playSound(moveSound)
      return true
    }
    return false
  }
  
  const drop = () => {
    if (!move(0, 1)) {
      merge()
      clearLines()
      spawn()
    }
  }
  
  const clearLines = () => {
    const newBoard = board.value.filter(row => row.some(cell => !cell))
    const linesCleared = height - newBoard.length
    if (linesCleared) {
      for (let i = 0; i < linesCleared; i++) {
        newBoard.unshift(Array(width).fill(0))
      }
      board.value = newBoard
      score.value += linesCleared * 100
      playSound(clearSound)
    }
  }
  
  const gameLoop = () => {
    drop()
  }
  
  const toggleGame = () => {
    if (running.value) {
      clearInterval(timer.value)
      running.value = false
    } else {
      generateBoard()
      spawn()
      timer.value = setInterval(gameLoop, 500)
      running.value = true
    }
  }
  
  const handleKey = (e) => {
    if (!running.value) return
    switch (e.code) {
      case 'ArrowLeft':
        move(-1, 0)
        break
      case 'ArrowRight':
        move(1, 0)
        break
      case 'ArrowDown':
        move(0, 1)
        break
      case 'ArrowUp':
        rotate()
        break
      case 'Space':
        toggleGame()
        break
    }
  }
  
  onMounted(() => {
    window.addEventListener('keydown', handleKey)
  })
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKey)
    if (timer.value) clearInterval(timer.value)
  })
  </script>
  
  <style scoped>
  .tetris-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    font-family: 'Segoe UI', sans-serif;
  }
  
  .game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  button {
    padding: 8px 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .game-area {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
  
  .board {
    display: flex;
    flex-direction: column;
    border: 2px solid #333;
  }
  
  .row {
    display: flex;
  }
  
  .cell {
    width: 24px;
    height: 24px;
    border: 1px solid #ccc;
  }
  
  .info {
    text-align: left;
    background: #f9f9f9;
    padding: 10px;
    border-radius: 6px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
  </style>