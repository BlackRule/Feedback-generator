export type Topic = {
	fullName: string,
	name: string,
	numberOfLessons: number,
	type: "UNKNOWN" | "TOPIC" | "TEST" | "PROJECT" | "GAME" | "INTRO",
	did?: string,
	willDo?: string,
}
export type Level = {
	nProjects: number,
	nLessons: number,
	topics: Topic[],
	description: string,
	title: string,
	title1: string
}
/***
 * @param name1 - name in genitive case
 * */
export type SubjectsThemes = {
	name: string,
	name1: string,
	levels: Level[]
}[]
const subjectsThemes: SubjectsThemes = [
	{
		name: "Курс по созданию сайтов Старый", name1: "Курса по созданию сайтов", levels: [
			{
				title: 'Начальный уровень',
				title1: 'Начального уровня',
				nProjects: 15,
				nLessons: 24,
				description: 'изучаем HTML и CSS, блочную и адаптивную верстку',
				topics: [
					{
						fullName: "F.1.0. Вводный. Знакомимся с HTML",
						name: "вводный урок",
						numberOfLessons: 1,
						type: "INTRO"
					},
					{
						fullName: "F.1.1. Работаем с таблицами",
						name: "Работа с таблицами",
						numberOfLessons: 1,
						type: "TOPIC"
					},
				]
			},

		]
	},

];

export default subjectsThemes;
