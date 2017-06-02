
var todo = new Vue({
	el: '#todo',
	data: {
		page: 15,
		//15个项目一页
		newtodo:'',
		//添加项目临时变量
		todos: [
			{text: 'todo1', seen: true}
		],
		
		dones: [
			{text: 'todo2'}
		],
		
		checkedToToDo: [],
		checkedToDone: []
		//批量完成保存列表
		
	},
	methods: {
		add: function(){
			//添加项目
			if(!this.newtodo) {
				//判断是否为空
				alert('输入项目名');
				return;
			}
				
			this.todos.push({text: this.newtodo, seen: true});
			//插入到todo
			this.newtodo= '';
		},
		
		del: function(index, e){
			//删除项目
			if(e == 'todos')
				this.todos.splice(index, 1);
			else
				this.dones.splice(index, 1);
		},
		
		check: function(index, e) {
			//处理项目
			if(e == 'todos') {
				this.todos[index].seen = true;
				this.dones.push(this.todos[index]);
				this.todos.splice(index, 1);
			} else {
				this.dones[index].seen = true;
				this.todos.push(this.dones[index]);
				this.dones.splice(index, 1);
			}
			
		},
		
		patchFinish: function() {
			//批量完成
			this.checkedToDone = this.checkedToDone.sort(function(a,b){
				//从大到小的排序才能实现动态批量操作
				return b - a;
			});
			
			this.checkedToDone.forEach(function (e) {
				//遍历
				todo.dones.push(todo.todos[e]);
				todo.todos.splice(e, 1);
			});
			
			this.checkedToDone = [];
		},
		
		patchToDo: function() {
			//批量未完成
			this.checkedToToDo = this.checkedToToDo.sort(function(a,b){
				//从大到小的排序才能实现动态批量操作
				return b - a;
			});
			
			this.checkedToToDo.forEach(function (e) {
				todo.todos.push(todo.dones[e]);
				todo.dones.splice(e, 1);
			});
			
			this.checkedToToDo = [];
		},
		
		patchDel: function(type) {
			//批量删除
			if(type == 'todos') {
				this.checkedToDone = this.checkedToDone.sort(function(a,b){
				//从大到小的排序才能实现动态批量操作
					return b - a;
				});
				
				this.checkedToDone.forEach(function (e) {
					todo.todos.splice(e, 1);
				});
				
				
			} else {
				
				this.checkedToToDo = this.checkedToToDo.sort(function(a,b){
				//从大到小的排序才能实现动态批量操作
					return b - a;
				});
				
				this.checkedToToDo.forEach(function (e) {
					todo.dones.splice(e, 1);
				});
			}

		},
		
		visibleToDo: function(e) {
			//项目编辑框显示控制
			this.todos[e].seen = !this.todos[e].seen;
		}
		
	}
});
