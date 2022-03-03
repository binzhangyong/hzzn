<template>
  <div class="views-mange-dict">
    <el-row>
      <el-col :span="6">
        <div class="search-content">
          <div class="search-user">类型:</div>
          <el-input
            v-model="type"
            placeholder="请输入关键字进行过滤"
          />
        </div>
      </el-col>
      <el-col :span="6" :offset="2">
        <div class="search-content">
          <div class="search-user">字典类型:</div>
          <el-select v-model="system" placeholder="请选择字典类型">
            <el-option key="0" label="业务类" value="0" />
            <el-option key="1" label="系统类" value="1" />
          </el-select>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="search-content">
          <el-button type="primary" :icon="Search" @click="handleSearch">搜索
          </el-button>
          <el-button :icon="Delete" @click="handleClear">清空</el-button>
        </div>
      </el-col>
    </el-row>
    <div class="add-button-box">
      <div>
        <el-button type="primary" :icon="Plus" @click="handleAdd">添加</el-button>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        label="序号"
        width="80"
        type="index"
      ></el-table-column>
      <el-table-column prop="type" label="类型" show-overflow-tooltip />
      <el-table-column prop="description" label="描述" show-overflow-tooltip />
      <el-table-column prop="system" label="字典类型"
                       :formatter="row=> Object.is(row.system, '0')? '业务': '系统'" />
      <el-table-column prop="remarks" label="备注信息" show-overflow-tooltip />
      <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip />

      <el-table-column label="操作" fixed="right" width="180">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            :icon="EditPen"
            @click="handleEdit(scope.row)">
            <span>編輯</span></el-button>
          <el-button
            type="text"
            size="small"
            :icon="Delete"
            @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      layout="slot, sizes, prev, pager, next, jumper,"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrev"
      @next-click="handleNext"
      class="page-box">
      <span>共{{ total }}条</span>
    </el-pagination>

    <el-dialog
      v-model="showDialog"
      :title="computedDialogTitle(rowOperate)">
      <el-form ref="formRef" :model="form" label-width="100px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-input v-model="form.type" placeholder="请输入类型"
                        :disabled="computedIsEdit(rowOperate)" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="描述" prop="description">
              <el-input v-model="form.description" placeholder="请输入描述" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字典类型" prop="system">
              <el-select v-model="form.system" placeholder="请选择字典类型">
                <el-option key="0" label="业务类" value="0" />
                <el-option key="1" label="系统类" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注信息" prop="remarks">
              <el-input v-model="form.remarks" placeholder="请输入备注信息" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="computedIsEdit(rowOperate)">
            <el-form-item label="创建时间">
              <el-input v-model="form.createTime" placeholder="请输入创建时间" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm(formRef)">
            {{ computedDialogSubBtnText(rowOperate) }}
          </el-button>
          <el-button @click="resetForm(formRef)">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import { EditPen, Delete, Search, Plus } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/el-message-box.css'
import { computedIsAdd, computedIsEdit, computedDialogTitle, computedDialogSubBtnText } from '@ts/views'
import { manageDictAdd, manageDictEdit, manageDictTableList, manageDictDelete } from '@/api'
import {
  ManageDictAddBody,
  ManageDictTableCol,
  ManageDictTableListBody,
  TableListRes,
  TableRowOperate
} from '~/index.t'

// 搜索
const type = ref<string>('')
const system = ref<string>('')
const rowOperate = ref<TableRowOperate>()

function handleSearch () {
  currentPage.value = 1
  getSystemMangeDictTableList()
}

function handleClear () {
  type.value = ''
  system.value = ''
}

function handleAdd () {
  rowOperate.value = TableRowOperate.Add
  showDialog.value = true
}

// 添加form
type FormInstance = InstanceType<typeof ElForm>;
const formRef = ref<FormInstance>()
const showDialog = ref(false)
const form = reactive<ManageDictAddBody>({
  description: '',
  remarks: '',
  system: '',
  type: ''
})
const rules = reactive({
  type: [
    {
      required: true,
      message: '请输入字典类型',
      trigger: 'blur'
    }
  ],
  description: [
    {
      required: true,
      message: '请输入字典描述',
      trigger: 'blur'
    }
  ],
  system: [
    {
      required: true,
      message: '请选择字典类型',
      trigger: 'change'
    }
  ]
})
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const submitHandler = computedIsAdd(rowOperate.value) ? manageDictAdd : manageDictEdit
      const updateTableList = computedIsAdd(rowOperate.value) ? handleSearch : getSystemMangeDictTableList
      const data = await submitHandler(form)
      if (data) {
        formEl.resetFields()
        showDialog.value = false
        updateTableList()
      }
    } else {
      return false
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  showDialog.value = false
}

// table
const pageSize = ref<number>(20)
const total = ref<number>(0)
const currentPage = ref(1)

const tableData = reactive<Array<any>>([])

function handleEdit (row: ManageDictTableCol) {
  Object.assign(form, row)
  rowOperate.value = TableRowOperate.Edit
  showDialog.value = true
}

function handleDelete (row: ManageDictTableCol) {
  ElMessageBox.confirm(`是否确认删除ID为${row.id}`, '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    manageDictDelete(row.id).then(() => {
      handleSearch()
    })
  })
}

function handleSizeChange (val: number) {
  pageSize.value = val
  getSystemMangeDictTableList()
}

function handleCurrentChange (val: number) {
  currentPage.value = val
  getSystemMangeDictTableList()
}

function handlePrev (val: number) {
  currentPage.value = val
  getSystemMangeDictTableList()
}

function handleNext (val: number) {
  currentPage.value = val
  getSystemMangeDictTableList()
}

function getSystemMangeDictTableList () {
  const payload: ManageDictTableListBody = {
    size: pageSize.value,
    current: currentPage.value
  }
  if (type.value) {
    payload.type = type.value
  }
  if (system.value) {
    payload.system = system.value
  }
  manageDictTableList(payload).then((data: TableListRes) => {
    tableData.splice(0, tableData.length, ...data.records)
    total.value = data.total
  })
}

getSystemMangeDictTableList()
</script>

<style lang="less" scoped>
  .views-mange-dict {
    .search-content {
      display: flex;
      align-items: center;
      justify-content: center;

      .search-user {
        width: 100px;
      }
    }

    .add-button-box {
      margin: 12px 0;
    }

    .el-tag--default {
      margin-right: 4px;
    }

    .page-box {
      margin: 20px 0;
      display: flex;
      justify-content: flex-end;
    }

    .form-box {
      position: fixed;
      width: 100%;
      height: 100vh;
      top: 0;
      background: #fff;

      &::after {
        content: "";
        position: absolute;
      }
    }
  }
</style>
