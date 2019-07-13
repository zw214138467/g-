$(()=>{
    // console.log(phoneData)
    let id = location.search.substring(4)
    // console.log(id)




   let obj = phoneData.find((e)=>{
        // console.log(e)
        return e.pID ==id ;
    })
    // console.log(obj)
    $('.sku-name').text(obj.name);
    $('.summary-price em').text('￥'+ obj.price);
    $('.preview-img img').attr('src',obj.imgSrc)
});




let addbtn = $('.add');
let reduce = $('.reduce');
let chooseNumber = $('.choose-number');


addbtn.on('click',function(){
    // console.log(123)
    let old = parseInt(chooseNumber.val());
    // console.log(old)
    old++;
    if(old>1){
        reduce.removeClass("disabled");
    }
    chooseNumber.val(old)
});

reduce.on('click',function(){
    let old = parseInt(chooseNumber.val());
    if(old==1){
        // break;

        // reduce.addClass("disabled");
        return;
    }
    old--;
    if(old==1){
        reduce.addClass("disabled");
    }
    chooseNumber.val(old)
})