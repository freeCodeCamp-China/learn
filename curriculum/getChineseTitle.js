const json = require('./challenges/08-coding-interview-prep/project-euler.json')
const challenges = json.challenges
const arr = []

challenges.forEach(item =>{
	if(item.title_zh){
		const obj = {}
		obj.english = item.title
		obj.chinese = item.title_zh
		arr.push(obj)
	}
})
console.log(arr)
console.log(JSON.stringify(arr,null,2))