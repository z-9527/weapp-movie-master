Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cityCinemaInfo: {
      type: Object,
      value: {},
      observer: function(newVal, oldVal, changedPath) {
        const sideList = newVal.district ? newVal.district.subItems : [];
        this.setData({
          selectRegion: { ...this.data.selectRegion,
            sideList
          }
        })
      }
    },
    hidden:{
      type: Boolean,
      value: true,
      observer: function (newVal){
        if (newVal){
          this.setData({
            itemNum: -1
          })
        }
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
    selectBrandId: -1, //选择的品牌ID
    selectServiceId: -1, //选择的服务ID
    selectHallTypeId: -1, //选择的特殊厅ID
    selectRegion: {
      item: 0,
      sideList: [], //侧边导航的list
      list: [], //详情list
      selectDistrictId: -1, //选择的大区ID
      selectAreaId: -1, //选择的小区ID
      selectLineId: -1, //选择的地铁线ID
      selectStationId: -1 //选择的地铁站ID
    }
  },
  created() {
    //自己实现的一个watch。因为不能在外面直接写watch，所以只能定义在这里
    const watch = {
      itemNum: (value) => {
        this.triggerEvent('toggleShow', {
          item: value
        })
      }
    }
    this._setWatcher(this.data, watch)
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
      let obj = { ...this.data.selectRegion
      }
      if (index === 0) {
        obj.item = 0
        obj.sideList = cityCinemaInfo.district.subItems
        const findItem = obj.sideList.find(item => item.id === obj.selectDistrictId)
        obj.list = findItem.subItems ? findItem.subItems : []
      } else {
        obj.item = 1
        obj.sideList = cityCinemaInfo.subway.subItems
        const findItem = obj.sideList.find(item => item.id === obj.selectLineId)
        obj.list = findItem.subItems ? findItem.subItems : []
      }
      this.setData({
        selectRegion: obj
      })
    },
    //“全城”的side的点击事件
    regionSideClick(e) {
      const {
        item,
        selectDistrictId,
        selectLineId,
        selectStationId,
        selectAreaId
      } = this.data.selectRegion
      const side = e.currentTarget.dataset.side
      let obj = { ...this.data.selectRegion,
        list: side.subItems ? side.subItems : []
      }
      if (item === 0) {
        //点击“全部”时关闭下拉框
        if (side.id === -1 && selectDistrictId !== -1) {
          this.triggerEvent('change', {
            districtId: -1,
            lineId: selectLineId,
            areaId: -1,
            stationId: selectStationId
          })
          this.setData({
            itemNum: -1,
            itemName1: '全城',
            selectRegion: { ...this.data.selectRegion,
              selectDistrictId: -1,
              selectAreaId: -1,
              list: []
            }
          })
          return
        }
        obj.selectDistrictId = side.id
        obj.list = side.subItems ? side.subItems : []
      } else {
        if (side.id === -1 && selectLineId !== -1) {
          this.triggerEvent('change', {
            districtId: selectDistrictId,
            lineId: -1,
            areaId: selectAreaId,
            stationId: -1
          })
          this.setData({
            itemNum: -1,
            itemName1: '全城',
            selectRegion: { ...this.data.selectRegion,
              selectLineId: -1,
              selectStationId: -1,
              list: []
            }
          })
          return
        }
        obj.selectLineId = side.id
      }
      this.setData({
        selectRegion: obj
      })
    },
    //“全城”详细list的点击事件
    regionListClick(e) {
      const item = e.currentTarget.dataset.item
      let obj = { ...this.data.selectRegion
      }
      if (this.data.selectRegion.item === 0) {
        obj.selectAreaId = item.id
      } else {
        obj.selectStationId = item.id
      }
      this.triggerEvent('change', {
        districtId: obj.selectDistrictId,
        lineId: obj.selectLineId,
        areaId: obj.selectAreaId,
        stationId: obj.selectStationId
      })
      this.setData({
        selectRegion: obj,
        itemNum: -1,
        itemName1: item.name,
      })
    },
    //简单实现类似vue的watch
    _setWatcher(data, watch) {
      Object.keys(watch).forEach(key => {
        this._observe(data, key, watch[key])
      })
    },
    _observe(obj, key, func) {
      let val = obj[key]
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        set: function(newVal) {
          if (newVal === val) {
            return
          }
          val = newVal;
          func(newVal); // 赋值(set)时，调用对应函数
        },
        get: function() {
          return val;
        }
      })
    }
  },
  attached() {
  }
})