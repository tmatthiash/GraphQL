# GraphQLLinked

Shows basic functionality of GraphQL including the ability to reference related data.
In this example there are 'users' and 'requests'.  Users can have many requests and that relationship is mapped in graphql

You will have to mysql installed and update the database connection in SQLSetup.js

Also, schema.graphql isn't used but I don't feel like removing it because I might want to look at that at some point.

Frontend stuff was added as a demo for retrieving stuff w/ react.  Just basic crap, you load the front page and it grabs a user and all of the messages (which aren't saved to a database so you'll have to add them w/ the graphql playground to see it).  BTW the frontend stuff is kindof a disorganized mess, I'll clean that up someday maybe.

Also, there's a script that is suppose to run both the front and back end but it doesn't work.  I suggest 
-npm run start in powershell to start the backend
-npm run frontend in the vscode terminal to see the frontend.