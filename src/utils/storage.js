/**
 * Created by Administrator on 2017/9/2.
 */

const storageKey={
    token:'token',
    menu:'menu',
  },
  setStorage=(key,value)=> {
    if (typeof value === 'object') {
      value =JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },
  getStorage=(key)=>{
    return localStorage.getItem(key);
  },
  isLogin=()=>(
    !!getStorage(storageKey.token)
  );

export {
  storageKey,
  setStorage,
  getStorage,
  isLogin,
};
