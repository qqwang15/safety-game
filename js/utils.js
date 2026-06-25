/* ========================================
   工具函数模块 (utils.js)
   提供通用的辅助功能
   ======================================== */

const Utils = {
  /**
   * localStorage 操作封装
   */
  storage: {
    get(key, defaultValue = null) {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
      } catch (e) {
        console.error('读取存储失败:', e);
        return defaultValue;
      }
    },
    
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.error('写入存储失败:', e);
        return false;
      }
    },
    
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error('删除存储失败:', e);
        return false;
      }
    }
  },

  /**
   * 坐标转换：百分比坐标 -> 实际像素坐标
   * @param {Object} position - 百分比坐标 {xPercent, yPercent, radiusPercent}
   * @param {number} imageWidth - 图片实际宽度
   * @param {number} imageHeight - 图片实际高度
   * @returns {Object} 实际像素坐标 {x, y, radius}
   */
  getActualPosition(position, imageWidth, imageHeight) {
    return {
      x: (position.xPercent / 100) * imageWidth,
      y: (position.yPercent / 100) * imageHeight,
      radius: (position.radiusPercent / 100) * Math.min(imageWidth, imageHeight)
    };
  },

  /**
   * 计算两点之间的距离
   * @param {number} x1 - 点1的x坐标
   * @param {number} y1 - 点1的y坐标
   * @param {number} x2 - 点2的x坐标
   * @param {number} y2 - 点2的y坐标
   * @returns {number} 距离
   */
  getDistance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  },

  /**
   * 判定点击是否命中隐患点
   * @param {number} clickX - 点击x坐标
   * @param {number} clickY - 点击y坐标
   * @param {Object} hazard - 隐患点对象（包含实际坐标）
   * @returns {boolean} 是否命中
   */
  checkHit(clickX, clickY, hazard) {
    const distance = this.getDistance(clickX, clickY, hazard.actualX, hazard.actualY);
    return distance <= hazard.actualRadius;
  },

  /**
   * 格式化时间显示
   * @param {number} seconds - 秒数
   * @returns {string} 格式化的时间字符串
   */
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    if (mins > 0) {
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    return secs.toString();
  },

  /**
   * 计算星级（基于正确率）
   * @param {number} foundCount - 找到的数量
   * @param {number} totalCount - 总数量
   * @returns {number} 星级 (1-5)
   */
  calculateStars(foundCount, totalCount) {
    if (totalCount === 0) return 1;
    const accuracy = foundCount / totalCount;
    
    if (accuracy >= 1.0) return 5;
    if (accuracy >= 0.9) return 4;
    if (accuracy >= 0.75) return 3;
    if (accuracy >= 0.6) return 2;
    return 1;
  },

  /**
   * 获取评级称谓（基于正确率）
   * @param {number} foundCount - 找到的数量
   * @param {number} totalCount - 总数量
   * @returns {Object} {name, className}
   */
  getGrade(foundCount, totalCount) {
    if (totalCount === 0) return { name: '安全新人', className: 'newbie' };
    
    const accuracy = foundCount / totalCount;
    
    if (accuracy >= 1.0) return { name: '安全大师', className: 'master' };
    if (accuracy >= 0.9) return { name: '安全卫士', className: 'guardian' };
    if (accuracy >= 0.75) return { name: '安全专家', className: 'expert' };
    if (accuracy >= 0.6) return { name: '安全员', className: 'agent' };
    return { name: '安全新人', className: 'newbie' };
  },

  /**
   * 生成唯一ID
   * @returns {string} 唯一ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  /**
   * 防抖函数
   * @param {Function} func - 要执行的函数
   * @param {number} wait - 等待时间(ms)
   * @returns {Function} 防抖后的函数
   */
  debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * 节流函数
   * @param {Function} func - 要执行的函数
   * @param {number} limit - 时间限制(ms)
   * @returns {Function} 节流后的函数
   */
  throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * 深拷贝对象
   * @param {*} obj - 要拷贝的对象
   * @returns {*} 拷贝后的对象
   */
  deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.deepClone(item));
    }
    
    const cloned = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = this.deepClone(obj[key]);
      }
    }
    return cloned;
  },

  /**
   * 播放音效（可选）
   * @param {string} type - 音效类型: 'correct' | 'wrong' | 'click'
   */
  playSound(type) {
    // 音效功能可选实现，避免浏览器自动播放策略限制
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      switch(type) {
        case 'correct':
          oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
          oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
          break;
        case 'wrong':
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.2);
          break;
        case 'click':
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.05);
          break;
      }
    } catch (e) {
      // 静默处理音频错误
    }
  },

  /**
   * 初始化默认的游戏进度数据
   * @returns {Object} 默认进度数据结构
   */
  getDefaultProgress() {
    return {
      info_sec: {
        themeName: '信息安全',
        levels: {
          '1': { unlocked: true, bestScore: 0, stars: 0, passed: false, date: null },
          '2': { unlocked: false, bestScore: 0, stars: 0, passed: false, date: null },
          '3': { unlocked: false, bestScore: 0, stars: 0, passed: false, date: null },
          '4': { unlocked: false, bestScore: 0, stars: 0, passed: false, date: null },
          '5': { unlocked: false, bestScore: 0, stars: 0, passed: false, date: null }
        }
      },
      ground_sec: {
        themeName: '地面安全',
        levels: {
          '1': { unlocked: true, bestScore: 0, stars: 0, passed: false, date: null },
          '2': { unlocked: false, bestScore: 0, stars: 0, passed: false, date: null },
          '3': { unlocked: false, bestScore: 0, stars: 0, passed: false, date: null },
          '4': { unlocked: false, bestScore: 0, stars: 0, passed: false, date: null },
          '5': { unlocked: false, bestScore: 0, stars: 0, passed: false, date: null }
        }
      },
      aviation_sec: {
        themeName: '航空安全',
        levels: {
          '1': { unlocked: false, bestScore: 0, stars: 0, passed: false, date: null },
          '2': { unlocked: false, bestScore: 0, stars: 0, passed: false, date: null },
          '3': { unlocked: false, bestScore: 0, stars: 0, passed: false, date: null },
          '4': { unlocked: false, bestScore: 0, stars: 0, passed: false, date: null },
          '5': { unlocked: false, bestScore: 0, stars: 0, passed: false, date: null }
        }
      }
    };
  },

  /**
   * 获取或初始化游戏进度
   * @returns {Object} 当前进度数据
   */
  getProgress() {
    let progress = this.storage.get('safetyGame_levelProgress');
    const defaults = this.getDefaultProgress();

    if (!progress) {
      progress = defaults;
    } else {
      // 合并：确保新增的主题（如航空安全）不会因旧数据缺失而报错
      Object.keys(defaults).forEach(themeId => {
        if (!progress[themeId]) {
          progress[themeId] = defaults[themeId];
        }
      });
    }

    this.storage.set('safetyGame_levelProgress', progress);

    // 强制只开放每个主题的第1关（仅信息安全、地面安全），其余锁定
    Object.keys(progress).forEach(themeId => {
      // 航空安全全部锁定
      const forceLockAll = (themeId === 'aviation_sec');
      Object.keys(progress[themeId].levels).forEach(levelNum => {
        if (forceLockAll || levelNum !== '1') {
          progress[themeId].levels[levelNum].unlocked = false;
        }
      });
    });

    return progress;
  },

  /**
   * 更新关卡进度
   * @param {string} themeId - 主题ID
   * @param {number} levelNum - 关卡编号
   * @param {Object} data - 更新数据 {score, stars, passed}
   */
  updateLevelProgress(themeId, levelNum, data) {
    const progress = this.getProgress();
    
    if (progress[themeId] && progress[themeId].levels[levelNum]) {
      const levelData = progress[themeId].levels[levelNum];
      
      // 更新最佳成绩
      if (data.score > levelData.bestScore) {
        levelData.bestScore = data.score;
      }
      
      // 更新星级（取最高）
      if (data.stars > levelData.stars) {
        levelData.stars = data.stars;
      }
      
      // 更新通关状态（不自动解锁下一关，保持"敬请期待"）
      if (data.passed && !levelData.passed) {
        levelData.passed = true;
        levelData.date = new Date().toISOString().split('T')[0];
      }
      
      this.storage.set('safetyGame_levelProgress', progress);
    }
    
    return progress;
  }
};
