const crypto = require("crypto");
const bcrypt = require("bcrypt");

const {get, set, del} = require("./database")

class Controller {

	// Set to Database

	DBset(key, value) {
		return new Promise( async (resolve, _) => {
			let val = await set(key, value)
			return resolve(JSON.stringify(val));
		}).catch(err => {
			return JSON.stringify({"error": err})
		})

	}

	// Delete from Database

	DBdel(key) {
		return new Promise( async (resolve, _) => {
			let val = await del(key)
			return resolve(JSON.stringify(val));
		}).catch(err => {
			return JSON.stringify({"error": err})
		})

	}

	// Get from Database

	DBget(key) {
		return new Promise( async (resolve, _) => {
			let val = await get(key)
			return resolve(JSON.stringify(val));
		}).catch(err => {
			return JSON.stringify({"error": err})
		})

	}

	// Start User registration

	register(username, password, email) {
		return new Promise( async (resolve, _) => {
			if((await this.DBget("USER:"+username)) == "null"){
				const salt = await bcrypt.genSalt(10);
				var hash = await bcrypt.hash(password, salt);

				var data = {
					name: username,
					password: hash,
					email: email,
					created: new Date().getTime()
				}

				this.DBset("USER:"+username,JSON.stringify(data))
				return resolve(JSON.stringify({"msg":'userCreated',"name":username,"email":email,"created":data.created}));
			}else{

				return resolve(JSON.stringify({"msg":"userExists"}))
			}
		}).catch(err => {
			return JSON.stringify({"error": err})
		})
		}

		// Start User deletion

		delete(username) {
			return new Promise( async (resolve, _) => {
				if((await this.DBget("USER:"+username)) != "null"){
					this.DBdel("USER:"+username)
					return resolve(JSON.stringify({"msg":'deleted'}));
				}else{
	
					return resolve(JSON.stringify({"msg":"delError"}))
				}
			}).catch(err => {
				return JSON.stringify({"error": err})
			})
			}
			getUser(username) {
				return new Promise( async (resolve, _) => {
					if((await this.DBget("USER:"+username)) != "null"){
						let data = await JSON.parse(await this.DBget("USER:"+username))
						data = JSON.parse(data);
						return resolve(JSON.stringify({"msg":"loggedIn","name":data.name? data.name : null,"created":data.created? data.created : null,"email":data.email ? data.email : null}))
					
					}else{
		
						return resolve(JSON.stringify({"msg":"delError"}))
					}
				}).catch(err => {
					return JSON.stringify({"error": err})
				})
				}

	// Start login sequence

	login(username, password){
		return new Promise( async (resolve, _) => {
			if((await this.DBget("USER:"+username)) != "null"){


				let data = await JSON.parse(await this.DBget("USER:"+username))
				data = JSON.parse(data)
				if(await bcrypt.compare(password, data.password)){
					return resolve(JSON.stringify({"msg":"loggedIn","name":data.name? data.name : null,"created":data.created? data.created : null,"email":data.email ? data.email : null}))
				}else{
					return resolve(JSON.stringify({"msg":"wrongPass"}))
				}

			}else{
				return resolve(JSON.stringify({"msg":"userDoesntExist"}))
			}
		}).catch(err => {
			return JSON.stringify({"error": err})
		})
	}

}

module.exports = Controller;