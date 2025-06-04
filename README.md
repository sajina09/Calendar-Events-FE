Calendar Events Frontend
This is a simple web app that helps you convert natural language or note-style schedules into downloadable .ics calendar files. You can paste something like:

makefile
Copy
Edit
6:30 - 8:30 Finish reading Paper 1
9:00 - 10:00 Team Meeting
The app will parse each line and generate a calendar file you can download and use in Google Calendar, Apple Calendar, or Outlook.

It’s built using React and connects to a Flask backend for processing the input.

Backend
This project works together with the backend API here:
github.com/sajina09/Calendar-Events-BE

The backend handles parsing the input text and generating the .ics file.

How to run
Clone this repo

Run npm install

Start the app with npm run dev

Make sure the backend is running locally or update the API endpoint if you're using a deployed version.
