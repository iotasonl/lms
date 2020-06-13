import { combineReducers } from "redux"
import calenderReducer from "./calendar/"
import emailReducer from "./email/"
import chatReducer from "./chat/"
import todoReducer from "./todo/"
import customizer from "./customizer/"
import auth from "./auth/"
import navbar from "./navbar/Index"
import dataList from "./data-list/"
import roleReducer from "./role/"
import boardReducer from "./board/"
import classReducer from "./class/"
import subjectReducer from "./subject/"
import syllabusReducer from "./syllabus/"

const rootReducer = combineReducers({
  calendar: calenderReducer,
  emailApp: emailReducer,
  todoApp: todoReducer,
  roleApp: roleReducer,
  classApp: classReducer,
  boardApp:boardReducer,
  subjectApp: subjectReducer,
  syllabusApp: syllabusReducer,
  chatApp: chatReducer,
  customizer: customizer,
  auth: auth,
  navbar: navbar,
  dataList: dataList
})

export default rootReducer
