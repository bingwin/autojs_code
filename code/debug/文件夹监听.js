
// 监听脚本文件夹（无法监听二级目录），可以监听该文件夹的所有事件，
// 包括修改、创建等，无论这些行为是否由Auto.js本身作出
let watcher = $files.observe("/sdcard/脚本");
watcher.on("any", (event, path) => {
    log("事件: %s 相对路径: %s", event, path);
});
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}
//连续截图10张图片(间隔1秒)并保存到存储卡目录
for(var i = 0; i < 5; i++){
    let img= captureScreen();
    images.save(img,"/sdcard/脚本/screencapture" + i + ".png")
    sleep(1000);

}
// 创建一个文件，看看是否能监听到
$files.create("/sdcard/脚本/_test_for_file_observer.txt");
sleep(1000);
// 一秒后删除文件
$files.remove("/sdcard/脚本/_test_for_file_observer.txt");

// 停止监听
watcher.stopWatching();
// 停止监听后