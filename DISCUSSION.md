# Discussion

This doc will discuss future improvements and scaling

## MVP

Currently, the app is in a proof of concept state, if there was more time, the following features would have been implemented:

- Pagination: There is no pagination on the table, ideally there should be a user configurable pagination. To handle large scale, the pagination logic should be moved to the backend.

- Sorting by column and also filtering for each column:
Right now, there is only filtering for name field, this could be expanded to other fields. The filter logic would be saved in url parameters so the user could easily bookmark it. Clicking on a column header should sort by that column.

- Navigation: Currently, the app only supports one list, this could be extended by having different users who each own a series of lists. There would also be a user profile page.

- Authentication: there is no authentication on the app right now, this was done for simplicity. At Production level, the app would feature a login experience (a long with email/phone validation and forgot password). With this layer, each user could manage different lists.

- Multi-user lists: the lists could be separate from users in which a user can lookup a list by its id. This way each list could have many accessors who would have either read or write permissions. Each list would have an original author but it can be accessed buy different users.
The UI would access the list via a dedicated url (something like /lists/{list_id}) and it would make a request to the backend. The request would check the auth token to identify the user and whether they have read/write permissions for the list.

## Scaling

Currently, the front end saves all the changes the user makes instantly and does a fetch every single time. This would not be efficient at scale.

Ideally, the retrieve requests should be cached and when needed, the cache is invalidated.

The save operations should also either have a debounce time (so actions done right after another are sent with one call) or done in batch operations (keeping temp changes and allowing the user to save at once).

The db would have users so it could support multiple lists that could belong to many users. It would have a structure like:

- Users -(1:n)-> lists -(1:n)-> list item

Please note there is a 1 to many relationship between users and lists, also 1 to many between lists and list item. Each list would have a column to indicate the author (it would be a foreign key).

By having an index on the original author column in the lists table, we could easily do lookups and saves efficiently when we know the author. The main use case would be users managing their own lists, so this would make things very efficient.

There will also be a table to manage permissions, like so:

- permissions
  - user_id
  - list_id
  - Role (read/write)

If the user is there, then they have read/write permission if they are not the original author.

Beyond that, the service could be scaled by having different regions. The data could be duplicated across regions ensuring high availability and good data integrity.