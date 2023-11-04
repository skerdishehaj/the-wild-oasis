# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

## Business requirements

- "The Wild Oasis" is a small boutique **hotel** with 8 luxurious wooden cabins
- They need a custom-built application to manage everything about the hotel: **bookings**, **cabins** and **guests**
- This is the **internal application** used inside the hotel to **check in guests as they arrive**
- They have nothing right now, so they **also need the API**
- Later they will probably want a **customer-facing website** as well, where customers will be able to **book stays**, using the same API

---

## Project Requirements | Step 1

### Authentication

- [ ] Users of the app are hotel employees. They need to be logged into the application to perform tasks
- [ ] New users can only be signed up inside the applications (to guarantee that only actual hotel employees can get accounts)
- [ ] Users should be able to upload an avatar, and change their name and password

### Cabins

- [ ] App needs a table view with all cabins, showing the cabin photo, name, capacity, price, and current discount
- [ ] Users should be able to update or delete a cabin, and to create new cabins (including uploading a photo)

### Bookings

- [ ] App needs a table view with all bookings, showing arrival and departure dates, status, and paid amount, as well as cabin and guest data
- [ ] The booking status can be "unconfirmed" (booked but not yet checked in), "checked in", or "checked out". The table should be filterable by this important status
- [ ] Other booking data includes: number of guests, number of nights, guest observations, whether they booked breakfast, breakfast price

### Check In / Out

- [ ] Users should be able to delete, check in, or check out a booking as the guest arrives (no editing necessary for now)
- [ ] Bookings may not have been paid yet on guest arrival. Therefore, on check in, users need to accept payment (outside the app), and then confirm that payment has been received (inside the app)
- [ ] On check in, the guest should have the ability to add breakfast for the entire stay, if they hadn't already

### Guests

- [ ] Guest data should contain: full name, email, national ID, nationality, and a country flag for easy identification

### Dashboard

- [ ] The initial app screen should be a dashboard, to display important information for the last 7, 30, or 90 days:
>
> - [ ] A list of guests checking in and out on the current day. Users should be able to perform these tasks from here
> - [ ] Statistics on recent bookings, sales, check ins, and occupancy rate
> - [ ] A chart showing all daily hotel sales, showing both "total" sales and "extras" sales (only breakfast at the moment)
> - [ ] A chart showing statistics on stay durations, as this is an important metric for the hotel

### Settings

- [ ] Users should be able to define a few application-wide settings: breakfast price, min and max nights/booking, max guests/booking
- [ ] App needs a dark mode

---

## Step 2 + 3

### Features Categories  

1. **Bookings**
2. **Cabins**
3. **Guests**
4. **Dashboard**
5. **Check in and out**
6. **App settings**
7. **Authentication**

### Pages

|Page|Route|Explanation|
|:---|:---|:---|
|1. Dashboard| `/dashboard`|The home page of the app|
|2. Bookings| `/bookings`|All bookings will be displayed |
|3. Cabins| `/cabins`|Display, edit and delete cabins|
|4. Booking check in| `/checkin/:bookingID`|Check users in|
|5. App settings| `/settings`|Users can define settings|
|6. User sign up|`/users`|Users can be signed up. Route is `/users` *intentionally*, because people will not be allowed to sign up to the application. Existing users can register new users|
|7. Login|`/login`|Default homepage in case users have not logged in|
|8. Account settings|`/account`|Users can update the account setting (name, password, avatar)|

---

## Step 3 + 4

### Modeling State

|State Domains / ***Tables***| Feature Categories|Explanation                                                                                    |
|:--------------------------:|:-------------------|:---------------------------------------------------------------------------------------------|
|1. Bookings                 |1. Bookings         |Bookings feature will need some Bookings state                                                |
|                            |4. Dashboard        |Dashboard will display some statistics about recent bookings                                  |
|                            |5. Check in and out |Updating the booking of a certain user from Checked-In to Checked-Out and the other way around|
|2. Cabins                   |2. Cabins           |Cabins feature will need some Cabins state                                                    |
|3. Guests                   |3. Guests           |Guests feature will need some Guests state                                                    |
|4. Settings                 |6. App Settings     |Settings feature will need some Settings state                                                |
|5. Users                    |7. Authentication   |For auth we are going to need some users that will be stored inside their remote state        |

- All this state will be **global remote state**, stored within ***Supabase***
- There will be one **table** for each state "slice" in the **database**

### Technology Decisions

#### Client-Side-Rendering (CSR) OR Server-Side-Rendering (SSR)?

|CSR with Vanilla React|SSR with Framework (NEXT.js, Remix)|
|:---|:---|
|Used to build **Single-Page** Applications (SPAs)|Used to build **Multi-Page** Application (MPAs)|
|All HTML is rendered on the **client**|Some HTML is rendered in the **server**|
|The job to render is done by JS so all the JS needs to be downloaded before apps start running" **bad for performance**|**More performant**, as less JS needs to be downloaded|
|**One perfect use case:** apps that are used "internally" as tools inside companies, that are entirely hidden behind a login|The **React team** is moving more and more in this direction|

|Action| Library|Explanation|
|:---------------------:|:----------------:|:---------------:|
|Routing                |React Router      |The standard for React SPAs|
|Styling                |styled components |Very popular way of writing component-scoped CSS, right inside JavaScript. A technology worth learning|
|Remote State Management|React Query       |The best way of managing state, with features like caching, automatic re-fetching, pre-fetching, offline support, etc. Alternatives are SWR and RTK Query, but this is the most popular.
|UI State Management    |Context API       |There is almost no UI state needed in this app, so one simple context with *useState* will be enough. No need for Redux|
|Form management        |React Hook Form   |Handling bigger forms can be a lot of work, such as manual state and error handling. A library can simplify all this|
|Other tools            |React icons / React hot toasts / Rechart / date-fns / Supabase|

---

## This project is organized in a feature-based structure

|Folder|Explanation|
|:---:|:---:|
|data||
|features|all feature components|
|ui|all other ***reusable presentational components*** such as Buttons, Inputs, Forms, Tables etc|
|services|reusable code for ***interacting with an API***|
|utils|***reusable stateless helper*** functions that we can re-use on multiple places on the app, that do not *create any side-effects*|
|hooks|truly reusable hooks that we need in multiple feature|
|pages|since this project is big it would be helpful to have a folder which contains all the pages. Each of these pages will **not** have any **side effects**, instead they will delegate all their functionalities to the components that are associated with the feature|
|styles|things regarding CSS|

---

## Technical stuff

### Configuring eslint

``` bash
npm install --save-dev vite-plugin-eslint eslint-config-react-app eslint
```

- Create a `.eslintrc.json` file with the below content

```json
{
  "extends": "react-app"
}
```

- Modify the vite.config.js by adding

``` javascript
import eslint from 'vite-plugin-eslint';
export default defineConfig({
  plugins: [react(), eslint()],
});
```

### Backend with Supabase

- Plan application data
- Model **realtionships** between data **tables**
- **Load data** into app via **Supabase API**
- Service that allows developers to easily **create a back-end with a Postgres database**
- Automatically creates a **database** and **API** so we can easily request and recieve data form the server
- **No back-end** development needed
- Not just an API: Supabase also comes with easy-to-use **user authentication** and **file storage**

#### Tables

##### The Booking table

- **Bookings** are about a **guest** renting a **cabin**
- So a booking needs information about what **guest** is booking which **cabin**: we need to **connect** them
- Supabase uses a Postgres DB, which is SQL (relational DB). So we **join** tables using **foreign keys**
- Booking table will hold the **guestId** (id of Guest table) and **cabinId** (id of Cabin table) as foreign keys
