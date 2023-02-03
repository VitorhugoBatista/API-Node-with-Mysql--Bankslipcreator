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


Http response expected
●	201 : Bankslip created
●	400 : Bankslip not provided in the request body
●	422 : Invalid bankslip provided.The possible reasons are:
○	A field of the provided bankslip was null or with invalid values

![image](https://user-images.githubusercontent.com/62615687/216598587-476f78ff-ce8e-401c-97fc-715f9170c976.png)
