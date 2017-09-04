/**
 * Created by Administrator on 2017/9/4.
 */

const searchFetch=(pageName,data)=>{

  const keys=Object.keys(data),
    keyArr=keys.filter((item)=>(item.indexOf('_')>-1));

  let result={};
  keyArr.map((item)=>{
    const arr=item.split('_');
    result[arr[0]]=data[item][0];
    result[arr[1]]=data[item][1];
  });

  result={
    ...data,
    ...result,
  };

  return {
    type: 'search/fetch',
    payload: {
      pageName,
      data:result,
    }
  }
};

export {
  searchFetch,
};
