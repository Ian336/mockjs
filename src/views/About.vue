<template>
  <div class="app-container">
    <el-row type="flex" justify="start">
      <el-col :span="10">
        <el-button
          class="filter-item"
          size="medium"
          style="margin-left: 5px;"
          type="primary"
          icon="el-icon-plus"
          @click="toAddBrand"
        >添加</el-button>
        <el-button
          class="filter-item"
          size="medium"
          style="margin-left: 5px;"
          type="danger"
          icon="el-icon-delete"
          :disabled="delShow"
          @click="batchDelete"
        >批量删除</el-button>
      </el-col>
      <el-col :span="10">
        <el-input type="text" v-model="listQuery.groupName"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button @click="getList()">查询</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="list"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="80" />
      <el-table-column label="分组/形态名称">
        <template slot-scope="scope">{{ scope.row.groupName }}</template>
      </el-table-column>
      <el-table-column label="排序">
        <template slot-scope="scope">{{ scope.row.sort }}</template>
      </el-table-column>
      <el-table-column label="编码规则">
        <template slot-scope="scope">{{ scope.row.codeRole }}</template>
      </el-table-column>
      <el-table-column label="是否启用">
        <template slot-scope="scope">
          <span v-if="scope.row.isUse=='0'">已启用</span>
          <span v-else>已禁用</span>
          <!-- <el-tag v-if="scope.row.name" type="success" effect="dark">已启用</el-tag>
          <el-tag v-else type="danger"  effect="dark">已禁用</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column label="添加时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toUpdate(scope.row.groupId)">编辑</el-button>
          <el-button
            v-if="scope.row.isUse=='1'"
            type="warning"
            size="mini"
            @click="enable(scope.row.groupId)"
          >启用</el-button>
          <el-button v-else type="success" size="mini" @click="disable(scope.row.groupId)">禁用</el-button>

          <el-button size="mini" type="danger" @click="handleDelete(scope.row.groupId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.pageNum"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog title="添加产品分组" :visible.sync="showAdd" width="500px">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item prop="groupName">
          <span slot="label">分组名称</span>
          <el-input
            v-model="form.groupName"
            maxlength="100"
            placeholder="请输入分组名称,限100字"
            style="width:300px"
          />
        </el-form-item>
        <el-form-item prop="sort" label-width="100px">
          <span slot="label">排序</span>
          <el-input
            v-model="form.sort"
            type="number"
            maxlength="999999"
            placeholder="1-999999"
            style="width:100px"
          />
        </el-form-item>
        <el-form-item prop="codeRole" label-width="100px">
          <span slot="label">编码规则</span>
          <el-input
            v-model="form.codeRole"
            maxlength="2"
            style="width:180px"
            placeholder="请输入两位数字，如01"
          />
        </el-form-item>
        <el-form-item prop="isUse">
          <span>{{this.form.isUse}}</span>
          <span slot="label">是否启用</span>
          <el-switch v-model="form.isUse" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAdd = false">取消</el-button>
        <el-button type="primary" @click="createBrand('form')">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑产品分组" :visible.sync="showUpdate" width="500px">
      <el-form
        label-position="right"
        :model="form"
        :rules="rules"
        ref="updateform"
        label-width="100px"
      >
        <el-form-item prop="name">
          <span slot="label">分组名称</span>
          <el-input
            v-model="form.groupName"
            maxlength="100"
            placeholder="请输入分组名称,限100字"
            style="width:300px"
          />
        </el-form-item>
        <el-form-item prop="sort" label-width="100px">
          <span slot="label">排序</span>
          <el-input
            v-model="form.sort"
            type="number"
            maxlength="999999"
            placeholder="请输入数字,限1-999999"
            style="width:220px"
          />
        </el-form-item>
        <el-form-item prop="sort" label-width="100px">
          <span slot="label">编码规则</span>
          <el-input
            v-model="form.codeRole"
            type="number"
            maxlength="2"
            style="width:220px"
            placeholder="请输入两位数字，如01"
          />
        </el-form-item>
        <el-form-item prop="isUse">
          <span slot="label">是否启用</span>
          <el-switch v-model="form.isUse" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showUpdate = false">取消</el-button>
        <el-button type="primary" @click="updateBrand('updateform')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  brandlist,
  addBrand,
  delBrand,
  // delType,
  // queryById,
  updateBrand,
} from "@/api/spuconfig/brandsGroup";

export default {
  data() {
    return {
      delShow: true, //批量删除按钮是否置灰
      delIds: [], //删除的品牌id
      uploadApi: process.env.UPLOAD_API, // 上传图片api
      // 认证的头部
      showAdd: false, // 是否显示新增框
      isProcess: false, // 接口是否处理中
      showUpdate: false, // 是否显示修改框
      listLoading: false, // 加载中
      list: [
        // {
        //   name: "哈哈哈哈",
        //   sort: "1",
        //   rule: "01",
        //   isSselect: true,
        //   createTime: "2020-08-09",
        // },
        // {
        //   name: "哈哈哈哈",
        //   sort: "2",
        //   rule: "01",
        //   isSselect: false,
        //   createTime: "2020-08-09",
        // },
      ], // 品牌数据
      total: null, // 数据总数
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        groupName: "",
      }, // 查询参数
      form: {
        codeRole: "",
        groupId: null,
        groupName: "",
        sort: "", //排序
        isUse: "1", //是否启用
      }, // 表单
      rules: {
        groupName: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        sort: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
      }, // 验证规则
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 查询品牌列表
    getList() {
      // this.listLoading = true;
      brandlist(this.listQuery).then((response) => {
        console.log("getList -> response", response);

        this.list = response.data;
        this.total = response.total;
        // this.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleSelectionChange(val) {
      console.log("handleSelectionChange -> val", val);

      if (val && val.length > 0) {
        this.delShow = false;
        this.delIds = val.map((row) => row.groupId);
      } else {
        this.delIds = [];
        this.delShow = true;
      }
    },
    // 过滤查询
    handleFilter() {
      this.listQuery.pageNum = 0;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 0;
      this.listQuery.pageSize = val;
      this.getList();
    },
    // 准备添加品牌
    toAddBrand() {
      this.showAdd = true;
      this.resetForm();
      if (this.$refs["form"]) {
        this.$refs["form"].resetFields();
      }
    },
    // 上传图片回调
    uploadSuccess(res) {
      this.form.url = res;
    },
    // 删除品牌二次确认
    handleDelete(id) {
      console.log("handleDelete -> id", id);

      this.$confirm("是否确认删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.delBrand(id);
      });
    },
    // 删除品牌
    delBrand(ids) {
      if (this.isProcess) {
        return;
      }
      this.isProcess = true;
      delBrand({ groupIds: ids.toString() })
        .then(() => {
          this.isProcess = false;
          this.getList();
          this.delIds = [];
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.isProcess = false;
        });
    },
    // 批量删除品牌二次确认
    batchDelete() {
      if (this.delIds && this.delIds.length > 0) {
        this.$confirm("是否确认删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.delBrand(this.delIds);
        });
      } else {
        this.$message({
          message: "请至少选择一个品牌",
          type: "warning",
        });
      }
    },
    // 禁用
    disable(Ids) {
      if (Ids) {
        this.$confirm("是否确认禁用, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          delType(Ids, "1").then((res) => {
            this.getList();
          });
        });
      }
    },
    // },
    // disable() {
    //   if (this.delIds && this.delIds.length > 0) {
    //     this.$confirm("是否确认禁用, 是否继续?", "提示", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning",
    //     }).then(() => {
    //       console.log("启用", this.delIds);
    //       this.delType(this.delIds,"0");
    //     });
    //   } else {
    //     this.$message({
    //       message: "请至少选择一项",
    //       type: "warning",
    //     });
    //   }
    // },
    // 启用
    enable(Ids) {
      if (Ids) {
        this.$confirm("是否确认启用, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          delType(Ids, "0").then((res) => {
            this.getList();
          });
        });
      }
    },
    // enable() {
    //   if (this.delIds && this.delIds.length > 0) {
    //     this.$confirm("是否确认启用, 是否继续?", "提示", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning",
    //     }).then(() => {
    //       this.delType(this.delIds);
    //     });
    //   } else {
    //     this.$message({
    //       message: "请至少选择一项",
    //       type: "warning",
    //     });
    //   }
    // },
    // 创建品牌
    createBrand(formName) {
      this.$refs[formName].validate((valid) => {
        if (!this.isProcess && valid) {
          this.isProcess = true;
          this.form.isUse = this.form.isUse === true ? "0" : "1";
          addBrand(this.form)
            .then(() => {
              this.isProcess = false;
              this.showAdd = false;
              this.getList();
              this.$message({
                type: "success",
                message: "创建成功!",
              });
            })
            .catch(() => {
              this.isProcess = false;
            });
        }
      });
    },
    // 重置
    resetForm() {
      this.form = {
        codeRole: "",
        groupId: 0,
        groupName: "",
        sort: "", //排序
        isUse: "1", //是否启用
      };
    },
    // 准备更新品牌
    toUpdate(id) {
      this.showUpdate = true;
      this.form.groupId = id;
      // queryById(id).then(res => {
      //   this.form = {name: res.name, id: res.id, nickName: res.nickName, url: res.url};

      //   if (this.$refs["updateform"]) {
      //     this.$refs["updateform"].resetFields();
      //   }
      // })
    },
    // 更新品牌
    updateBrand(formName) {
      this.$refs[formName].validate((valid) => {
        if (!this.isProcess && valid) {
          this.isProcess = true;
          this.form.isUse = this.form.isUse === true ? "0" : "1";
          updateBrand(this.form)
            .then(() => {
              this.isProcess = false;
              this.showUpdate = false;
              this.getList();
              this.$message({
                type: "success",
                message: "更新成功!",
              });
            })
            .catch(() => {
              this.isProcess = false;
            });
        }
      });
    },
  },
};
</script>
