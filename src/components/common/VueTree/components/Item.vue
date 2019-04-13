<template>
  <li class="vue-tree-item">
    <div class="item-wrapper" onselectstart="return false;">
      <span
        v-if="model.isCategory"
        class="item-toggle"
        @click="toggle"
      >
        <i :class="[toggleIcon]"></i>
      </span>
      <span
        v-else
        class="item-toggle"
      />
        <img v-if="model.labelIcon" class="item-icon" :src="model.labelIcon"/>
      <span
        v-if="options.checkbox"
        class="item-checkbox"
        :class="[labelIcon, labelStatus]"
        @click="toggleChecked"
      />
      <span
        class="item-label"
        :class="[isBold,{itemBG : model.isClicked}]"
        @click="handle"
      >
        {{ model[options.label] }}
      </span>
    </div>
    <ul v-if="isFolder" v-show="open" class="vue-tree-list">
      <tree-item
        v-for="(item, idx) in model.children"
        :model="item"
        :options="options"
        :ids="ids"
        :depth="depth + 1"
        :ids-with-parent="idsWithParent"
        :half="half"
        :state="itemState"
        :key="idx"
        :treeData="treeData"
        @handle="emitHandle"
        @openNode="emitOpenNode"
        @child-change="childChange"
      />
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'tree-item',

    props: {
        treeData: {
            type: Array,
            default: function () {
                return []
            }
        },
      model: {
        type: Object,
        default: function () {
          return {}
        }
      },

      options: {
        type: Object,
        default: function () {
          return {}
        }
      },

      depth: {
        type: Number,
        default: 0
      },

      ids: {
        type: Array,
        default: function () {
          return []
        }
      },

      idsWithParent: {
        type: Array,
        default: function () {
          return []
        }
      },

      half: {
        type: Array,
        default: function () {
          return []
        }
      },

      state: {
        type: Number,
        default: 0
      }
    },

    data () {
      return {
        open: false,
        itemState: 0
      }
    },

    computed: {
        background_itemIcon(){
            return `background: url(${this.model.labelIcon}) no-repeat 0px 0px`
        },
      toggleIcon () {
        return this.open ? this.options.closeIcon : this.options.openIcon
      },

      labelIcon () {
        if (this.half.indexOf(this.model.id) !== -1) {
          return this.options.halfCheckedIcon
        } else if (this.idsWithParent.indexOf(this.model.id) !== -1) {
          return this.options.checkedIcon
        } else {
          return this.options.uncheckedIcon
        }
      },

      labelStatus () {
        if (this.half.indexOf(this.model.id) !== -1) {
          return 'half-checked'
        } else if (this.idsWithParent.indexOf(this.model.id) !== -1) {
          return 'checked'
        } else {
          return 'unchecked'
        }
      },

      isFolder () {
        return this.model.children && this.model.children.length
      },

      isBold () {
        return {
          'item-bold': this.isFolder && this.options.folderBold
        }
      },

      self () {
        let self = Object.assign({}, this.model, {children: []})
        delete self.children
        return self
      }
    },

    created () {
      if (this.isFolder && this.depth < this.options.depthOpen) {
        this.open = true
      }
      if (this.options.checkbox) {
        if (this.idsWithParent.indexOf(this.model.id) !== -1) {
          this.itemState = this.itemState + 1
          if (this.isFolder && !this.options.idsWithParent) {
            let index = this.ids.indexOf(this.model.id)
            if (index !== -1) {
              this.$delete(this.ids, index)
            }
          }
          this.$emit('child-change', true)
        }
        if (this.state > 0) {
          this.addChecked()
          this.itemState = this.itemState + 1
        }
      }
    },

    watch: {
      state (val, old) {
        if (val > old) {
          this.addChecked()
          this.itemState = this.itemState + 1
        } else {
          this.delChecked()
          this.deleteHalfChecked(this.model.id)
          this.itemState = this.itemState - 1
        }
      }
    },

    methods: {
      toggle () {
          if(!this.isFolder && !this.open){
              this.$emit('openNode', this.model)
          }
          this.open = !this.open
      },

        cancelClicked (data) {
            data.forEach((eachItem) => {
                eachItem.isClicked = false;
                if(eachItem.children && eachItem.children.length){
                    this.cancelClicked(eachItem.children);
                }
          });
        },

      handle () {
//            this.cancelClicked(this.treeData);
        this.model.isClicked=!this.model.isClicked;
          this.$emit('handle', this.model)
//        this.emitHandle(this.self)
//          console.log(this.treeData);
//          this.treeData.forEach((eachItem) => {
//              if(eachItem.id == this.self.id){alert(222)
//                  eachItem.isClicked = true
//              }else{
//                  eachItem.isClicked = false
//              }
//          });
//          this.emitHandle(this.self)
      },

      emitHandle (item) {
        this.$emit('handle', item)
      },
        emitOpenNode (item) {
        this.$emit('openNode', item)
      },

      toggleChecked () {
        if (this.isFolder) {
          this.deleteHalfChecked()
        }
        if (this.idsWithParent.indexOf(this.model.id) !== -1) {
          this.delChecked()
          this.$emit('child-change', false)
          this.itemState = this.itemState - 1
        } else {
          this.addChecked()
          this.$emit('child-change', true)
          if (this.options.checkedOpen && this.isFolder) {
            this.open = true
          }
          this.itemState = this.itemState + 1
        }
      },

      addChecked () {
        if (this.idsWithParent.indexOf(this.model.id) === -1) {
          this.$set(this.idsWithParent, this.idsWithParent.length, this.model.id)
        }
        if (!this.isFolder || this.options.idsWithParent) {
          if (this.ids.indexOf(this.model.id) === -1) {
            this.$set(this.ids, this.ids.length, this.model.id)
          }
        }
      },

      delChecked () {
        let idx = this.idsWithParent.indexOf(this.model.id)
        let index = this.ids.indexOf(this.model.id)
        if (idx !== -1) {
          this.$delete(this.idsWithParent, idx)
        }
        if (index !== -1) {
          this.$delete(this.ids, index)
        }
      },

      setHalfChecked () {
        if (this.half.indexOf(this.model.id) === -1) {
          this.$set(this.half, this.half.length, this.model.id)
        }
      },

      deleteHalfChecked () {
        let idx = this.half.indexOf(this.model.id)
        if (idx !== -1) {
          this.$delete(this.half, idx)
        }
      },

      childChange (checked) {
        if (this.model.children.some((val) => this.half.indexOf(val.id) !== -1)) {
          this.addChecked()
          this.setHalfChecked()
          this.$emit('child-change', true)
          return
        }
        if (checked) {
          this.addChecked()
          if (this.model.children.some((val) => this.idsWithParent.indexOf(val.id) === -1)) {
            this.setHalfChecked()
          } else {
            this.deleteHalfChecked()
          }
          this.$emit('child-change', true)
        } else {
          if (this.model.children.some((val) => this.idsWithParent.indexOf(val.id) !== -1)) {
            this.setHalfChecked()
          } else {
            this.deleteHalfChecked()
            this.delChecked()
          }
          this.$emit('child-change', false)
        }
      }
    }
  }
</script>

<style scoped>
    .item-wrapper{
        white-space: nowrap;
    }
    .item-label{
        font-size: 12px;
    }
    .itemBG{
        background: #3996F5;
        color:#fff;
    }
    .item-icon{
        width: 13px;
        height: 16px;
        vertical-align: top
    }
    .item-toggle{
        vertical-align: top
    }
</style>