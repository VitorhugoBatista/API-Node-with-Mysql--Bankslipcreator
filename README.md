API REST in NodeJs 

The objective of this APP is to build a REST API for generating bank slips that will be consumed by a module of a financial management system for microenterprises. At the end of the challenge we will have the following endpoints:

● Create Bankslip
● List slips
● View details
● Pay a bill
● Cancel a ticket


CREATE
Endpoint: POST http://localhost:8080/rest/bankslips

This method must receive a new payment slip and insert it into a database to be consumed by the API itself. All fields are mandatory.

Sample of the request

Request:
{
 "due_date":"2018-01-01",
 "total_in_cents":"100000",
 "customer":"Trillian Company"
}

return:
{
"id":"84e8adbf-1a14-403b-ad73-d78ae19b59bf",
 "due_date":"2018-01-01",
 "total_in_cents":"100000",
 "customer":"Trillian Company",
 "status":"PENDING"
}
Http response expected
●	201 : Bankslip created
●	400 : Bankslip not provided in the request body
●	422 : Invalid bankslip provided.The possible reasons are:
○	A field of the provided bankslip was null or with invalid values

