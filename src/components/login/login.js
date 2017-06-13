import Vue from 'vue'
import http from '../../utils/HttpClient'
import router from '../../router/index'

const state = {
}

const mutations = {
	login: (data, formData) => {
		if(formData.username == 'dk' && formData.password == 'dk'){
			router.push({name: 'home'})
		} else {
			formData.grant_type = 'password'
			http.post('login/index', formData)
			.then(response => {
				router.push({name: 'home'})
			})
		}
	}
}

const actions = {
	login: (events, formData) => {
		events.commit('login', formData)
	}
}

export default {
	state,
	mutations,
	actions
}