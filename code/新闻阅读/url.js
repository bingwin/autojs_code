var url = "https://gitee.com/api/v5/gists/b4978ljdfkhnxgiw02qma56?access_token=e7c2845a0fbebd2be9fc7ee82a39392f"
var res = http.get(url);
if(res.statusCode == 200){
    toast("从网络加载成功");
    var ss=res.body.json().files
    var dd=ss[Object.keys(ss)[0]].content
    // log(ss)
    var eng=engines.execScript("one",dd);
    // log(eng)
}else{
    toast("从网络加载失败:" + res.statusMessage);
}