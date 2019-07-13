$(() => {
    // console.log(phoneData)
    let id = parseInt(location.search.substring(4));
    // console.log(id)




    let obj = phoneData.find((e) => {
        // console.log(e)
        return e.pID === id;
    })
    // console.log(obj)
    $('.sku-name').text(obj.name);
    $('.summary-price em').text('￥' + obj.price);
    $('.preview-img img').attr('src', obj.imgSrc);

    let addbtn = $('.add');
    let reduce = $('.reduce');
    let chooseNumber = $('.choose-number');


    addbtn.on('click', function () {
        // console.log(123)
        let old = parseInt(chooseNumber.val());
        // console.log(old)
        old++;
        if (old > 1) {
            reduce.removeClass("disabled");
        }
        chooseNumber.val(old)
    });

    reduce.on('click', function () {
        let old = parseInt(chooseNumber.val());
        if (old == 1) {
            // break;

            // reduce.addClass("disabled");
            return;
        }
        old--;
        if (old == 1) {
            reduce.addClass("disabled");
        }
        chooseNumber.val(old)
    })

    // 点击加入购物车功能
    $('.addshopcar').on('click',function(){
         // 把当前对应的商品的信息加入购物车
    // 把那些信息存到本地存储里面
    // 图片、名字、单价、数量、pID
    // 只有数量是未知，需要获取
    let number = parseInt(chooseNumber.val());
    // console.log(number)
    // 需要把每个数据存储到localStorage里面，又因为可能有多个商品，所以我们要以数组的形式存
    // let arr = [];
    // 先从本地存储里面读取旧的数据，然后把新旧数据叠加
    let jsonStr = localStorage.getItem('shopCartData');

    let arr;
    // 判断是否有数据
    if( jsonStr ===null){
        arr= []
    }else {
        arr = JSON.parse(jsonStr);
    }
// 但是又发现如果点击同一个商品两次，就会一个商品出现两个在购物车里面，如果点击的是同一个商品，最好，把数量叠加
    // 判断当前产品的id，是否出现在 localStroge 里面的数组里面，如果出现，就是曾经添加过了，只要叠加数量

    // find 方法，如果找到了元素，就会返回该元素，但是如果没找到，会返回undefined
    let isExit = arr.find(e =>{
        // console.log(e)
        return e.pID === id
        
    })
    // console.log(isExit);
    // 如果isExit 是undefined，就是没有
    // console.log(isExit)
        if( isExit !== undefined){
            isExit.number +=number
        }else{
            let good = {
                pID:obj.pID,
                name:obj.name,
                price:obj.price,
                imgSrc: obj.imgSrc,
                number:number
            }
            //  console.log(good)
            arr.push(good)
        }
        // 把数组变成json格式的字符串 存储到localStorage里面
        jsonStr = JSON.stringify(arr);
        // console.log(jsonStr)
        localStorage.setItem('shopCartData',jsonStr);

        // 设置点击之后跳转到购物车页面，进行结算
        location.href = 'cart.html'           

       
    })





})




