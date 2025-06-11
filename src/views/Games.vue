<template>
  <div class="games-container">
    <div class="container">
      <h2 class="page-title">小游戏</h2>
      
      <div class="games-grid">
        <el-card
          v-for="game in games"
          :key="game.id"
          class="game-card"
          :body-style="{ padding: '0px' }"
        >
          <div class="game-image">
            <el-image
              :src="game.image"
              fit="cover"
              :preview-src-list="[game.image]"
            />
          </div>
          <div class="game-content">
            <h3 class="game-title">{{ game.title }}</h3>
            <p class="game-description">{{ game.description }}</p>
            <div class="game-meta">
              <span class="game-type">
                <el-icon><game-controller /></el-icon>
                {{ game.type }}
              </span>
              <span class="game-difficulty">
                <el-icon><star /></el-icon>
                难度: {{ game.difficulty }}
              </span>
            </div>
            <el-button
              type="primary"
              class="play-button"
              @click="startGame(game.id)"
            >
              开始游戏
            </el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { GameController, Star } from '@element-plus/icons-vue'

// 游戏数据（示例）
const games = ref([
  {
    id: 1,
    title: '2048',
    description: '经典的2048数字合并游戏，通过方向键移动方块，相同数字的方块相撞时会合并。',
    type: '益智',
    difficulty: '中等',
    image: 'https://via.placeholder.com/300x200?text=2048'
  },
  {
    id: 2,
    title: '贪吃蛇',
    description: '控制蛇吃食物并不断变长，注意不要撞到墙壁或自己的身体。',
    type: '休闲',
    difficulty: '简单',
    image: 'https://via.placeholder.com/300x200?text=Snake'
  },
  {
    id: 3,
    title: '俄罗斯方块',
    description: '经典的俄罗斯方块游戏，通过旋转和移动方块来消除行。',
    type: '益智',
    difficulty: '中等',
    image: 'https://via.placeholder.com/300x200?text=Tetris'
  }
])

// 开始游戏
const startGame = (gameId) => {
  // TODO: 实现游戏启动逻辑
  console.log('Starting game:', gameId)
}
</script>

<style scoped>
.games-container {
  padding: 40px 0;
}

.page-title {
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.game-card {
  transition: transform 0.3s ease;
}

.game-card:hover {
  transform: translateY(-5px);
}

.game-image {
  height: 200px;
  overflow: hidden;
}

.game-image :deep(.el-image) {
  width: 100%;
  height: 100%;
}

.game-content {
  padding: 20px;
}

.game-title {
  margin: 0 0 10px;
  font-size: 1.2em;
  color: #333;
}

.game-description {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.game-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #999;
  font-size: 0.9em;
}

.game-type,
.game-difficulty {
  display: flex;
  align-items: center;
  gap: 5px;
}

.play-button {
  width: 100%;
}

@media screen and (max-width: 768px) {
  .games-container {
    padding: 20px 0;
  }
  
  .games-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style> 