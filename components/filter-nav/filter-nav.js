Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cityCinemaInfo: {
      type: Object,
      value: {}
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
    selectBrandIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectItemNum(e) {
      const itemNum = e.currentTarget.dataset.itemNum
      let num = itemNum
      if (this.data.itemNum !==-1){
        num = itemNum === this.data.itemNum ? -1 : itemNum
      }
      this.setData({
        itemNum: num
      })
    },
    cancal() {
      this.setData({
        itemNum: -1
      })
    },
    selectBrand(e) {
      const {
        index,
        brand
      } = e.currentTarget.dataset
      let brandName = brand.name
      if (index === 0) {
        brandName = '品牌'
      }
      this.triggerEvent('change', { brandId:brand.id})
      this.setData({
        selectBrandIndex: index,
        itemName2: brandName,
        itemNum: -1
      })
    }
  },
  // attached() {
  //   console.log(this)
  // }
})