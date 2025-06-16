<template>
  <div class="games-container">
    <!-- 游戏选择区域 -->
    <div class="game-selection" v-if="!currentGame">
      <h2 class="section-title">游戏中心</h2>
      <div class="game-grid">
        <div class="game-card" v-for="game in games" :key="game.id" @click="selectGame(game)">
          <div class="game-icon" :style="{ background: game.gradient }">
            <i :class="game.icon"></i>
          </div>
          <div class="game-info">
            <h3>{{ game.name }}</h3>
            <p>{{ game.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 游戏区域 -->
    <SnakeGame v-if="currentGame === 'snake'" @back="currentGame = null" />
    <TetrisGame v-if="currentGame === 'tetris'" @back="currentGame = null" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SnakeGame from '@/components/SnakeGame.vue'
import TetrisGame from '@/components/TetrisGame.vue'

// 游戏选择相关
const currentGame = ref(null)
const games = ref([
  {
    id: 'snake',
    name: '贪吃蛇',
    description: '经典的贪吃蛇游戏，控制蛇吃食物成长',
    icon: 'fas fa-snake',
    gradient: 'linear-gradient(135deg, #FFA7EB 0%, #F026A8 100%)'
  },
  {
    id: 'tetris',
    name: '俄罗斯方块',
    description: '即将推出...',
    icon: 'fas fa-shapes',
    gradient: 'linear-gradient(135deg, #DFA1FF 0%, #9A36F0 100%)'
  },
  {
    id: 'puzzle',
    name: '拼图游戏',
    description: '即将推出...',
    icon: 'fas fa-puzzle-piece',
    gradient: 'linear-gradient(135deg, #9EAAFF 0%, #3846F4 100%)'
  }
])

const selectGame = (game) => {
  if (game.id === 'snake' || game.id === 'tetris') {
    currentGame.value = game.id
  }
}
</script>

<style scoped>
.games-container {
  min-height: 100vh;
  padding: 2rem;
  background: #f5f7fa;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.game-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.game-card:hover {
  transform: translateY(-5px);
}

.game-icon {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
}

.game-info {
  padding: 1.5rem;
}

.game-info h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.game-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}
</style>