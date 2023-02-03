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

READ

View ticket details

Endpoint: GET http://localhost:8080/rest/bankslips/{id}

This API method must return a ticket filtered by id, if the ticket is late, the amount of the fine must be calculated.

Rule for calculating the fine applied per day for late slips:

● Up to 10 days: Fine of 0.5% (Simple Interest)
● Over 10 days: 1% fine (Simple Interest)
![image](https://user-images.githubusercontent.com/62615687/216628128-8755fe51-67bb-4e0b-8a7c-a8afc4fe603b.png)

BANKSLIP PAYMENT

This API method should change the status of the boleto to PAID.

Endpoint: POST http://localhost:8080/rest/bankslips/{id}/payments

![image](https://user-images.githubusercontent.com/62615687/216628727-42097669-76db-425e-8d76-d86e68f7ded5.png)

