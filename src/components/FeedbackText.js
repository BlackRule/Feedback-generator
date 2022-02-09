import students from "../students";
import {levelsOfBehavior, levelsOfHomework, levelsOfInterest} from "../levels";
import PropTypes from "prop-types";
import subjectsThemes from "../subjectsThemes";

/***
 * 
 * @param {number} number 
 * @param {boolean} isGenitive if false - nominative
 */
function lesson(number, isGenitive = false) {
	if (isGenitive) {
		if (number % 10 === 1) return `${number} урока`
		else return `${number} уроков`
	} else { //accusative
		if (number % 10 >= 5 || number % 10 === 0 || (number >= 11 && number <= 14)) return `${number} уроков`
		else if (number % 10 === 1) return `${number} урок`
		else return `${number} урока`
	}
}

/**
 * Renders a <textarea />
 */
export function FeedbackText(props) {
	console.log(props.firstTopicId);
	let [subjectIndex = (/**@type{number}*/0), levelIndex = (/**@type{number}*/0), topicIndex = (/**@type{number}*/0)] = [...props.firstTopicId.split("_").map((v) => v * 1)];
	let [subjectIndex2 = /**@type{number}*/0, levelIndex2 = /**@type{number}*/0, topicIndex2 = /**@type{number}*/0] = [...props.lastTopicId
	.split("_").map((v) => v * 1)];
	/**
	 * @param {Topic[]} topics
	 * @param {boolean} isPast if false then future topics
	 */
	let currentTopicStr = "";
	if (props.notDone) {
		let currentTopic = subjectsThemes[subjectIndex].levels[levelIndex].topics.slice(topicIndex2, topicIndex2 + 1)[0];
		currentTopicStr += "Сейчас ";
		switch (currentTopic.type) {
			case "TOPIC":
			case "UNKNOWN":
			default:
				currentTopicStr += 'проходим тему ';
				break;
			case "PROJECT":
				currentTopicStr += 'делаем проект ';
				break;
			case "GAME":
				currentTopicStr += 'делаем игру ';
				break;
			case "TEST":
			case "INTRO":
				currentTopicStr += 'проходим '
		}
		currentTopicStr += currentTopic.name;
		topicIndex2--;
	}
	let fillTopics = (topics, isPast) => {
		let topicsListString = "";
		let currentTypeFirstIndex = 0;
		if (topics.length > 0) {
			let currentType = topics[currentTypeFirstIndex].type;
			for (let i = 0; i <= topics.length; i++) {
				if (i === topics.length || topics[i].type !== currentType) {
					switch (currentType) {
						case "TOPIC":
						case "UNKNOWN":
						default:
							topicsListString += `про${isPast ? 'шли' : 'йти'} тем${i - currentTypeFirstIndex > 1 ? 'ы ' : 'у '}`;
							break;
						case "PROJECT":
							topicsListString += `сдела${isPast ? 'ли' : 'ть'} проект${i - currentTypeFirstIndex > 1 ? 'ы ' : ' '}`;
							break;
						case "GAME":
							topicsListString += `сдела${isPast ? 'ли' : 'ть'} игр${i - currentTypeFirstIndex > 1 ? 'ы ' : 'у '}`;
							break;
						case "TEST":
						case "INTRO":
							topicsListString += `про${isPast ? 'шли' : 'йти'} `;
					}
					topicsListString += topics.slice(currentTypeFirstIndex, i).map((e) => e.name).join(', ');
					currentTypeFirstIndex = i;
					currentType = topics[i === topics.length ? i - 1 : i].type;
					if (i !== topics.length) topicsListString += ', ';
				}
			}
		}
		return topicsListString;
	}
	let topicsSinceLastFeedback = subjectsThemes[subjectIndex].levels[levelIndex].topics.slice(topicIndex, topicIndex2 + 1);
	let topicsSinceLastFeedbackStr = fillTopics(topicsSinceLastFeedback, true);
	let futureTopics = subjectsThemes[subjectIndex].levels[levelIndex].topics.slice(topicIndex2 + 1);
	let futureTopicsStr = fillTopics(futureTopics, false);
	let numberOfLessonsLeft = futureTopics.reduce((p, c) => p + c.numberOfLessons, 0);
	//TODO all future levels tickbox in additional settings
	let futureLevels = subjectsThemes[subjectIndex].levels.slice(levelIndex2 + 1);
	let futureLevelsStr = futureLevels.reduce((p, c) => {
		return p + `${c.title} состоящий из ${lesson(c.nLessons,true)}, в котором мы ${c.description}\n`;
	}, "");
	//TODO P 1.11 последний но "+3 урока осталось" неверно тк P 1.9+3 Должно быть +1 осталось
	//TODO Ability to choose start/end topic from not the same level. прошли .... и перешли на Средний уровень в котором .... 
	return (
		<textarea cols="" id="result" name="" rows=""
		          value={`@Отзыв
Здравствуйте, ${students[props.studentId][0]}, это преподаватель Черновалов Иван по поводу занятий ${students[props.studentId][1][1]}.
Направляю обратную связь ${props.recommendationsApply ? "с рекомендациями " : ""}по результатам последних 5 занятий.
*Интерес:* ${levelsOfInterest[props.levelsOfInterestId]}.
*Поведение ребенка на уроке:* ${levelsOfBehavior[props.levelsOfBehaviorId]}.
*Делает ли домашнее задание:* ${levelsOfHomework[props.levelsOfHomeworkId]}.
*Какие проекты уже сделали/темы прошли с момента предыдущей обратной связи:* ${topicsSinceLastFeedbackStr}. ${props.notDone ? `${currentTopicStr}.` : ""}
*Что планируется на будущее:* Чтобы закончить ${subjectsThemes[subjectIndex].levels[levelIndex].title} ${subjectsThemes[subjectIndex].name1} нам осталось ${futureTopicsStr}.${futureLevelsStr!==''?'Далее у нас по плану:\n'+futureLevelsStr:''}
${props.transferNeeded ? "*Рекомендации по переводу на другие предметы:* (рекомендации даются в случае , если перевод в перспективе или уже необходим)." : ""}
*Сколько примерно осталось до конца ${subjectsThemes[subjectIndex].levels[levelIndex].title1} ${subjectsThemes[subjectIndex].name1}:* ${lesson(numberOfLessonsLeft)}.
${props.technicalProblems ? "*Технические проблемы:*\n" : ""}${props.recommendationsApply ? "_Рекомендации по успеваемости регулярно повторять пройденный материал (если успеваемость высокая, то можно увеличить кол-во занятий в неделю, если успеваемость низкая, то выполнять домашнее задание и/или сбалансировать нагрузку. Если успеваемость нормальная, но интерес низкий, то можно чередовать с другим предметом)._" : ""}

До свидания
@`}
		/>
	);
}

FeedbackText.propTypes = {
	studentId: PropTypes.number.isRequired,
	recommendationsApply: PropTypes.bool.isRequired,
	levelsOfInterestId: PropTypes.number.isRequired,
	levelsOfBehaviorId: PropTypes.number.isRequired,
	notDone: PropTypes.bool.isRequired,
	transferNeeded: PropTypes.bool.isRequired,
	technicalProblems: PropTypes.bool.isRequired,
	firstTopicId: PropTypes.string.isRequired,
	lastTopicId: PropTypes.string.isRequired
}
