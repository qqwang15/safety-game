/* ========================================
   主入口文件 (main.js)
   负责初始化、页面路由、全局事件
   ======================================== */

/**
 * 页面路由/导航
 * @param {string} page - 目标页面: 'home' | 'scenes' | 'game' | 'result'
 */
function navigateTo(page) {
  // 隐藏所有页面
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));
  
  // 显示目标页面
  const targetPage = document.getElementById(`page-${page}`);
  if (targetPage) {
    targetPage.classList.add('active');
  }
  
  // 页面特定初始化
  switch(page) {
    case 'home':
      console.log('返回首页');
      break;
      
    case 'scenes':
      UI.renderThemesPage();
      console.log('进入关卡选择');
      break;
      
    case 'game':
      // 游戏页面由 game.start() 处理
      console.log('进入游戏');
      break;
      
    case 'result':
      // 结算页由 game.endGame() 处理
      console.log('显示结果');
      break;
  }
  
  // 滚动到顶部
  window.scrollTo(0, 0);
}

/**
 * 开始游戏（从关卡选择页调用）
 * @param {string} themeId - 主题ID
 * @param {number} levelNum - 关卡编号
 */
function startGame(themeId, levelNum) {
  navigateTo('game');
  
  // 延迟一帧确保DOM已切换
  requestAnimationFrame(() => {
    game.start(themeId, levelNum);
  });
}

/**
 * 应用程序初始化
 */
function initApp() {
  console.log('🎮 东航安全找茬王 - 初始化中...');
  
  // 初始化进度数据（如果不存在）
  const progress = Utils.getProgress();
  console.log('游戏进度已加载:', progress);
  
  // 显示首页
  navigateTo('home');
  
  // 绑定键盘事件
  document.addEventListener('keydown', handleGlobalKeydown);
  
  // 监听窗口大小变化（重新计算隐患点坐标）
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (game.state.gameStatus === 'playing') {
        // 可以在这里添加重新计算坐标的逻辑
        console.log('窗口大小变化');
      }
    }, 250);
  });
  
  // 页面可见性变化处理
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && game.state.gameStatus === 'playing' && !game.state.isPaused) {
      // 页面隐藏时自动暂停（可选）
      // game.togglePause();
    }
  });
  
  console.log('✅ 初始化完成！');
}

/**
 * 全局键盘事件处理
 * @param {KeyboardEvent} event - 键盘事件
 */
function handleGlobalKeydown(event) {
  // ESC键
  if (event.key === 'Escape') {
    if (!document.getElementById('rulesModal').classList.contains('hidden')) {
      UI.hideRules();
    } else if (game.state.gameStatus === 'playing') {
      game.togglePause();
    }
  }
  
  // 空格键（游戏中暂停/继续）
  if (event.key === ' ' && game.state.gameStatus === 'playing') {
    event.preventDefault();
    game.togglePause();
  }
}

// DOM加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
