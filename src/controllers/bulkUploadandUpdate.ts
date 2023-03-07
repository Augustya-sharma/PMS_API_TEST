import {Request, Response} from "express";
import asyncHandler from "../middleware/asyncHandler";
import {Employee} from "../models";
import {StatusCodes} from "http-status-codes";


const updateEmployee = asyncHandler(async (req: Request, res: Response) => {

    const {employee_code, changes} = req.body

    const employee = await Employee.updateMany({_id: {$in: employee_code}},
        {
            changes
        },
        {upsert: true}
    )

})

const updateEmployees = asyncHandler(async (req: Request, res: Response) => {

    const {data} = req.body

    const employee = await Employee.bulkWrite([
        data.map((employee: any) => {
            return ({
                updateOne: {
                    filter: {employee_code: employee.employee_code},
                    update: {
                        $set: {
                            employee_code: employee.employee_code,
                            legal_full_name: employee.legal_full_name,
                            position_code: employee.position_code,
                            grade: employee.grade,
                            appraiser_name: employee.appraiser_name,
                            reviewer_name: employee.reviewer_name,
                            normalizer_name: employee.normalizer_name,
                            section: employee.section,
                            sub_section: employee.sub_section,
                            date_of_joining: employee.date_of_joining,
                            division: employee.division,
                            manager_code: employee.manager_code,
                            manager_position: employee.manager_position,
                            work_location: employee.work_location
                        }
                    },
                    upsert: true
                }
            })
        })
    ])
    res.status(StatusCodes.OK).json({
        employee
    });

})

export {
    updateEmployees
}


/*

 */