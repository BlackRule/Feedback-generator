/**
 * @typedef {Object} Topic
 * @property {string} fullName
 * @property {string} name
 * @property {number} numberOfLessons
 * @property {"UNKNOWN","TOPIC","TEST","PROJECT","GAME", "INTRO"} type
 * @property {string} did
 * @property {string} willDo
 */
/**
 * @typedef {Object} Level
 * @property {number} nProjects
 * @property {number} nLessons
 * @property {Topic[]} topics
 * @property {string} description,
 * @property {string} title
*/
/**
 * @typedef {
 *  [{
 *      name: string,
 *      levels: [Level]
 *  }]
 * } SubjectsThemes
 */

/**
 *
 * @type SubjectsThemes
 */
const subjectsThemes=[
	{name:"Курс по созданию сайтов Старый",name1:"Курса по созданию сайтов",levels:[
		{
			title:'Начальный уровень',
			title1:'Начального уровня',
			nProjects: 15,
			nLessons: 24,
			description: 'изучаем HTML и CSS, блочную и адаптивную верстку',
			topics: [
				{fullName:"F.1.0. Вводный. Знакомимся с HTML",name:"вводный урок",numberOfLessons:1,type:"INTRO"},
				{fullName:"F.1.1. Работаем с таблицами",name:"Работа с таблицами",numberOfLessons:1,type: "TOPIC"},
			]
		},
		
	]},
	
];

export default subjectsThemes;
