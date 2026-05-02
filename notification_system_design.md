## Stage 6 – Priority Inbox

Notifications are fetched from the API using authentication.

Priority is based on:
- Type: Placement > Result > Event
- Recency: Latest first

A combined score is used to rank notifications.

Top 10 notifications are selected after sorting.

For scalability, a min-heap of size 10 can be used.
