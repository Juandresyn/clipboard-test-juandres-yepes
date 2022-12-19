# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### EPIC:
- Scenario:
    - There are reports being generated for Agents that are requested by the auto-generated ID from the ORM.
- Expected Result:
    - The user wants to give a custom ID to each Agent and then generate the reports by using this new custom ID.

### EPIC Tasks:

1. Update the Agent table
Description: EPIC

- AC:
    - Update the Agent entity to add a new column called `user_id: String`.
    - Perform migrations.
    - Keep the already existing `id` column in the database.

2. Update the Agent repository service
Description: EPIC

- AC:
    - Update the Agent Repository service `AgentRepository:getAgentById` to get Agents by `user_id` or `id` if the `user_id` is not specified.
    - Unit Tests.

3. Modify getShiftsByFacility function
Description: EPIC 
Now that we have the updated Agents table with the new column `user_id`, update the `getShiftsByFacility`

- AC:
    - Update de `getShiftsByFacility` to generate Agents Shift reports by Facility using `user_id` column.
    - If the Agent does not have a value in the `user_id` column, use the default `id` one.
    - Unit Tests.