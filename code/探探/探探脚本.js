auto.waitFor();
//用户配置区
var 用户配置 = {
    聊天文本集合:{
        第一句:function(){
            let ss= Array("你好呀","哈喽","嗨","小哥哥");
            return ss[random(0,ss.length-1)]
        },
        第二句:function(){
            let ss= Array("忙什么呢小哥哥","挺精神的么做什么工作的呀","好像挺近的么","平时玩什么呀");
            return ss[random(0,ss.length-1)]
        },
    },
    语音第一句路径:function(){
        let dir = "/sdcard/探探脚本/第一句语音/";
        let lists = files.listDir(dir,function(name){
            return name.endsWith(".mp3") && files.isFile(files.join(dir, name));
        });
        let fileNae = lists[random(0,lists.length-1)]
        return files.join(dir,fileNae);
    },
    语音第二句路径:function(){
        let dir = "/sdcard/探探脚本/第二句语音/";
        let lists = files.listDir(dir,function(name){
            return name.endsWith(".mp3") && files.isFile(files.join(dir, name));
        });
        let fileNae = lists[random(0,lists.length-1)]
        return files.join(dir,fileNae);
    },
}

//////////////////////////////////
//全局区
const 探探包名="com.p1.mobile.putong"
const 探探聊天界面活动名 = "com.p1.mobile.putong.ui.messages.MessagesAct"
const 探探初始页面活动名 = "com.p1.mobile.putong.ui.main.MainAct"
const 探探互相喜欢活动名 = "com.p1.mobile.putong.ui.match.MatchAct"
const 宝宝生气了活动名 = "com.p1.mobile.putong.ui.popup.ProfileThinPopup"


threads.start(function(){
    events.observeKey();
    events.onKeyDown("volume_up", function(event){
        engines.stopAll();
        exit();
    });
    events.onKeyDown("volume_down", function(event){
        engines.stopAll();
        exit();
    });
    setInterval(()=>{},1000)
})
////////////////////////////////
//原型增加
Array.prototype.in_array = function (element) {
    　　for (var i = 0; i < this.length; i++) {
    　　　　if (this[i] == element) {
    　　　　　　return true;
    　　}
    　}
    　return false;
};
function log(message){
    files.createWithDirs("/sdcard/探探脚本/探探日志.txt");
    let f=files.open("/sdcard/探探脚本/探探日志.txt","a","utf-8");
    var myDate = new Date();
    let ss = myDate.toLocaleString()
    let message_all = ss + ":::" + message
    f.writeline(message_all)
    f.close()
    console.log(message_all);
};
toastLog = function(message){
    log(message)
    toast(message)
}




/**
 * 
 * @param {String} id: String
 * @param {number} 句数 Number
 * @param {boolean} 状态 布尔
 */

//使用root
var ra = new RootAutomator();
events.on('exit', function(){
   toastLog("脚本退出");
    ra.exit();
});




/**
 * 需要的界面:
 * 参数: 输入内容;按住说话
 * @param {string} 界面 测试完成
 */
function 聊天内部页界面切换(界面){
    if (currentActivity()!=探探聊天界面活动名) {
        throw "不在探探聊天界面"
    }
    let 表情发送 = className("android.widget.ImageView").clickable(true).depth(7).findOne(2000);
    if (!表情发送) {
        log("聊天内部页界面切换:::"+"表情发送没找到");
        exit();
    }
    let 中间框类型 = 表情发送.parent().child(2).child(0).className();
    switch (界面) {
        case "输入内容":
            if(中间框类型!= "android.widget.EditText"){
                let 状态=className("android.widget.ImageView").clickable(true).depth(7).findOne().parent().child(3).bounds()
                ra.press(状态.centerX(),状态.centerY(),100)
            }
            break;
        case "按住说话":
            if(中间框类型 == "android.widget.EditText"){
                let 状态=className("android.widget.ImageView").clickable(true).depth(7).findOne().parent().child(3).bounds()
                ra.press(状态.centerX(),状态.centerY(),100)
            }
            break;
    }
}
/**
 * 返回当前聊天界面里双方除最初发送的图片外,剩余条数  需要在聊天界面内执行
 */
function 获取当前聊天信息条数(){
    var 列表 = className("android.widget.ListView").findOne(2000);
    if(列表){
        列表= 列表.children()// android.widget.LinearLayout
    }else{
        log("获取当前聊天信息条数:::"+"列表获取失败");
        exit();
    }
    var 计数 = {
        self:0,
        other:0,
    };
    列表.forEach((element)=>{
        if (element.className()=="android.widget.LinearLayout"){
            try {
                let 图片位置=element.findOne(className("android.widget.ImageView")).bounds();
                if (图片位置.centerX() > device.width /2){
                    计数.self+=1;
                }else{
                    计数.other+=1;
                }  
            } catch (error) {
               
            }
            
        }
    })
    return 计数;
}



/**
 * 返回的数组内每个对象有 id,red,bounds 属性
 */
function 当前聊天列表元素状态(){
    let 页面 = Array();
    //确保页面正确
    let 所有配对=className("android.widget.TextView").text("所有配对").depth(6).findOne(2000);
    if(!所有配对){
        log("所有配对"+"没找到");
        exit();
    }
    let 聊天列表的根 = className("android.widget.TextView").text("所有配对").depth(6).findOne(2000);
    let 聊天列表上一级;
    if(聊天列表的根){
        聊天列表上一级 = 聊天列表的根.parent().parent().child(3);
    }else{
        log("聊天列表的根"+"获取失败");
        exit();
    }
    let 列表=聊天列表上一级.findOne(className("android.widget.ListView"));
    
    列表.children().forEach((element)=>{
        let name = element.findOne(className("android.widget.LinearLayout")).findOne(className("android.widget.LinearLayout")).findOne(className("android.widget.TextView")).text()
        let 小红点;
        let 位置 = element.bounds();//rect 对象
        try {
            element.child(1).child(0).child(1).className();
            小红点 = true;
        } catch (error) {
            小红点 = false;
        }
        let currentElement={
            id:name,
            red:小红点,
            bounds:位置,
        }
        页面.push(currentElement)
    });
    return 页面;
    
}

/**
 * 返回空则当前页面没有小红点  每次只处理一条 因为聊天后会刷新列表
 */
function 聊天列表找小红点点击(){
    let 当前列表 = 当前聊天列表元素状态();
    当前列表.forEach((elemnet)=>{
        if (elemnet.red && elemnet.id != "探探小助手"){
            //有小红点
            ra.press(elemnet.bounds.centerX(),elemnet.bounds.centerY(),100);
            聊天页面内部消息分配();
            sleep(1000);
            let 返回按钮 = className("android.widget.ImageButton").findOne(2000)
            if(返回按钮){
                返回按钮.click()//返回上一页
            }else{
                log("返回按钮不存在");
                exit();
            }
            sleep(500);
            return true;
        }else{
            //该元素 没有消息
           //toastLog(elemnet.id + ":没有消息")
        }
    });
    return false;//运行到这里说明该页面没有消息;
}

/**
 * 
 * @param {Boolean} 方向 true 为向上
 */
function 聊天列表翻页(方向){
    let 聊天列表的根 = className("android.widget.TextView").text("所有配对").depth(6).findOne(2000);
    let 聊天列表上一级;
    if(聊天列表的根){
        聊天列表上一级 = 聊天列表的根.parent().parent().child(3);
    }else{
        log("聊天列表的根"+"获取失败");
        exit();
    }

    let 列表=聊天列表上一级.findOne(className("android.widget.ListView"));
    let 状态;
    if(方向){
        状态 = 列表.scrollUp();
    }else{
        状态 = 列表.scrollDown();
    }
    return 状态;
}

function 发送消息(内容,内容类型){
    if (内容类型 == "文字"){
        聊天内部页界面切换("输入内容");
        let 表情发送 = className("android.widget.ImageView").clickable(true).depth(7).findOne(2000)
        if(!表情发送){
            log("发送消息::"+"表情发送没找到");
            exit();
        }
        let 中间框 = 表情发送.parent().child(2).child(0);
        中间框.setText(内容);
        sleep(300);
        let 发送 = 表情发送.parent().child(3);
        发送.click();
    }
    if(内容类型 == "语音"){
        聊天内部页界面切换("按住说话");
        sleep(1000);
        按住录音并播放(内容);
    }
}


function 发送语音并确认(内容){
    let 当前条数 = 获取当前聊天信息条数().self;
    发送消息(内容,"语音");
    sleep(3000);
    let 发送后消息 = 获取当前聊天信息条数().self;
    if (发送后消息 == 当前条数){
        toastLog("本次语音发送失败,重试中");
        发送语音并确认(内容);
    }
}

function 聊天页面内部消息分配(){
    waitForActivity(探探聊天界面活动名);
    var 聊天信息=获取当前聊天信息条数();
    var 对方发送消息条数初始 = 聊天信息.other;
    switch (聊天信息.self){
        case 0:
            //发送第一条文字消息
            发送消息(用户配置.聊天文本集合.第一句(),"文字");
            break;
        case 1:
            //发送第二条文字消息
            发送消息(用户配置.聊天文本集合.第二句(),"文字");
            break;
        case 2:
            //发送第三条语音消息
            发送语音并确认(用户配置.语音第一句路径());
            发送语音并确认(用户配置.语音第二句路径());
            return "本条完成";
        // case 3:
        //     //发送第四条语音消息 发完退出函数
        //     发送消息(用户配置.语音第二句路径(),"语音");
        //     return "本条完成";
        default:
            return "本条完成";
    }
    sleep(2000);
    聊天信息=获取当前聊天信息条数();
    if(聊天信息.other > 对方发送消息条数初始){
        toastLog("聊天页面内部处理中");
        聊天页面内部消息分配();
    }else{
        return null;
    } 
}

function 按住指定位置(rect,时长){
    var XX = rect.centerX();
    var YY = rect.centerY();
    var WW = rect.width();
    var HH = rect.height();
    var HR = (HH -20 )/2;
    var WR = (WW -20 )/2;
    let startTime = new Date();
    startTime = startTime.getTime();
    var 现在时间 = new Date();
    ra.touchDown(XX,YY,1)
    while(现在时间 - startTime < 时长 ){
        现在时间 = new Date()
        现在时间 = 现在时间.getTime();
        let Ws = random(-WR,WR);
        let Hs = random(-HR,HR)
        ra.touchMove(XX+Ws,YY+Hs,1);
        sleep(200)
    };
    ra.touchUp(1);
}

/**
 * 
 * @param {string} 播放文件路径 
 */
function 按住录音并播放(播放文件路径){
    let 表情发送 = className("android.widget.ImageView").clickable(true).depth(7).findOne(2000)
    if(!表情发送){
        log("按住录音并播放::"+"表情发送没找到");
        exit();
    }
    let 中间框 = 表情发送.parent().child(2).child(0);
    media.playMusic(播放文件路径, 1);
    let 时长 = media.getMusicDuration();
    按住指定位置(中间框.bounds(),时长);
    //ra.swipe(中间框.bounds().centerX()-100,中间框.bounds().centerY(),中间框.bounds().centerX()+100,中间框.bounds().centerY(),时长);
};

/**
 * 本函数只将聊天列表遍历一遍
 */
function 聊天页检查(){
    主页切换("聊天");
    let 向上翻页状态 = true;
    while(向上翻页状态){
        向上翻页状态 = 聊天列表翻页(1);
    }
    let 向下翻页状态 = true;
    while(向下翻页状态){
        if (!聊天列表找小红点点击()){
            向下翻页状态 = 聊天列表翻页();
        }
        sleep(1000);
    }
    toastLog("聊天页检查完毕,将切换到添加新好友");
    sleep(2000);
}
function 主页右滑(){
    ra.swipe(device.width * (2 / 9),device.height *( 1/2) ,device.width *(7/9) ,device.height *( 1/2),500)
    
}

function 主页左滑(){
    ra.swipe(device.width *(7/9) ,device.height *( 1/2),device.width * (2 / 9),device.height *( 1/2) ,500);
}
function 干扰检查(){
    let 当前活动 = currentActivity();
    if(当前活动 == 探探互相喜欢活动名 ){
        let weizhi= className("android.widget.CompoundButton").text("继续探索").findOne().bounds()
        ra.press(weizhi.centerX(),weizhi.centerY(),100);
        sleep(100);
        return ;
    }
    if(当前活动 == 宝宝生气了活动名){
        back();
        return ;
    }
    if(className("android.widget.TextView").text("支付宝获取").exists()){
        toast("检测到支付宝支付,脚本退出");
        exit();
        return ;
    }
    
}




/**
 * 
 * @param {string} 页面 主页,聊天
 */
function 主页切换(页面){
    toastLog("切换中::即将进入"+页面);
    sleep(1000);
    if(currentActivity() == 探探聊天界面活动名){
        back();
        sleep(500);
        主页切换(页面);
    }else{
        //toastLog("当前不在聊天页面内部");
    }
    var 探探标题= className("android.widget.TextView").textStartsWith("探探").findOne(2000);
    if(!探探标题){
        toastLog("探探标题没找到");
        sleep(2000);
        exit();
    }
    var 探探位置 = 探探标题.bounds().centerX();
    switch (页面) {
        case "主页":
            if (探探位置 < 0) {
                back();
                sleep(500);
                主页切换("主页");
            }else{
                toastLog("切换到"+页面+"完成");
                sleep(500);
                return true;
            }
            break;
        case "聊天":
            if (探探位置 > 0 ) {
                let 聊天按钮= 探探标题.parent().findOne(className("FrameLayout"));
                if(!聊天按钮){
                    toastLog("聊天按钮没找到");
                    sleep(2000)
                    exit();
                }
                let 聊天按钮位置=聊天按钮.bounds()//聊天按钮
    
                ra.press(聊天按钮位置.centerX(),聊天按钮位置.centerY(),100);
                //log(聊天按钮位置.centerY())
                sleep(500)
                主页切换("聊天");
            }else{
                toastLog("切换到"+页面+"完成");
                sleep(500);
                return true;
            }
            break;
    }
}


function 添加新好友(){
    主页切换("主页");
    let 本次滑动随机数 = random(5,8)
    for(let i= 0;i<本次滑动随机数;i++){
        主页右滑();
        sleep(2000);
        干扰检查();
        sleep(500)
    }
    主页左滑();
    sleep(1000);
    toastLog("本次添加好友完成,将切换到聊天界面");
    sleep(2000);
    干扰检查();
}

function 第一个功能(){
    toast("请手动打开探探,并切换到聊天页面后不要动");
    waitForActivity(探探初始页面活动名);
    while (currentPackage()==探探包名) {
        聊天页检查();
        添加新好友();
        toastLog("本次运行成功");
        sleep(500);

    }
    toastLog("不在探探界面,脚本退出");
}


function 剩余列表项处理(已完成列表){
    let 当前列表 = 当前聊天列表元素状态();
    当前列表.forEach((elemnet)=>{
        if (elemnet.id != "探探小助手" && elemnet.id != "99+" && !已完成列表.in_array(elemnet.id)){
            //有小红点
            ra.press(elemnet.bounds.centerX(),elemnet.bounds.centerY(),100);
            let 返回值 =  聊天页面内部消息分配();
            sleep(1000);
            while(返回值 != "本条完成"){
                返回值 =  聊天页面内部消息分配();
                sleep(500);
            }
            className("android.widget.ImageButton").findOne().click()//返回上一页
            sleep(500);
            已完成列表.push(elemnet.id)
            return true;
        }else{
            //该元素 没有消息
           //toastLog(elemnet.id + ":是探探小助手")
        }
    });
    return false;//运行到这里说明该页面没有消息;

}


function 聊天页剩余处理(){
    主页切换("聊天");
    let 向下翻页状态 = true;
    let 已处理数组 = Array();
    while(向下翻页状态){
        if (!剩余列表项处理(已处理数组)){
            向下翻页状态 = 聊天列表翻页();
        }
        sleep(1000);
    }

}

function 第二个功能(){
    //app.launchApp("探探");
    toast("请手动打开探探,并切换到聊天页面后不要动");
    waitForActivity(探探初始页面活动名);
    while (currentPackage()==探探包名) {
        toastLog("第二个功能执行中");
        聊天页剩余处理();
    }
    
}

function 第三个功能(){
    toastLog("后台监听开始");
    var 点击状态 = false;
    var thread=threads.start(function(){
        //启用触摸监听
        events.observeTouch();
        //注册触摸监听器
        events.onTouch(function(p){
            //触摸事件发生时, 打印出触摸的点的坐标
            log("点击了"+p.x + ", " + p.y+",本次监听结束");
            点击状态 = true;
        });
        setInterval(function(){}, 1000);
        });
    thread.waitFor();
    while(true){
        if(currentActivity() == 探探聊天界面活动名){
            sleep(700);
            点击状态 = false;
            log("监听开始");
            for(let 计时=0;计时<1000;计时++){
                //log("等待用户点击");
                if(点击状态){
                    //events.removeAllTouchListeners();
                    //threads.shutDownAll();
                    break;
                }
                sleep(10);
            };
            if(!点击状态){
                toastLog('脚本操作开始,请不要动');
                发送语音并确认(用户配置.语音第一句路径());
                发送语音并确认(用户配置.语音第二句路径());
            }else{
                toastLog("本次由用户操作完成");
            }
            while(currentActivity() !=探探初始页面活动名 ){
                //toastLog("等待用户返回聊天列表");
                sleep(100);
            }
        }
        sleep(200);
    }
}
function 监听语音发送(){
    for(let i = 0 ;i<10;i++){
        let 表情发送 = className("android.widget.ImageView").clickable(true).depth(7).findOne(2000);
        if(表情发送){
            log(表情发送);
            sleep(1000);
        }else{

        }
    };
}

function 用户配置检查(){
    files.ensureDir("/sdcard/探探脚本/第一句语音/");
    files.ensureDir("/sdcard/探探脚本/第二句语音/");
    if( !(typeof 用户配置.聊天文本集合.第一句() == "string"  )){
        toastLog("第一句打招呼错误");
        exit();
    }
    if( !(typeof 用户配置.聊天文本集合.第二句() == "string"  )){
        toastLog("第二句打招呼错误");
        exit();
    }
    if( !(typeof 用户配置.语音第一句路径() == "string"   )){
        toastLog("第一句语音错误");
        exit();
    }
    if( !(typeof 用户配置.语音第二句路径() == "string"    )){
        toastLog("第二句语音错误");
        exit();
    }
    return true;
}




function 入口(){
    用户配置检查();
    var options = ["初始运行", "第二个功能:善后","第三个功能,监听"]
    var i = dialogs.select("请选择功能", options);
    if(i >= 0){
        switch (i) {
            case 0:
                第一个功能();
                break;
            case 1:
                第二个功能();
                break;
            case 2:
                第三个功能();
                break;
            default:
                break;
        }
    }else{
        toast("您取消了选择");
    }
    
}

try {  
    
    入口();

} catch (error) {
    log(error);
}


// 测试();

function 测试(){
    

    主页切换("聊天");



    

    exit();
}

