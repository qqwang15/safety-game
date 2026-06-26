/* ========================================
   游戏核心逻辑 (game.js)
   处理游戏状态、计时、判定等核心功能
   ======================================== */

class Game {
  constructor() {
    // 游戏状态
    this.state = {
      currentTheme: null,       // 当前主题ID
      currentLevel: null,       // 当前关卡编号(1-5)
      score: 0,                 // 当前得分
      foundHazards: [],         // 已找到的隐患ID列表
      wrongClicks: 0,           // 错误点击次数
      remainingTime: 0,         // 剩余时间（秒）
      hintsUsed: 0,             // 已使用提示次数
      hintsRemaining: 3,        // 剩余提示次数
      isPaused: false,          // 是否暂停
      gameStatus: 'idle',       // idle | playing | paused | ended
      startTime: null,          // 开始时间戳
      animationFrameId: null    // requestAnimationFrame ID
    };
    
    // 当前关卡的隐患数据（带实际坐标）
    this.hazardsWithPosition = [];
    
    // 绑定this上下文
    this.gameLoop = this.gameLoop.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
  }

  /**
   * 开始新游戏
   * @param {string} themeId - 主题ID
   * @param {number} levelNum - 关卡编号
   */
  start(themeId, levelNum) {
    const theme = GAME_CONFIG.themes[themeId];
    if (!theme) {
      console.error('主题不存在:', themeId);
      return;
    }
    
    const level = theme.levels[levelNum];
    if (!level) {
      console.error('关卡不存在:', levelNum);
      return;
    }
    
    // 初始化状态
    this.state.currentTheme = themeId;
    this.state.currentLevel = levelNum;
    this.state.score = 0;
    this.state.foundHazards = [];
    this.state.wrongClicks = 0;
    this.state.remainingTime = level.timeLimit;
    this.state.hintsUsed = 0;
    this.state.hintsRemaining = level.hintCount;
    this.state.isPaused = false;
    this.state.gameStatus = 'playing';
    this.state.startTime = null;
    
    // 重置UI
    UI.resetGameUI();
    
    // 显示加载动画
    const loadingEl = document.getElementById('levelLoading');
    loadingEl.classList.add('active');
    
    // 加载图片并设置隐患点坐标
    this.loadLevelImage(level);
    
    // 更新UI显示
    document.getElementById('totalDisplay').textContent = level.hazards.length;
    UI.updateHintButton(level.hintCount);
    
    // 绑定点击事件
    const gameImage = document.getElementById('gameImage');
    gameImage.onclick = this.handleImageClick;
    
    console.log(`开始游戏: ${theme.name} - 第${levelNum}关`);
  }

  /**
   * 加载关卡图片并计算隐患点实际坐标
   * @param {Object} level - 关卡配置对象
   */
  loadLevelImage(level) {
    const gameImage = document.getElementById('gameImage');
    const loadingEl = document.getElementById('levelLoading');
    
    // 使用占位图（后续替换为真实AI生成图片）
    gameImage.src = level.image || this.generatePlaceholderImage(level);
    
    gameImage.onload = () => {
      // 隐藏加载动画
      loadingEl.classList.remove('active');
      
      // 图片加载完成后计算所有隐患点的实际像素坐标
      this.calculateHazardPositions(level.hazards, gameImage.naturalWidth, gameImage.naturalHeight);
      
      // 启动游戏循环
      this.startGameLoop();
      
      console.log('图片加载完成，隐患点坐标已计算');
    };
    
    gameImage.onerror = () => {
      // 隐藏加载动画
      loadingEl.classList.remove('active');
      console.error('图片加载失败:', level.image);
      // 使用纯色背景作为后备
      this.createFallbackBackground(gameImage, level);
      this.calculateHazardPositions(level.hazards, 800, 600);
      this.startGameLoop();
    };
  }

  /**
   * 生成占位图片URL（使用在线占位图服务或data URI）
   * @param {Object} level - 关卡对象
   * @returns {string} 图片URL
   */
  generatePlaceholderImage(level) {
    // 使用canvas生成带文字说明的占位图
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // 背景渐变
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#1E293B');
    gradient.addColorStop(1, '#334155');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);
    
    // 主题色边框
    ctx.strokeStyle = GAME_CONFIG.themes[this.state.currentTheme]?.color || '#FF6B35';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 760, 560);
    
    // 标题文字
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${GAME_CONFIG.themes[this.state.currentTheme]?.name || ''}`, 400, 200);
    
    ctx.font = '28px Arial, sans-serif';
    ctx.fillText(`第${this.state.currentLevel}关：${level.name}`, 400, 260);
    
    ctx.font = '18px Arial, sans-serif';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(`请找出 ${level.hazards.length} 个安全隐患点`, 400, 320);
    
    ctx.font = '16px Arial, sans-serif';
    ctx.fillText('(点击图中你认为有隐患的位置)', 400, 360);
    
    // 提示信息
    ctx.fillStyle = '#F59E0B';
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText('⚠️ 此为演示占位图，请替换为AI生成的真实场景图片', 400, 500);
    
    return canvas.toDataURL('image/jpeg', 0.8);
  }

  /**
   * 创建后备背景（当图片加载失败时）
   * @param {HTMLImageElement} imgElement - 图片元素
   * @param {Object} level - 关卡对象
   */
  createFallbackBackground(imgElement, level) {
    const placeholder = this.generatePlaceholderImage(level);
    imgElement.src = placeholder;
  }

  /**
   * 计算隐患点实际像素坐标
   * @param {Array} hazards - 隐患点数组
   * @param {number} imageWidth - 图片宽度
   * @param {number} imageHeight - 图片高度
   */
  calculateHazardPositions(hazards, imageWidth, imageHeight) {
    this.hazardsWithPosition = hazards.map(hazard => ({
      ...hazard,
      actualX: Utils.getActualPosition(hazard.position, imageWidth, imageHeight).x,
      actualY: Utils.getActualPosition(hazard.position, imageWidth, imageHeight).y,
      actualRadius: Utils.getActualPosition(hazard.position, imageWidth, imageHeight).radius
    }));
  }

  /**
   * 启动游戏循环（计时器）
   */
  startGameLoop() {
    if (this.state.animationFrameId) {
      cancelAnimationFrame(this.state.animationFrameId);
    }
    
    this.state.startTime = performance.now();
    this.gameLoop(performance.now());
  }

  /**
   * 游戏主循环
   * @param {number} timestamp - 时间戳
   */
  gameLoop(timestamp) {
    if (this.state.gameStatus !== 'playing') {
      return;
    }
    
    if (this.state.isPaused) {
      // 暂停时不更新时间，但保持循环
      this.state.animationFrameId = requestAnimationFrame(this.gameLoop);
      return;
    }
    
    // 计算已用时间
    const elapsed = (timestamp - this.state.startTime) / 1000;
    const totalTime = GAME_CONFIG.themes[this.state.currentTheme]
                        .levels[this.state.currentLevel].timeLimit;
    
    this.state.remainingTime = Math.max(0, totalTime - elapsed);
    
    // 更新UI
    UI.updateTimer(this.state.remainingTime);
    
    // 检查是否时间到
    if (this.state.remainingTime <= 0) {
      this.endGame(false); // 时间到，未全部找到
      return;
    }
    
    // 继续循环
    this.state.animationFrameId = requestAnimationFrame(this.gameLoop);
  }

  /**
   * 处理图片点击事件（使用浏览器实际布局位置，避免手动计算偏移）
   * @param {MouseEvent} event - 点击事件
   */
  handleImageClick(event) {
    if (this.state.gameStatus !== 'playing' || this.state.isPaused) {
      return;
    }

    const gameImage = document.getElementById('gameImage');
    const wrapper = document.getElementById('gameImageWrapper');

    // 点击波纹效果
    const wrapperRect = wrapper.getBoundingClientRect();
    const rippleX = event.clientX - wrapperRect.left;
    const rippleY = event.clientY - wrapperRect.top;
    const size = Math.max(wrapperRect.width, wrapperRect.height) * 0.3;
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${rippleX - size / 2}px`;
    ripple.style.top = `${rippleY - size / 2}px`;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    wrapper.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);

    // 图片在页面中的实际渲染位置（浏览器已处理了 object-fit 和居中）
    const imgRect = gameImage.getBoundingClientRect();

    // 点击位置相对于图片实际显示区域
    const clickX = event.clientX - imgRect.left;
    const clickY = event.clientY - imgRect.top;
    
    // 检查是否点在实际图片区域内
    if (clickX < 0 || clickX > imgRect.width || clickY < 0 || clickY > imgRect.height) {
      // 点在留白区域，算作错误点击（坐标相对于wrapper）
      const displayX = event.clientX - wrapperRect.left;
      const displayY = event.clientY - wrapperRect.top;
      this.onWrongClick(displayX, displayY);
      return;
    }
    
    // 转换为图片原始尺寸的坐标（用于匹配隐患点百分比坐标）
    const scaleX = gameImage.naturalWidth / imgRect.width;
    const scaleY = gameImage.naturalHeight / imgRect.height;
    const naturalClickX = clickX * scaleX;
    const naturalClickY = clickY * scaleY;
    
    // 显示标记的坐标：相对于 wrapper，但加上图片在 wrapper 内的偏移
    const displayX = event.clientX - wrapperRect.left;
    const displayY = event.clientY - wrapperRect.top;
    
    // 检查是否命中任何隐患点
    let hitHazard = null;
    
    for (const hazard of this.hazardsWithPosition) {
      if (!this.state.foundHazards.includes(hazard.id)) {
        if (Utils.checkHit(naturalClickX, naturalClickY, hazard)) {
          hitHazard = hazard;
          break;
        }
      }
    }
    
    if (hitHazard) {
      // 命中！
      this.onHazardFound(hitHazard, displayX, displayY);
    } else {
      // 未命中
      this.onWrongClick(displayX, displayY);
    }
  }

  /**
   * 处理找到隐患
   * @param {Object} hazard - 隐患点对象
   * @param {number} x - 显示x坐标
   * @param {number} y - 显示y坐标
   */
  onHazardFound(hazard, x, y) {
    // 记录已找到
    this.state.foundHazards.push(hazard.id);
    
    // 加分
    this.state.score += GAME_CONFIG.rules.scorePerFound;
    
    // 播放音效和动画
    Utils.playSound('correct');
    UI.showMarker(x, y, 'correct');
    UI.showScoreFloat(x, y, GAME_CONFIG.rules.scorePerFound);
    
    // 更新UI
    UI.updateProgress(this.state.foundHazards.length, this.hazardsWithPosition.length);
    UI.updateScore(this.state.score);
    
    console.log(`找到隐患: ${hazard.name}`);
    
    // 检查是否全部找到
    if (this.state.foundHazards.length >= this.hazardsWithPosition.length) {
      // 全部找到！延迟一点结束以显示最后一个标记
      setTimeout(() => {
        this.endGame(true); // 全部找到
      }, 500);
    }
  }

  /**
   * 处理错误点击
   * @param {number} x - 显示x坐标
   * @param {number} y - 显示y坐标
   */
  onWrongClick(x, y) {
    // 记录错误（不扣分，不显示扣分飘字）
    this.state.wrongClicks++;

    // 播放音效和动画（不显示分数）
    Utils.playSound('wrong');
    UI.showMarker(x, y, 'wrong');
    UI.shakeScreen();
  }

  /**
   * 使用提示（修复坐标偏移）
   */
  useHint() {
    if (this.state.gameStatus !== 'playing' || 
        this.state.isPaused || 
        this.state.hintsRemaining <= 0) {
      return;
    }
    
    // 找到一个未发现的隐患点
    const unfoundHazards = this.hazardsWithPosition.filter(
      h => !this.state.foundHazards.includes(h.id)
    );
    
    if (unfoundHazards.length === 0) {
      UI.showToast('所有隐患都已找到！', 'success');
      return;
    }
    
    // 随机选择一个未找到的隐患
    const randomHazard = unfoundHazards[Math.floor(Math.random() * unfoundHazards.length)];
    
    // 计算显示坐标（使用浏览器实际布局位置）
    const gameImage = document.getElementById('gameImage');
    const wrapper = document.getElementById('gameImageWrapper');
    const imgRect = gameImage.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    
    // 图片在wrapper内的偏移
    const imgOffsetX = imgRect.left - wrapperRect.left;
    const imgOffsetY = imgRect.top - wrapperRect.top;
    
    // 隐患点自然坐标 -> 图片显示坐标 -> wrapper坐标
    const scaleX = imgRect.width / gameImage.naturalWidth;
    const scaleY = imgRect.height / gameImage.naturalHeight;
    
    const displayX = randomHazard.actualX * scaleX + imgOffsetX;
    const displayY = randomHazard.actualY * scaleY + imgOffsetY;
    
    // 显示提示标记
    UI.showMarker(displayX, displayY, 'hint');
    
    // 更新提示次数
    this.state.hintsUsed++;
    this.state.hintsRemaining--;
    UI.updateHintButton(this.state.hintsRemaining);
    
    // 提示扣分（少量）
    this.state.score = Math.max(0, this.state.score - 30);
    UI.updateScore(this.state.score);
    
    Utils.playSound('click');
    console.log('使用提示');
  }

  /**
   * 切换暂停状态
   */
  togglePause() {
    if (this.state.gameStatus !== 'playing') {
      return;
    }
    
    this.state.isPaused = !this.state.isPaused;
    
    if (this.state.isPaused) {
      UI.showPauseOverlay();
      console.log('游戏暂停');
    } else {
      UI.hidePauseOverlay();
      // 重新计算startTime以补偿暂停时间
      const totalTime = GAME_CONFIG.themes[this.state.currentTheme]
                          .levels[this.state.currentLevel].timeLimit;
      this.state.startTime = performance.now() - (totalTime - this.state.remainingTime) * 1000;
      console.log('游戏继续');
    }
  }

  /**
   * 退出当前游戏
   */
  quitGame() {
    this.stopGameLoop();
    this.state.gameStatus = 'ended';
    UI.hidePauseOverlay();
    navigateTo('scenes');
  }

  /**
   * 结束游戏
   * @param {boolean} allFound - 是否找到了所有隐患
   */
  endGame(allFound = false) {
    // 停止游戏循环
    this.stopGameLoop();
    
    this.state.gameStatus = 'ended';
    
    // 解绑点击事件
    const gameImage = document.getElementById('gameImage');
    gameImage.onclick = null;
    
    // 计算用时
    const totalTime = GAME_CONFIG.themes[this.state.currentTheme]
                        .levels[this.state.currentLevel].timeLimit;
    const timeUsed = Math.round(totalTime - this.state.remainingTime);
    
    // 计算正确率
    const totalHazards = this.hazardsWithPosition.length;
    const foundCount = this.state.foundHazards.length;
    const accuracy = foundCount / totalHazards;
    
    // 判断是否通关
    const passed = accuracy >= GAME_CONFIG.rules.passThreshold;
    
    // 时间奖励（如果提前完成）
    if (allFound && this.state.remainingTime > 0) {
      const timeBonus = Math.round(this.state.remainingTime * GAME_CONFIG.rules.timeBonusPerSecond);
      this.state.score += timeBonus;
      console.log(`时间奖励: +${timeBonus}分`);
    }
    
    // 准备结果数据
    const resultData = {
      score: this.state.score,
      foundCount: foundCount,
      totalCount: totalHazards,
      timeUsed: timeUsed,
      accuracy: accuracy,
      passed: passed,
      allFound: allFound,
      hazards: this.hazardsWithPosition
    };
    
    console.log('游戏结束:', resultData);
    
    // 如果通关，更新进度
    if (passed) {
      const stars = Utils.calculateStars(foundCount, totalHazards);
      Utils.updateLevelProgress(
        this.state.currentTheme, 
        this.state.currentLevel, 
        {
          score: this.state.score,
          stars: stars,
          passed: true
        }
      );
      UI.showToast('🎉 通关成功！', 'success');
    } else {
      UI.showToast('未达到通关标准，继续努力！', 'warning');
    }
    
    // 渲染结算页面
    UI.renderResultPage(resultData);
    
    // 切换到结算页
    setTimeout(() => {
      navigateTo('result');
    }, 1000);
  }

  /**
   * 停止游戏循环
   */
  stopGameLoop() {
    if (this.state.animationFrameId) {
      cancelAnimationFrame(this.state.animationFrameId);
      this.state.animationFrameId = null;
    }
  }

  /**
   * 重玩当前关卡
   */
  retryLevel() {
    if (this.state.currentTheme && this.state.currentLevel) {
      startGame(this.state.currentTheme, this.state.currentLevel);
      navigateTo('game');
    }
  }

  /**
   * 进入下一关
   */
  nextLevel() {
    const nextLevel = this.state.currentLevel + 1;
    const maxLevel = 5;
    
    if (nextLevel <= maxLevel) {
      // 检查是否解锁
      const progress = Utils.getProgress();
      const nextLevelData = progress[this.state.currentTheme]?.levels[nextLevel.toString()];
      
      if (nextLevelData && nextLevelData.unlocked) {
        startGame(this.state.currentTheme, nextLevel);
        navigateTo('game');
      } else {
        UI.showToast('下一关尚未解锁', 'warning');
      }
    } else {
      UI.showToast('🎊 恭喜！你已完成该主题所有关卡！', 'success');
    }
  }
}

// 创建全局游戏实例
const game = new Game();

// 全局函数（供HTML调用）
function useHint() {
  game.useHint();
}

function togglePause() {
  game.togglePause();
}

function quitGame() {
  game.quitGame();
}

function retryLevel() {
  game.retryLevel();
}

function nextLevel() {
  game.nextLevel();
}
