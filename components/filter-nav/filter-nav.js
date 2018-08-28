Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cityCinemaInfo: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal, changedPath){
        const sideList = newVal.district ? newVal.district.subItems : [];
        console.log(sideList)
        this.setData({
          selectRegion: { ...this.data.selectRegion, sideList }
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemNum: -1,
    itemName1: '全城',
    itemName2: '品牌',
    itemName3: '特色',
    selectBrandId: -1,    //选择的品牌ID
    selectServiceId: -1,  //选择的服务ID
    selectHallTypeId: -1,  //选择的特殊厅ID
    selectRegion: {
      item: 0,
      sideList: [],
      list: [],
      selectDistrictId:-1,   //选择的大区ID
      selectAreaI:-1,       //选择的小区ID
      selectLineId:-1,       //选择的地铁线ID
      selectStationId:-1      //选择的地铁站ID
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //导航栏的点击事件
    selectItemNum(e) {
      const itemNum = e.currentTarget.dataset.itemNum
      let num = itemNum
      if (this.data.itemNum !== -1) {
        num = itemNum === this.data.itemNum ? -1 : itemNum
      }
      this.setData({
        itemNum: num
      })
    },
    //蒙板的点击事件
    cancal() {
      this.setData({
        itemNum: -1
      })
    },
    //选择品牌的点击事件
    selectBrand(e) {
      const brand = e.currentTarget.dataset.brand
      let brandName = brand.name
      if (brand.id === -1) {
        brandName = '品牌'
      }
      this.triggerEvent('change', {
        brandId: brand.id
      })
      this.setData({
        selectBrandId: brand.id,
        itemName2: brandName,
        itemNum: -1
      })
    },
    //特色重置按钮
    specialReset() {
      this.setData({
        selectServiceId: -1,
        selectHallTypeId: -1,
      })
    },
    //特色选择按钮
    specialSelectItem(e) {
      const {
        type,
        typeId
      } = e.currentTarget.dataset
      if (type === 'service') {
        this.setData({
          selectServiceId: typeId
        })
      } else {
        this.setData({
          selectHallTypeId: typeId
        })
      }
    },
    //特色确定按钮
    specialConfirm() {
      const {
        selectServiceId,
        selectHallTypeId
      } = this.data
      this.triggerEvent('change', {
        serviceId: selectServiceId,
        hallType: selectHallTypeId
      })
      this.setData({
        itemNum: -1
      })
    },
    //“全城”的item点击事件
    selectRegionItem(e) {
      const index = e.currentTarget.dataset.index
      const cityCinemaInfo = this.properties.cityCinemaInfo
      let obj = { ...this.data.selectRegion}
      if (index===0){
        obj.item = 0
        obj.sideList = cityCinemaInfo.district.subItems
      } else {
        obj.item = 1
        obj.sideList = cityCinemaInfo.subway.subItems        
      }
      this.setData({
        selectRegion: obj
      })
    },
    //“全城”的side的点击事件
    regionSideClick(e){
      const {item } = this.data.selectRegion
      const id = e.currentTarget.dataset.id
      let obj = { ...this.data.selectRegion }
      if (item===0){
        // obj.
      } else {

      }
      this.setData({
        selectRegion:obj
      })
    }
  },
  attached() {
    
  }
})