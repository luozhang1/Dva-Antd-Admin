/**
 * Created by Administrator on 2017/9/4.
 */

const searchFetch=(pageName,data)=>{
  return {
    type: 'search/fetch',
    payload: {
      pageName,
      data,
    }
  }
};

export {
  searchFetch,
};
