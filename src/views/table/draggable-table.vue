<template>
  <div class="app-container">
    <el-table
      ref="draggableTable"
      :data="list"
      row-key="id"
      border
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="Title">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="105px" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" name="star" icon-class="icon-star" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="Readings" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.pageviews }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status">{{ row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Drag" width="80">
        <template>
          <svg-icon icon-class="drag" width="20" height="20" />
        </template>
      </el-table-column>
    </el-table>

    <div class="show-d">
      <el-tag style="margin-right:12px;">默认顺序:</el-tag>
      {{ oldList }}
    </div>
    <div class="show-d">
      <el-tag>拖拽后顺序:</el-tag>
      {{ newList }}
    </div>
  </div>
</template>

<script lang="ts">
import Sortable from "sortablejs"
import { Component, Vue } from "vue-property-decorator"
import { getArticles } from "@/api/articles"
import { IArticleData } from '@/api/types'

@Component({
  name: "DraggableTable"
})
export default class extends Vue {
  private list:IArticleData[] = [];
  private oldList: number[] = [];
  private newList: number[] = [];
  private listQuery = {
    page: 1,
    limit: 10
  };
  private sortable: Sortable | null = null;

  created() {
    this.getList()
  }

  private async getList() {
    const { data } = await getArticles(this.listQuery)
    this.list = data.items

    this.oldList = this.list.map(v => v.id)
    this.newList = this.oldList
    this.setSort()
  }

  private setSort() {
    const el = (this.$refs.draggableTable as Vue).$el.querySelectorAll(
      ".el-table__body-wrapper > table > tbody"
    )[0] as HTMLElement
    const sortable = Sortable.create(el, {
      ghostClass: "sortable-ghost", // drop placeholder的css类名
      onEnd: evt => {
        if (
          typeof evt.oldIndex !== "undefined" &&
          typeof evt.newIndex !== "undefined"
        ) {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)
          this.newList = this.list.map(v => v.id)
        }
      }
    })
  }
}
</script>

