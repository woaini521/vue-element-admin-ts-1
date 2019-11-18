<template>
  <div class="app-container">
    <h1>动态表格</h1>
    <div class="filter container">
      <h3>固定表头，按照表头顺序排列</h3>
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox label="name">姓名</el-checkbox>
        <el-checkbox label="age">年龄</el-checkbox>
        <el-checkbox label="sex">性别</el-checkbox>
        <el-checkbox label="hobby">爱好</el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :data="tableConfig.table" highlight-current-row border style="width: 100%">
      <el-table-column
        v-for="item in titleConfig"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"

@Component({})
export default class extends Vue {
  private checkboxVal = ["name", "age"];
  private titleConfig = [
    { label: "姓名", prop: "name" },
    { label: "年龄", prop: "age" }
  ];
  private tableConfig = {
    options: [
      { label: "姓名", prop: "name" },
      { label: "年龄", prop: "age" },
      { label: "性别", prop: "sex" },
      { label: "爱好", prop: "hobby" }
    ],
    table: [
      { name: "小白", age: "25", sex: "男", hobby: "LOL" },
      { name: "小石", age: "24", sex: "女", hobby: "王者荣耀" },
      { name: "张三", age: "55", sex: "男", hobby: "下棋" },
      { name: "李四", age: "32", sex: "女", hobby: "网购" }
    ]
  };

  @Watch("checkboxVal")
  private onCheckboxValChange(value: string[]) {
    this.titleConfig = this.tableConfig.options.filter(item => {
      return value.indexOf(item.prop) >= 0
    })
  }
}
</script>

<style lang="scss" scoped>
</style>