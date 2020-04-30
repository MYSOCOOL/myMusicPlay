// pages/showplayer/index.js
const app=getApp();
const bgMusic = wx.getBackgroundAudioManager();
const { MusicManager } = require("../../NetEaseCloudMusicApi/src/MusicManager");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageHeight: null, 
    windowHeight:null,
    musicInforList:[],  //歌曲信息
    animation: '',
    kphc:"",      //看破红尘
    playIsNo:true,
    showMask:true,  //蒙版
    showCouponListHide:true, //是否显示音乐列表
    musicListInformation:[],//音乐列表
    selectMusicIndex:0,   //选择的歌曲下标
    playericon:"../../resource/md-square-outline.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    this.setData({
      pageHeight: wx.getSystemInfoSync().windowHeight ,
      windowHeight:wx.getSystemInfoSync().windowWidth ,
    }) 
    async function test() {
    let musicList = [];
    let musicSearchHelper = MusicManager.getMusicSearchHelper({ keyword: "热门", limit: 20 });
    musicList.push(await musicSearchHelper.getSearchResult())

    console.log(musicList)
    that.setData({
      musicInforList:musicList[0][0]
    })
    that.getMusicUrl(musicList[0][0].id,function(result){
      console.log(result);
    })

      // for (let i = 0; i < musicList.length; i++) {
      //   for (let j = 0; j < 20; j++) {
      //     id: musicList[i][j].id
      //   }
      // }
    }
    test();
  },

  // 获取歌曲url
 getMusicUrl :function(musicId, callback) {
  async function test() {
    let musicUrlHelper = MusicManager.getMusicUrlHelper(musicId);
    let url = await musicUrlHelper.getUrlResult();
    // console.log(`${url}`);
    callback(`${url}`)
  }
  test();
},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getRandom();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获得随机整数
   */
  getRandom:function(){
    let showMingYan=[
      "你记得回来的路，却为何忘了人间的距离。",
      "恰恰用心时，恰恰无心用，无心恰恰用，常用恰恰无。",
      "我们永远走不到彼此的那段去，因此我们都活在自己的极致。",
      "我只是你的过客，却在你的世界流连忘返。",
      "年轮一圈圈密集，能回忆的故事却少之又少。",
      "如果我们注定不是一路人，怎么样尝试接近都是徒劳。",
      "爱情，这场没有硝烟的战争，我们都输给了彼此。",
      "爱别离，怨憎会，撒手西归，全无是类。不过是满眼空花，一片虚幻。",
      "人到情多情转薄，而今真个不多情。",
      "拯救不了世界也没关系，能给身边的人温暖和快乐已经很足够了。",
      "人永远不知道哪次不经意的跟你说了再见之后就真的再也不见。",
    ]
    var num=Math.random();
    num=num * 11;
    num = Math.ceil(num);                //上取整，完成随机生成1——10的整数
    this.setData({
      kphc: showMingYan[num]
    })
  },

  //点击播放或者暂停
  stopAndStartMusicTap:function(){
    let that=this;
    if (that.data.playIsNo==true){
      bgMusic.pause();
      this.setData({
        playericon: "../../resource/md-square.png"
        
      })
    }else{
      bgMusic.play();
      this.setData({
        playericon: "../../resource/md-square-outline.png"
      })
    }
    this.setData({
      playIsNo: !that.data.playIsNo
    })
  },

  //点击列表
  showMusicListTap:function(){
    this.setData({
      showMask: false,  
      showCouponListHide: false
    })
  },

  //点击蒙版
  maskTap:function(){
    this.setData({
      showMask: true,
      showCouponListHide: true
    })
  },

  


})