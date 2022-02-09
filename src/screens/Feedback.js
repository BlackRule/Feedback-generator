import {Component} from "react";
import StudentSelect from "../components/StudentSelect";
import students from "../students";
import {levelsOfBehavior, levelsOfHomework, levelsOfInterest} from "../levels";
import LessonSelect from "../components/LessonSelect";
import subjectsThemes from "../subjectsThemes";
import {FeedbackText} from "../components/FeedbackText";

class Feedback extends Component {
	state = {
		okPressed: false
	}
	studentId=0;
	recommendationsApply=false;
	levelsOfInterestId=0;
	levelsOfBehaviorId=0;
	levelsOfHomeworkId=0;
	notDone=false;
	transferNeeded=false;
	technicalProblems=false;
	recommendations=false;
	firstTopicId="0_0_0";
	lastTopicId="0_0_0";
	onOk = () => {
		let s = {}
		const p = ["studentId", "recommendationsApply", "levelsOfInterestId", "levelsOfBehaviorId", "levelsOfHomeworkId",
			"notDone", "transferNeeded", "technicalProblems", "recommendations", "firstTopicId", "lastTopicId"];
		for (const prop of p) {
			s[prop] = this[prop];
			console.log(`this.${prop}: ${this[prop]}`);
		}
		s.okPressed = true;
		this.setState(s);
	}

	render = () => {
		const parentStyle = {display: "flex", flexWrap: "wrap",width:"100%",alignItems:"center"};
		const childStyle = {flex:"1",minWidth:0};
		return (
			<div>
				<div style={parentStyle}>
					<StudentSelect
						students={students}
						onChange={(e) => {
							this.studentId = e.value;
						}} style={childStyle}/>
					<div>
						<label>
							С рекомендациями
							<input type="checkbox" onChange={(e) => {
								this.recommendationsApply = e.target.checked;
							}}/>
						</label>
						<label>
							Перевод на другие предметы
							<input type="checkbox" onChange={(e) => {
								this.transferNeeded = e.target.checked;
							}}/>
						</label>
						<label>
							Технические проблемы
							<input type="checkbox" onChange={(e) => {
								this.technicalProblems = e.target.checked;
							}}/>
						</label>
					</div>
					<div>
						{/*<label for="interest">Интерес:</label>*/}
						<select onChange={(e) => {
							this.levelsOfInterestId = e.target.value;
						}}>
							{levelsOfInterest.map((v, i) => (
									<option value={i} key={i}>{v}</option>
								)
							)}
						</select>
						{/*<label for="behavior">Поведение ребенка на уроке:</label>*/}
						<select onChange={(e) => {
							this.levelsOfBehaviorId = e.target.value;
						}}>
							{levelsOfBehavior.map((v, i) => (
									<option value={i} key={i}>{v}</option>
								)
							)}
						</select>
						<select onChange={(e) => {
							this.levelsOfHomeworkId = e.target.value;
						}}>
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
					                   this.firstTopicId = e.value;
				                   }}
				style={childStyle}/>
					{/*
					TODO: для каждого студента его предмет (новый/старый python). 
				 	when topic from subjectA in any of the selects the other one should only list topics from subjectA
					*/}
					<LessonSelect label="На чем кончили" subjectsThemes={subjectsThemes}
					              onChange={(e) => {
						              console.log(e.value);
						              this.lastTopicId = e.value;
					              }}
					              style={childStyle}/>
					<label>
						Не доделали<input type="checkbox" onChange={(e) => {
						this.notDone = e.target.checked;
					}}/>
					</label>
					<input id="ok" type="button" value="Ok" onClick={this.onOk}/>
				</div>
				
				{this.state.okPressed ?
					<FeedbackText
						studentId={this.state.studentId}
						recommendationsApply={this.state.recommendationsApply}
						levelsOfInterestId={this.state.levelsOfInterestId}
						levelsOfBehaviorId={this.state.levelsOfBehaviorId}
						levelsOfHomeworkId={this.state.levelsOfHomeworkId}
						notDone={this.state.notDone}
						transferNeeded={this.state.transferNeeded}
						technicalProblems={this.state.technicalProblems}
						recommendations={this.state.recommendations}
						firstTopicId={this.state.firstTopicId}
						lastTopicId={this.state.lastTopicId}/>
					: ""}
			</div>
		);
	}


}

export default Feedback;
