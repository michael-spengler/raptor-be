# Backend for Raptor-Trails

This is the code for the backend to raptor trails. It can access our database and perform basic CRUD-Operations on it.

## Important notice
This is not the main project and has no frontend to see this visit our repository at [Github](https://github.com/Raptor-Trails/raptor-fe). Here is the [link](www.raptor-trails.com) to our website.

### Open-Source contributions
As a part of the learning with Deno, Maximilian Graf published a module on Deno. This module is mainly for practicing contributions to Open-Source development but is planned to be supported in the future by him. You can find it [here](https://deno.land/x/array_summary@0.2), and the repo is also on [GitHub](https://github.com/maximilian-graf2019/statistics_summary)

Pascal Breucker also published a module, that can be found on[GitHub](https://github.com/PB-flitze/BMI_Calculator) and [Deno](https://deno.land/x/bmi_calculator@v0.1).

Joshua Brenzinger also published a module, it can be found on [Github](https://github.com/j0si/promille_calculator) and [Deno](https://deno.land/x/promille_calculator@0.0.1.1).

Luis Steinert also published a module that can be found on [Github](https://github.com/luistnrt/Sieve_of_Eratosthenes) and [Deno]( https://deno.land/x/eratosthenes_sieve@v1.0).

### Hosting

The hosting is done via [Heroku](https://dashboard.heroku.com/). You can find and access the API [here](https://raptor-be.herokuapp.com/)

### Functions

The backend includes several functions: 

- Test if server is working correclty via welcome "https://raptor-be.herokuapp.com/welcome"
- Get all Trails via "https://raptor-be.herokuapp.com/alltrails"
- Write trails via "https://raptor-be.herokuapp.com/addtrail"
  - Just make a post request and pass the json string of the mongoDB element.
- A function for updating entries is planned, but not yet ready for production
- A function for search entries is planned, but not yet ready for production, the search is currently performed in the frontend.

### Testing
In the next few days i will implement unit tests and publish them here to demonstrate the functionality.

## Used modules
- web server via [opine](https://deno.land/x/opine@2.1.1)
- connection to mongoDB via [mongo](https://deno.land/x/mongo@v0.29.1)
- for testing 
