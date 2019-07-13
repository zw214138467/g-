$(() => {
    // 首先把数据库里面的数据读取出来
    let jsonStr = localStorage.getItem('shopCartData');
    //  console.log(jsonStr)
    // 判断jsonStr是否为null如果是null就没有数据，如果不是null，就是有数据，需要生成购物车的商品列表
    let arr;
    if (jsonStr !== null) {
        arr = JSON.parse(jsonStr)
        // 遍历数组，生成结构
        let html = '';
        arr.forEach((e) => {
            html += `<div class="item" data-id="${e.pID}">
            <div class="row">
              <div class="cell col-1 row">
                <div class="cell col-1">
                  <input type="checkbox" class="item-ck" checked="">
                </div>
                <div class="cell col-4">
                  <img src="${e.imgSrc}" alt="">
                </div>
              </div>
              <div class="cell col-4 row">
                <div class="item-name">${e.name}</div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="price">${e.price}</em>
              </div>
              <div class="cell col-1 tc lh70">
                <div class="item-count">
                  <a href="javascript:void(0);" class="reduce fl">-</a>
                  <input autocomplete="off" type="text" class="number fl" value="${e.number}">
                  <a href="javascript:void(0);" class="add fl">+</a>
                </div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="computed">${e.price * e.number}</em>
              </div>
              <div class="cell col-1">
                <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
              </div>
            </div>
          </div>`;
        })
        // 把html格式的字符串，生成到div里面
        $('.item-list').html(html);

        // 然后把空空如也隐藏
        $('.empty-tip').hide();
        // 把表头和总计显示出来
        $('.cart-header').removeClass('hidden');
        $('.total-of').removeClass('hidden')

    }

    // 计算总和和总价
    function computedCountAndMoney() {

        let totalCount = 0;
        let totalMoney = 0;
        // 根据选中的多选框，得到选中的商品的ID
        $(".item-list input[type=checkbox]:checked").each((i, e) => {

            // console.log(e);
            let id = parseInt($(e).parents('.item').attr('data-id'));
            // console.log(id)
            arr.forEach(e => {
                if (id === e.pID) {
                    totalCount += e.number;
                    totalMoney += e.number * e.price;
                }
            })
        })
        $('.selected').text(totalCount);
        $('.total-money').text(totalMoney);
    }
    computedCountAndMoney();


    // 实现全选和全不选
    $('.pick-all').on('click', function () {
        // 看看自己当前的状态
        let status = $(this).prop('checked');
        // console.log(status),返回如果点击有勾后显示true，如果没点击则显示fales;
        // 设置每个商品都跟自己一样
        $('.item-ck').prop('checked', status);
        // 还要把上下两个全选都同步
        $('.pick-all').prop('checked', status);
        computedCountAndMoney();

    })

    // 其实这里更加建议使用委托来实现，因为所有的商品的信息都是动态生成的，如果是以后从服务器或许数据，会失败的，必须使用委托的
    $('.item-ck').on('click', function () {
        // 判断是否全选 - 如果选中的个数和所有的个数是一直的 就是全选
        let isAll = $('.item-ck').length === $('.item-ck:checked').length;
        $('.pick-all').prop('checked', isAll);
        computedCountAndMoney();
    })




    // 使用委托的方式实现加减
    $('.item-list').on('click', '.add', function () {
        // 点击加号，把对应的输入框的文字进行+1
        // 得到旧的数据
        let oldVal = parseInt($(this).siblings('input').val());
        // console.log(oldVal)
        oldVal++;
        // 这里需要判断，如果数字大于1的时候，则减号可以点击--了
        if (oldVal > 1) {
            $(this).siblings('.reduce').removeClass('disabled')
        }
        // 把得到的新的值设置回去
        $(this).siblings('input').val(oldVal);

        // 然后把本地存储里面的数据更新
        // 判断依据是 点击的按钮对应的商品的ID
        let id = parseInt($(this).parents('.item').attr('data-id'));
        // console.log(id)
        // console.log(arr)
        let obj = arr.find(e => {
            return e.pID === id;
        });
        // 更新对应的数据
        // console.log(obj)
        obj.number = oldVal;
        // 覆盖回本地数据
        let jsonStr = JSON.stringify(arr);
        localStorage.setItem('shopCartData', jsonStr);
        // 然后重新计算回总数和总价
        computedCountAndMoney();

        // 还要把对应商品的钱也要计算
        // jq对象.find()方法，是一个获取指定条件的后代元素的方法 - find 在找子元素的时候，没有children效率高
        // jq对象.children() 只能获取子代元素
        // let res = $(this).parents('.item').find('.computed');
        // 然后设置单组小计
        $(this).parents('.item').find('.computed').text(obj.price * obj.number)

    });

    $('.item-list').on('click','.reduce',function(){
        let oldVal = parseInt($(this).siblings('input').val())
        
        // 如果当前值已经是一的时候，则不能再点击了
        if(oldVal === 1){

            return;
        }
        oldVal--;
        if( oldVal ===1){
            $(this).addClass('disabled');
        }



        // 把oldval的新值设置回来
        $(this).siblings('input').val(oldVal)
        
        let id = parseInt($(this).parents('.item').attr('data-id'));
        let obj = arr.find(e=>{
          return e.pID ===id

        })
        // 然后更新对应的数据
        obj.number = oldVal;
        // 覆盖回对应本地数据
        let jsonStr = JSON.stringify(arr);
    localStorage.setItem('shopCartData', jsonStr);
    // 然后重新计算总价和总数
    computedCountAndMoney();
    $(this).parents('.item').find('.computed').text(obj.price * obj.number);
    })

// 实现删除
$('.item-list').on('click', '.item-del', function (){
    // 因为我们的删除的动作是在点击确定之后进行，点击确定是另外一个函数了，该函数里面的this已经不是移除按钮，我们可以在这里先保存一个this;
    let _this = this;
    $("#dialog-confirm").dialog({
      resizable: false,
      height: 140,
      modal: true,
      buttons: {
        "确认": function () {
          $(this).dialog("close");
          // 把对应的商品删除
          // 把对应的结构移除
          // console.log(_this);
          $(_this).parents('.item').remove();
          // 把本地数据移除
          // 我们现在需要根据id获取本地存储里面的数据
          let id = parseInt($(_this).parents('.item').attr('data-id'));
          // console.log(id);
          // 把对应id的数据读取出来
          // let obj = arr.find(e => {
          //   return e.pID === id;
          // });
          // // console.log(obj);
          // // 把对应的id的数据从本地存储里面移除
          // // arr.splice(从哪里开始删除,总共删除多少个);
          // let index = arr.indexOf(obj);
          // console.log(index);

          // 在h5里面的，数组新增了一个方法，获取满足条件的元素的索引          
          let index = arr.findIndex((e)=>{
            return e.pID === id
          })
          // console.log(index);

          arr.splice(index, 1);
          // 把数据覆盖回本地
          let jsonStr = JSON.stringify(arr);
          localStorage.setItem('shopCartData', jsonStr);
        },
        "取消": function () {
          $(this).dialog("close");
        }
      }
    });



})


})