import {Request, Response} from "express";
import asyncHandler from "../middleware/asyncHandler";
import Calender from "../models/Calender";
import {Employee} from "../models";
import mongoose from "mongoose";
import PreviousAppraisal from "../models/PreviousAppraisal";
import {StatusCodes} from "http-status-codes";


// const addEmployeestoPrevioisAppraisal = asyncHandler(async (req: Request, res: Response) => {

//     const {id} = req.body

//     const getEmployeesinAppraisal = await Employee.find({first_name:  "Kokab Hussain"})

//     // const  previousAppraisal = await PreviousAppraisal.insertMany({getEmployeesinAppraisal})

//     res.status(StatusCodes.CREATED).json({
//         success: true,
//         getEmployeesinAppraisal,
//         // previousAppraisal
//     })

// })

const addEmployeestoPrevioisAppraisal = asyncHandler(async (req: Request, res: Response) => {

    const { data  } = req.body

    // const lineManager = await Employee.find({ _id:  "62ac2037c1c19127416aafef" })
console.log(data)
    // const getEmployeesinAppraisal = await Employee.find({ calendar: "63f7a9bb72a021d4cebb3ea3" })
    const previousAppraisal = await PreviousAppraisal.insertMany( data )
    // const lineManagerPlusOne = await Employee.find({ manager_code: { $in: lineManager.map((j: any) => j.employee_code) } })
    // const Temp = lineManager.map((j: any) => j.employee_code)

    res.status(StatusCodes.OK).json({
        // lineManagerPlusOne,
        // lineManager
        //Temp
        previousAppraisal
    });

})

const getpastAppraisalDetailsofEmployee = asyncHandler(async (req: Request, res: Response) => {
    const employee = await PreviousAppraisal.findById(req.params.id).populate("calendar")
    res.status(StatusCodes.OK).json({
        employee
    });
})

//  to get previous appraisal of employee based on employee code and calendar Id
const getPreviousAppraisalDetailsofEmployee = asyncHandler(async (req: Request, res: Response) => {
    const {employeeCode,calendarId} = req.params;  

    const employeeArray = await PreviousAppraisal.find({employee_code : employeeCode , calendar: new mongoose.Types.ObjectId(calendarId)})
    let employee = employeeArray[0]
    console.log(employeeCode,employee,'calendardata')
    res.status(StatusCodes.OK).json({
        employee
    });
})

export {addEmployeestoPrevioisAppraisal,getpastAppraisalDetailsofEmployee,getPreviousAppraisalDetailsofEmployee}