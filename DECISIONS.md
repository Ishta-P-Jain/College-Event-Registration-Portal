# Decisions

## Why I chose this stack

I selected React for the frontend because it provides reusable components and simplifies UI development. I used Node.js with Express.js for the backend because it integrates well with React and makes it easy to build REST APIs. MySQL was chosen because the assignment required persistent storage and relational data fits the event-registration model well.

## One decision not specified in the brief

I implemented a separate page for viewing registered students of an event instead of displaying them inside the statistics table. This improves readability and provides additional event information such as venue, date, and total registrations.

## One thing I would improve with more time

With more time, I would implement a real-time event management experience using WebSockets. Currently, registration counts and event statistics update after refreshing or revisiting pages. A real-time architecture would allow administrators to instantly see registration changes, capacity utilization, and event status updates as students register. This would make the system more scalable and closer to how production event management platforms operate.
