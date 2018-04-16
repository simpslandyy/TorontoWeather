# README

### PLEASE READ THIS SECTION! IT WILL TELL YOU HOW TO SET UP BEFORE RUNNING THE SERVER AND ALSO EXPLAIN THE COMPONENTS AND TECHNOLOGIES I'VE USED :)

Hiyo! This is the Toronto Weather Web-Application :)
**Proposal:** To create a simple web application that uses DarkSky API to retrive the current weather for Toronto.
## Getting Started

There are two files that you should set up before running this application

- **.env** file for configuration, used to set server mode = ['development', 'production'] _(optional: it doesn't do much considering I needed to hush webpacker up)_

- **/src/\_buddyconfig.js** - this contains the API keys for Google and DarkSky. **(required)**

\_buddyconfig.js structure:

```
export const config = {
  darkSky: {
    baseurl: 'https://api.darksky.net/forecast/',
    key : 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  google: {
    baseurl: 'https://maps.googleapis.com/maps/api/geocode/',
    key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  }
}
```

Or you can just ask me for the file and I can provide it as well :)

## Architecture

### Pre-processor and Server
I'm still fairly new to **Webpacker**, but I do see the benefits of using it. So for this assignment I decided to use Webpacker as my pre-processor and bundler. To serve my web-application I used a simple **Express** server that compiles webpack and serves it using the [webpack-dev-middleware](https://github.com/webpack/docs/wiki/webpack-dev-middleware).


### Front-End
I'm also still fairly new to React and Redux but I'm a firm believer in it's methodologies (FLUX!!!). Development is slicker, cleaner, and easier to debug _(once you wrap your head around the 1million possible errors)_
So I've used React with Redux with this project. :)

I have one smart component, `/src/containers/weather`, and the rest are dumb components. The smart component has access to the Redux Store that is intialized in `/src/app`. This store is a combination of several smaller stores (`src/store/reducer`) that store data retrieve from DarkSky.

Each dumb component has a specific job, for example `/src/components/temperature` is the component responsible for showing the current temperature of Toronto (including the apparent temperature and summaries), while the `/src/components/forecast` is responsible for displaying data for the next 5 hours.

There is also an **alert component**, `/src/compoents/weatherAlerts`, this component is conditionally rendered based on if there are any alerts for the current weather forecast. So, theres a high chance that when viewing this application this component will be omitted. However, I wanted to add it because alerts are relevant pieces of information important to a user looking for the current weather report.

I hope the comments throughout the code will help guide you :)


### DarkSky and Google
Because the requirement here was to retrieve the current temperature for Toronto and DarkSky API uses lat/lng in it's request, I thought it would be more accurate if I used Google as a middleman to get the lat/lng for Toronto and then used that response to request data from Dark Sky.
That's really the only reason I have GoogleAPI key :)
I was also thinking about reusability as well, so in the future I can easily extract that part of the code for other applications I'll make :)