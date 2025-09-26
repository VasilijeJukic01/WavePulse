const customStorage = {
  getItem: (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    if (new Date().getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  },
  setItem: (key, value, ttl = 3600000) => {
    const now = new Date().getTime();
    const item = {
      value,
      expiry: now + ttl,
    };

    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        customStorage.clearExpiredItems();
        try {
          localStorage.setItem(key, JSON.stringify(item));
        } catch (e) { }
      } else {
        throw e;
      }
    }
  },
  removeItem: (key) => localStorage.removeItem(key),
  clear: () => {
    const keysToKeep = ['user.token', 'user.user'];
    Object.keys(localStorage).forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
  },
  clearExpiredItems: () => {
    const now = new Date().getTime();
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        try {
          const itemStr = localStorage.getItem(key);
          if (itemStr) {
            const item = JSON.parse(itemStr);
            if (item.expiry && now > item.expiry) {
              localStorage.removeItem(key);
            }
          }
        } catch (e) { }
      }
    }
  }
};

export default customStorage;
