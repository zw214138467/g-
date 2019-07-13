/**
 * 我们在开发项目的过程中，会积累一些公共的代码，这些公共代码会写到一个公共的js文件里面
 */
$(() => {

  //计算购物车里面的商品总数就属于在多个页面都用的代码 - 提取到一个新的js里面
  // 读取本地数据里面的商品信息，计算出一个总数，修改购物车总的商品数量
  // 根据键从本地数据中读取出字符串
  let arr = kits.loadArray('shopCartData');
  //  console.log(arr);
  // 直接计算出总的数量，设置给红色的泡泡
  let total = 0;
  arr.forEach(e => {
    total += e.number
  });
  // console.log(total);
  // 修改到头部的购物车里面
  $('.count').text(total);
});
