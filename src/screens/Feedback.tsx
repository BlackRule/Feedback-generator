import {CSSProperties, useState} from "react";
import StudentSelect from "../components/StudentSelect";
import students from "../students";
import {levelsOfBehavior, levelsOfHomework, levelsOfInterest} from "../levels";
import LessonSelect from "../components/LessonSelect";
import subjectsThemes from "../subjectsThemes";
import FeedbackText from "../components/FeedbackText";

const Feedback = () => {
	const [okPressed, setOkPressed] = useState(false)
	const [studentId, setStudentId] = useState(0)
	const [recommendationsApply, setRecommendationsApply] = useState(false)
	const [levelsOfInterestId, setLevelsOfInterestId] = useState(0)
	const [levelsOfBehaviorId, setLevelsOfBehaviorId] = useState(0)
	const [levelsOfHomeworkId, setLevelsOfHomeworkId] = useState(0)
	const [notDone, setNotDone] = useState(false)
	const [transferNeeded, setTransferNeeded] = useState(false)
	const [technicalProblems, setTechnicalProblems] = useState(false)
	const [firstTopicId, setFirstTopicId] = useState("0_0_0")
	const [lastTopicId, setLastTopicId] = useState("0_0_0")


	const onOk = () => {
		setOkPressed(true)
	}


	const parentStyle: CSSProperties = {display: "flex", flexWrap: "wrap", width: "100%", alignItems: "center"}
	const childStyle: CSSProperties = {flex: "1", minWidth: 0}
	return (
		<div>
			<div style={parentStyle}>
				<StudentSelect
					students={students}
					onChange={
						(selectedOption) => {
							if (selectedOption !== null)
								setStudentId(Number(selectedOption.value))
						}
					} style={childStyle}/>
				<div>
					<label>
						С рекомендациями
						<input type="checkbox" onChange={(e) => {
							setRecommendationsApply(e.target.checked)
						}}/>
					</label>
					<label>
						Перевод на другие предметы
						<input type="checkbox" onChange={(e) => {
							setTransferNeeded(e.target.checked)
						}}/>
					</label>
					<label>
						Технические проблемы
						<input type="checkbox" onChange={(e) => {
							setTechnicalProblems(e.target.checked)
						}}/>
					</label>
				</div>
				<div>
					{/*<label for="interest">Интерес:</label>*/}
					<select onChange={(e) => setLevelsOfInterestId(Number(e.target.value))}>
						{levelsOfInterest.map((v, i) => (
								<option value={i} key={i}>{v}</option>
							)
						)}
					</select>
					{/*<label for="behavior">Поведение ребенка на уроке:</label>*/}
					<select onChange={(e) => setLevelsOfBehaviorId(Number(e.target.value))}>
						{levelsOfBehavior.map((v, i) => (
								<option value={i} key={i}>{v}</option>
							)
						)}
					</select>
					<select onChange={(e) => setLevelsOfHomeworkId(Number(e.target.value))}>
						{levelsOfHomework.map((v, i) => (
								<option value={i} key={i}>{v}</option>
							)
						)}
					</select>
				</div>
			</div>

			<div style={parentStyle}>
				<LessonSelect label="С чего начали" subjectsThemes={subjectsThemes}
				              onChange={(e) => {
					              if (e !== null)
						              setFirstTopicId(e.value)
				              }}
				              style={childStyle}/>
				{/*
				TODO: для каждого студента его предмет (новый/старый python). 
			    when topic from subjectA in any of the selects the other one should only list topics from subjectA
				*/}
				<LessonSelect label="На чем кончили" subjectsThemes={subjectsThemes}
				              onChange={(e) => {
					              if (e !== null)
						              setLastTopicId(e.value)
				              }}
				              style={childStyle}/>
				<label>
					Не доделали<input type="checkbox" onChange={(e) => {
					setNotDone(e.target.checked)
				}}/>
				</label>
				<input id="ok" type="button" value="Ok" onClick={onOk}/>
			</div>

			{okPressed ?
				<FeedbackText
					studentId={studentId}
					recommendationsApply={recommendationsApply}
					levelsOfInterestId={levelsOfInterestId}
					levelsOfBehaviorId={levelsOfBehaviorId}
					levelsOfHomeworkId={levelsOfHomeworkId}
					notDone={notDone}
					transferNeeded={transferNeeded}
					technicalProblems={technicalProblems}
					firstTopicId={firstTopicId}
					lastTopicId={lastTopicId}/>
				: ""}
		</div>
	);


}

export default Feedback;
