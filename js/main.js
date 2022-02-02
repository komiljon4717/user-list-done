class UserSystem {
	// create user
	createFullName = document.querySelector('#create-full-name')
	createUsername = document.querySelector('#create-username')
	createEmail = document.querySelector('#create-email')
	createAbout = document.querySelector('#create-about')
	createNewPass = document.querySelector('#create-new-pass')
	confrimPass = document.querySelector('#confrim-pass')
	
	// change user
	changeFullName = document.querySelector('#changeFullName')
	changeUsername = document.querySelector('#changeUsername')
	changeEmail = document.querySelector('#changeEmail')
	changeBio = document.querySelector('#changeBio')
	currentChangePass = document.querySelector('#currentChangePass')
	changeNewPassword = document.querySelector('#changeNewPassword')
	changePassword = document.querySelector('#changePassword')
	saveChangesBtn = document.querySelector('#save-changes-btn')






	search = document.querySelector("#search")
	paginationEl = document.querySelector('.pagination')
	tableBody = document.querySelector('#tableBody')
	countList = document.querySelector('#count-list')
	page = 1
	limit = 5

	

	get users () {
		const users = window.localStorage.getItem('users')
		return JSON.parse(users) || mockUsers
	}

	get html () {
		return {
			usersEl
		}
	}

	get count () {
		return {
			counter
		}
	}

	save (data) {
		window.localStorage.setItem('users', JSON.stringify(data))
	}

	renderUsers ({ active, search, page = this.page }) {
		// filter
		let users = this.users.filter(user => {
			let act = typeof(active) == 'boolean' ? user.active == active : true
			let sea = search ? user.fullName.toLowerCase().includes(search.toLowerCase()) : true

			return act && sea
		})

		// pagination
		users = users.slice(page * this.limit - this.limit, this.limit * page)

		// render users
		this.tableBody.innerHTML = null
		for(let user of users) {
			let htmlEl = this.html.usersEl(user)
			this.tableBody.innerHTML += htmlEl
		}
	}

	selectUser (element) {
		const userId = element.parentNode.parentNode.parentNode.dataset.userid
		const users = this.users
		const user = users.find(user => user.userId == userId)
		user.selected = element.checked
		this.save(users)
	}

	toggleUser (element) {
		const userId = element.parentNode.parentNode.dataset.userid
		const users = this.users
		const user = users.find(user => user.userId == userId)
		user.active = !user.active
		this.save(users)

		let elementClass = element.classList[4]
		if(elementClass == 'fa-toggle-on') {
			element.classList.remove('fa-toggle-on')
			element.classList.add('fa-toggle-off')
		}

		if(elementClass == 'fa-toggle-off') {
			element.classList.remove('fa-toggle-off')
			element.classList.add('fa-toggle-on')
		}
	}
	
	allCount (){
		this.countList.innerHTML =null
		let active = 0
		let selected = 0
		for (const user of this.users) {
			if (user.active) active++
			if (user.selected) selected++
		}
		let sanoq = this.count.counter(this.users.length, selected, active)
		this.countList.innerHTML = sanoq
	}

	// paginateUsers () {}

	deleteUser (id) {
		const users = this.users
		const newUsers = users.filter(user => user.userId != id)
		this.save(newUsers)
	}

	editUser (id) {
		const users = this.users
		const user = users.find(user => user.userId == id)
		changeFullName.value = user.fullName
		changeUsername.value = user.username
		changeEmail.value = user.email
		changeBio.value = user.bio

		saveChangesBtn.onclick = () =>{

			if (currentChangePass.value) {
				
				if (!(this.changeFullName.value.trim().length < 30 && this.changeFullName.value.trim().length > 2)) {
					return alert("Fullname ga 30 tadan ko'p belgi kiritmang va 2 tadan kam belgi kiritman")
				}
				if (!(this.changeUsername.value.trim().length < 20 && this.changeUsername.value.trim().length > 2)) {
					return alert("Username ga 20 tadan ko'p belgi kiritmang va 2 tadan kam belgi kiritman")
				}
				if (!((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(this.currentChangePass.value) == (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(user.password))) {
					return alert("Current password wrong!")
				}
		
				if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(this.changeEmail.value)) {
					return alert('Wrong Email')
				}
				if (!((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(this.changeNewPassword.value) == (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(this.changePassword.value))) {
					return alert("New password and Confirm password wrong!")
				}
	
				users[id - 1] = { 
					userId: id, 
					username: this.changeUsername.value, 
					fullName: this.changeFullName.value,
					email: this.changeEmail.value, 
					bio: this.changeBio.value, 
					password: this.changeNewPassword.value, 
					selected: user.selected, 
					active: user.active 
				}
				this.save(users)
			}
		}
	}


	createUser () {
		if (!(this.createFullName.value.trim().length < 30 && this.createFullName.value.trim().length > 2)) {
			return alert("Fullname ga 30 tadan ko'p belgi kiritmang va 2 tadan kam belgi kiritman")
		}
		if (!(this.createUsername.value.trim().length < 20 && this.createUsername.value.trim().length > 2)) {
			return alert("Username ga 20 tadan ko'p belgi kiritmang va 2 tadan kam belgi kiritman")
		}
		if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(this.createEmail.value)) {
			return alert('Wrong Email')
		}
		if (!((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(this.createNewPass.value) == (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(this.confrimPass.value))) {
			return alert("Password kamida 8 ta belgidan tashkil topgan bo'lishi va unda raqamlar ham qatnashgan bo'lishi kerak")
		}
		const users = this.users
		users.push({ 
			userId: this.users.length ? +users.at(-1).userId + 1 : 1, 
			username: this.createUsername.value, 
			fullName: this.createFullName.value,
			email: this.createEmail.value, 
			bio: this.createAbout.value, 
			password: this.createNewPass.value, 
			selected: false, 
			active: false 
		})
		this.save(users)

	}

	paginationButtons () {
		const numberOfPages = Math.ceil(this.users.length / this.limit)

		this.paginationEl.innerHTML = null
		for(let page = 1; page <= numberOfPages; page++) {
			let newButtonEl = buttonsEl({ page })
			this.paginationEl.innerHTML += newButtonEl
		}
	}

	findPage (html) {
		const buttons = document.querySelectorAll('.page-item')
		buttons.forEach(el => el.classList.remove('active'))

		html.classList.add('active')
		this.renderUsers({ page: html.dataset.page })
	}

}


saveBtn = document.querySelector('#save-btn')
saveChangesBtn = document.querySelector('#save-changes-btn')
active = document.querySelector("#users-status-active")
disabled = document.querySelector("#users-status-disabled")
any = document.querySelector("#users-status-any")


const userSystem = new UserSystem()
userSystem.renderUsers({search: "a"})
userSystem.paginationButtons()
userSystem.allCount()


// event handlers
function selectUser (html) {
	userSystem.selectUser(html)
	userSystem.allCount()
}

function toggleUser (html) {
	userSystem.toggleUser(html)
	userSystem.allCount()
}


saveBtn.onclick = (e) =>{
	userSystem.createUser()
}

search.onkeyup = () => {
	userSystem.renderUsers({search: search.value})
}

active.onclick = () =>{
	userSystem.renderUsers({active: true})
}

disabled.onclick = () =>{
	userSystem.renderUsers({active: false})
}

any.onclick = () =>{
	userSystem.renderUsers({})
}

function editBtn(el) {
	userSystem.editUser(el.parentNode.parentNode.parentNode.dataset.userid);
}

function deleteUser(html) {
	userSystem.deleteUser(html.parentNode.parentNode.parentNode.dataset.userid);
	window.location.reload()
}

function findPage(html) {
	userSystem.findPage(html)
}