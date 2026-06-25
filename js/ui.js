/* ========================================
   UI 组件模块 (ui.js)
   处理界面交互和动画效果
   ======================================== */

const UI = {
  /**
   * 显示规则弹窗
   */
  showRules() {
    const modal = document.getElementById('rulesModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  },

  /**
   * 隐藏规则弹窗
   */
  hideRules() {
    const modal = document.getElementById('rulesModal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  },

  /**
   * 在游戏图片上显示标记
   * @param {number} x - x坐标（相对于图片）
   * @param {number} y - y坐标（相对于图片）
   * @param {string} type - 标记类型: 'correct' | 'wrong' | 'hint'
   */
  showMarker(x, y, type) {
    const markersLayer = document.getElementById('markersLayer');
    const marker = document.createElement('div');
    marker.className = `marker ${type}`;
    marker.style.left = `${x}px`;
    marker.style.top = `${y}px`;
    
    markersLayer.appendChild(marker);
    
    // 错误标记在动画结束后移除
    if (type === 'wrong') {
      setTimeout(() => {
        if (marker.parentNode) {
          marker.parentNode.removeChild(marker);
        }
      }, 500);
    }
    
    return marker;
  },

  /**
   * 显示分数飘字效果
   * @param {number} x - x坐标
   * @param {number} y - y坐标
   * @param {number} score - 分数（正或负）
   */
  showScoreFloat(x, y, score) {
    const scoreFloats = document.getElementById('scoreFloats');
    const floatEl = document.createElement('div');
    floatEl.className = `score-float ${score > 0 ? 'positive' : 'negative'}`;
    floatEl.textContent = score > 0 ? `+${score}` : `${score}`;
    floatEl.style.left = `${x}px`;
    floatEl.style.top = `${y}px`;
    
    scoreFloats.appendChild(floatEl);
    
    // 动画结束后移除
    setTimeout(() => {
      if (floatEl.parentNode) {
        floatEl.parentNode.removeChild(floatEl);
      }
    }, 1000);
  },

  /**
   * 屏幕抖动效果
   */
  shakeScreen() {
    const wrapper = document.getElementById('gameImageWrapper');
    wrapper.classList.add('shake');
    setTimeout(() => {
      wrapper.classList.remove('shake');
    }, 400);
  },

  /**
   * 更新计时器显示
   * @param {number} seconds - 剩余秒数
   */
  updateTimer(seconds) {
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.textContent = Math.ceil(seconds);
    
    // 时间不足10秒时变红闪烁
    if (seconds <= 10) {
      timerDisplay.style.color = '#EF4444';
      timerDisplay.style.animation = 'pulse 0.5s infinite';
    } else if (seconds <= 20) {
      timerDisplay.style.color = '#F59E0B';
      timerDisplay.style.animation = 'none';
    } else {
      timerDisplay.style.color = '#FF6B35';
      timerDisplay.style.animation = 'none';
    }
  },

  /**
   * 更新进度显示
   * @param {number} found - 已找到数量
   * @param {number} total - 总数量
   */
  updateProgress(found, total) {
    document.getElementById('foundDisplay').textContent = found;
    document.getElementById('totalDisplay').textContent = total;
  },

  /**
   * 更新分数显示
   * @param {number} score - 当前分数
   */
  updateScore(score) {
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.textContent = Math.max(0, score);
    
    // 分数变化时添加小动画
    scoreDisplay.style.transform = 'scale(1.2)';
    setTimeout(() => {
      scoreDisplay.style.transform = 'scale(1)';
    }, 150);
  },

  /**
   * 更新提示按钮状态
   * @param {number} remaining - 剩余提示次数
   */
  updateHintButton(remaining) {
    const hintBtn = document.getElementById('hintBtn');
    const hintsLeft = document.getElementById('hintsLeft');
    hintsLeft.textContent = remaining;
    
    if (remaining <= 0) {
      hintBtn.disabled = true;
      hintBtn.style.opacity = '0.4';
    } else {
      hintBtn.disabled = false;
      hintBtn.style.opacity = '1';
    }
  },

  /**
   * 渲染主题选择页面
   */
  renderThemesPage() {
    const themesGrid = document.getElementById('themesGrid');
    themesGrid.innerHTML = '';
    
    const progress = Utils.getProgress();
    
    Object.keys(GAME_CONFIG.themes).forEach(themeId => {
      const theme = GAME_CONFIG.themes[themeId];
      const themeProgress = progress[themeId];
      
      // 创建主题卡片
      const themeCard = document.createElement('div');
      themeCard.className = `theme-card ${themeId}-theme`;
      
      // 主题头部
      const header = document.createElement('div');
      header.className = 'theme-header';
      header.innerHTML = `
        <div class="theme-icon">${theme.icon}</div>
        <div class="theme-info">
          <h3>${theme.name}</h3>
          <p>${theme.description}</p>
        </div>
      `;
      
      // 关卡列表
      const levelsList = document.createElement('div');
      levelsList.className = 'levels-list';
      
      Object.keys(theme.levels).forEach(levelNum => {
        const level = theme.levels[levelNum];
        const levelData = themeProgress.levels[levelNum];
        
        const levelItem = document.createElement('div');
        levelItem.className = 'level-item';
        
        if (!levelData.unlocked) {
          levelItem.classList.add('locked');
          // 航空安全全部锁定显示"敬请期待"，其他主题第1关只显示锁头
          if (themeId === 'aviation_sec') {
            levelItem.innerHTML = `
              <span class="lock-icon">🔒</span>
              <span class="level-name">${level.name}</span>
              <span class="coming-soon">敬请期待</span>
            `;
          } else if (levelNum === '1') {
            levelItem.innerHTML = `
              <span class="lock-icon">🔒</span>
              <span class="level-name">第${levelNum}关</span>
            `;
          } else {
            levelItem.innerHTML = `
              <span class="lock-icon">🔒</span>
              <span class="level-name">${level.name}</span>
              <span class="coming-soon">敬请期待</span>
            `;
          }
        } else {
          // 检查是否是当前应玩的关卡（第一个未通过的）
          let isCurrent = false;
          if (levelData.passed) {
            // 如果已通过，检查下一关是否解锁且未通过
            const nextLevel = parseInt(levelNum) + 1;
            if (nextLevel <= 5 && !themeProgress.levels[nextLevel.toString()].passed) {
              // 不是当前关
            } else if (!themeProgress.levels[levelNum.toString()].passed && levelNum !== '1') {
              isCurrent = true;
            }
          } else if (levelNum === '1' || themeProgress.levels[(parseInt(levelNum) - 1).toString()].passed) {
            isCurrent = true;
          }
          
          if (isCurrent && !levelData.passed) {
            levelItem.classList.add('current');
          }
          
          // 生成星星显示
          let starsHtml = '<div class="level-stars">';
          for (let i = 1; i <= 5; i++) {
            starsHtml += `<span class="star ${i <= levelData.stars ? 'filled' : ''}">★</span>`;
          }
          starsHtml += '</div>';
          
          levelItem.innerHTML = `
            <span class="level-number">${levelNum}</span>
            <span class="level-name">${level.name}</span>
            ${starsHtml}
          `;
          
          // 绑定点击事件
          levelItem.onclick = () => startGame(themeId, parseInt(levelNum));
        }
        
        levelsList.appendChild(levelItem);
      });

      // 添加滑动提示（仅在内容溢出时显示）
      const hint = document.createElement('div');
      hint.className = 'swipe-hint';
      hint.textContent = '☜';
      levelsList.appendChild(hint);

      // 用户滑动后隐藏提示
      let hintDismissed = false;
      levelsList.addEventListener('scroll', () => {
        if (!hintDismissed && Math.abs(levelsList.scrollLeft) > 10) {
          hint.style.display = 'none';
          hintDismissed = true;
        }
      }, { once: true });
      
      themeCard.appendChild(header);
      themeCard.appendChild(levelsList);
      themesGrid.appendChild(themeCard);
    });
  },

  /**
   * 渲染结算页面
   * @param {Object} resultData - 结果数据
   */
  renderResultPage(resultData) {
    const { score, foundCount, totalCount, timeUsed, hazards, passed } = resultData;
    
    // 计算正确率
    const accuracy = foundCount / totalCount;
    const stars = Utils.calculateStars(foundCount, totalCount);
    const grade = Utils.getGrade(foundCount, totalCount);
    
    // 更新标题
    document.getElementById('resultTitle').textContent = 
      passed ? '🎉 通关成功！' : '💪 继续努力！';
    
    // 渲染星星
    const starsDisplay = document.getElementById('starsDisplay');
    starsDisplay.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.className = `star ${i <= stars ? 'filled' : ''}`;
      star.textContent = '★';
      starsDisplay.appendChild(star);
    }
    
    // 更新分数
    document.getElementById('finalScore').textContent = Math.max(0, score);
    
    // 更新统计
    document.getElementById('resultFound').textContent = `${foundCount}/${totalCount}`;
    document.getElementById('resultTime').textContent = timeUsed;
    document.getElementById('resultAccuracy').textContent = `${Math.round(accuracy * 100)}%`;
    
    // 更新评级徽章
    const gradeBadge = document.getElementById('gradeBadge');
    gradeBadge.textContent = grade.name;
    gradeBadge.className = `grade-badge ${grade.className}`;
    
    // 渲染科普卡片
    this.renderKnowledgeCards(hazards);
    
    // 控制按钮显示：只有通关且下一关已解锁时才显示"下一关"
    const progress = Utils.getProgress();
    const currentTheme = game.state.currentTheme;
    const currentLevel = game.state.currentLevel;
    const nextLevelNum = currentLevel + 1;
    const nextLevelData = progress[currentTheme]?.levels[nextLevelNum.toString()];
    const canGoNext = passed && nextLevelData && nextLevelData.unlocked;
    document.getElementById('nextLevelBtn').hidden = !canGoNext;
  },

  /**
   * 渲染科普卡片
   * @param {Array} hazards - 隐患点数组
   */
  renderKnowledgeCards(hazards) {
    const container = document.getElementById('knowledgeCards');
    
    if (!hazards || hazards.length === 0) {
      container.innerHTML = '<p style="color: var(--text-secondary);">暂无隐患数据</p>';
      return;
    }
    
    container.innerHTML = '<h4>📚 安全知识点</h4>';
    
    hazards.forEach((hazard, index) => {
      const card = document.createElement('div');
      card.className = 'knowledge-card';
      card.style.setProperty('--theme-color', hazard.riskLevel === 'critical' ? '#EF4444' : 
                                                     hazard.riskLevel === 'high' ? '#F97316' :
                                                     hazard.riskLevel === 'medium' ? '#F59E0B' : '#6B7280');
      card.style.animationDelay = `${index * 0.1}s`;
      
      card.innerHTML = `
        <h5>⚠️ ${hazard.name}</h5>
        <p><strong>✅ 正确做法：</strong>${hazard.correctAction}</p>
        <div class="tip">💡 ${hazard.tip}</div>
      `;
      
      container.appendChild(card);
    });
  },

  /**
   * 清除所有标记
   */
  clearMarkers() {
    const markersLayer = document.getElementById('markersLayer');
    markersLayer.innerHTML = '';
  },

  /**
   * 清除所有飘字
   */
  clearScoreFloats() {
    const scoreFloats = document.getElementById('scoreFloats');
    scoreFloats.innerHTML = '';
  },

  /**
   * 重置游戏UI到初始状态
   */
  resetGameUI() {
    this.clearMarkers();
    this.clearScoreFloats();
    this.updateTimer(70);
    this.updateProgress(0, 5);
    this.updateScore(0);
    this.updateHintButton(3);
    
    // 重置计时器样式
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.style.color = '#FF6B35';
    timerDisplay.style.animation = 'none';
  },

  /**
   * 显示暂停遮罩
   */
  showPauseOverlay() {
    document.getElementById('pauseOverlay').classList.remove('hidden');
  },

  /**
   * 隐藏暂停遮罩
   */
  hidePauseOverlay() {
    document.getElementById('pauseOverlay').classList.add('hidden');
  },

  /**
   * 显示 Toast 提示
   * @param {string} message - 提示信息
   * @param {string} type - 类型: 'success' | 'error' | 'warning' | 'info'
   */
  showToast(message, type = 'info') {
    // 移除已有的toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // 样式
    Object.assign(toast.style, {
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '12px 24px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '600',
      fontSize: '15px',
      zIndex: '9999',
      animation: 'fadeIn 0.3s ease-out',
      boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
    });
    
    // 根据类型设置背景色
    const colors = {
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
      info: '#3B82F6'
    };
    toast.style.background = colors[type] || colors.info;
    
    document.body.appendChild(toast);
    
    // 2秒后自动消失
    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s ease-out forwards';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  },

  /**
   * 确认对话框
   * @param {string} message - 确认信息
   * @returns {Promise<boolean>}
   */
  confirm(message) {
    return new Promise((resolve) => {
      const result = window.confirm(message);
      resolve(result);
    });
  }
};

// 全局函数：显示/隐藏规则（供HTML调用）
function showRules() {
  UI.showRules();
}

function hideRules() {
  UI.hideRules();
}

// 点击弹窗背景关闭
document.addEventListener('click', (e) => {
  const rulesModal = document.getElementById('rulesModal');
  if (e.target === rulesModal) {
    UI.hideRules();
  }
});

// ESC键关闭弹窗
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    UI.hideRules();
  }
});
